import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Query } from '../../models/query';
import { ApiService } from '../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';
import { AccountService } from './../../services/account.service';
import { HistoryService } from './../../services/history.service';
import { UrlService } from './../../services/url.service';
import { DragDropSortableService } from 'ng2-dnd';

@Component({
    selector: 'generic-index',
    templateUrl: 'generic-index.component.html',
    styleUrls: ['../shared/list.css']
})
export class GenericIndexComponent implements OnInit, AfterViewInit {
    /**
     * Properties which to display on entities in table.
     */
    @Input() properties: Array<string>;
    @Input() title: string = 'List view';
    /**
     * Api route which will be used to get entities from the database.
     * If no route is specified, it will be got from route data 'data' || 'api' 
     */
    @Input() api: string;
    /**
     * ID of entity which should be highlighted as chosen.
     */
    @Input() chosen: number;
    /**
     * Emits chosen entity.
     */
    @Output() chosenChange: EventEmitter<any> = new EventEmitter();
    /**
     * Entity on which one has clicked.
     */
    set chosenEntity(val: any) {
        if (val) {
            this._chosen = val;
            this.chosen = val.id;
            this.chosenChange.emit(val);
        }
    }
    get chosenEntity(): any {
        return this._chosen;
    }
    @Input() sortable: boolean = false;
    @Input() paginated: boolean = true;
    /**
     * If specified, entities are filtered by `compareProperty` on these entities.
     */
    @Input() set parentId(val) {
        this._parentId = val;
        this.getEntities();
    }
    get parentId() {
        return this._parentId;
    }
    @Input() compareProperty;
    /**
     * ViewChild #filter for <input type="text"> to add event listeners.
     */
    @ViewChild('filter') filterInput;
    /**
     * Minimal order of entities that were received from the database.
     */
    minOrder: number;
    page = 1;
    count: number;
    filterProp = '';
    query: Query;
    sortProp = 'order';
    order = 'ASC';
    deleteEntity: number;
    /**
     * Array of entities which will be resolved from the database.
     */
    entities: any;
    orderChanged: boolean = false;
    paginationOptions = [10, 15, 20];
    private _chosen;
    private _parentId;

    constructor(
        private apiService: ApiService,
        private actRoute: ActivatedRoute,
        private sortService: DragDropSortableService,
        private alertService: AlertService,
        private account: AccountService,
        private history: HistoryService,
        private urlService: UrlService
    ) { }

    get itemsPerPage() {
        let res = localStorage.getItem('itemsPerPage');
        if (!res) {
            localStorage.setItem('itemsPerPage', '10');
            return 10;
        }
        return parseInt(res, 10);
    }
    set itemsPerPage(val) {
        let res = parseInt(val.toString(), 10);
        let res2 = isNaN(res) ? '10' : res.toString();
        localStorage.setItem('itemsPerPage', res2);
    }

    ngOnInit() {
        this.actRoute.data.subscribe(val => {
            if (!this.api) this.api = val['data'] || val['api'];
            this.getEntities();
        });
    }
    ngAfterViewInit() {
        this.filterInput.nativeElement.onkeyup = (e) => {
            if (e.keyCode === 13) {
                this.filter();
            } else if (e.keyCode === 27) {
                this.filterProp = '';
                this.filter();
            }
        };
    }
    sort(prop: string) {
        this.order = this.sortProp === prop ? (this.order === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        this.sortProp = prop;
        this.getEntities();
    }
    filter() {
        this.getEntities();
    }
    onDelete(modal: any, deleteEntity: number) {
        this.deleteEntity = deleteEntity;
        modal.open();
    }
    confirmDelete(modal: any) {
        this.apiService.mainPath = this.api;
        this.apiService.delete(this.deleteEntity).subscribe(x => {
            this.alertService.success('Success', `${this.api} #${this.deleteEntity} was deleted`);
        },
            err => {
                this.alertService.error('Error', `While deleting ${this.api} #${this.deleteEntity}`);
            },
            () => {
                this.getEntities();
                this.history.go(this.urlService.getViewUrl(this.api, false));
            });
        modal.close();
    }
    getEntities() {
        this.apiService.mainPath = this.api;
        this.query = new Query(
            (this.page - 1) * this.itemsPerPage,
            this.page * this.itemsPerPage,
            this.sortProp, this.order,
            this.filterProp);

        this.apiService.get(this.query).subscribe(x => {
            this.count = x.json().count;
            this.entities = x.json().data;
            if (this.parentId && this.compareProperty) {
                this.entities = this.entities.filter(z => z[this.compareProperty] === this.parentId);
            }
            this.minOrder = Math.min.apply(Math, this.entities.map(x => x.order));
        });
    }
    getPage(page: number) {
        this.page = page;
        this.getEntities();
    }
    openDemo(alias) {
        window.open(`http://${window.location.host}/demos/${alias}`);
    }
    isArray(an): boolean {
        return Array.isArray(an);
    }
    onOrderChange() {
        this.orderChanged = true;
    }
    onOrderSave() {
        let sorted = {};
        for (let i = 0; i < this.entities.length; i++) {
            let id = this.entities[i].id;
            let value = i + this.minOrder;
            sorted[id] = value;
        }
        this.apiService.mainPath = this.api;
        this.apiService.put('', sorted).subscribe(x => {
            this.alertService.success('Success', `Order of ${this.api} was changed`);
            this.getEntities();
            this.orderChanged = false;
        });
    }
}
