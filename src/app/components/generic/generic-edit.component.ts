import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { BaseGenericComponent } from './base-generic.component';

import { AlertService } from './../../services/alert-service.service';
import { HistoryService } from './../../services/history.service';
import { UrlService } from './../../services/url.service';



@Component({
    selector: 'edit',
    template: `
            <div class="m-t-3"></div>

                <div class="col-md-10 col-md-offset-1">

                <div class="card">
                <dynamic-form 
                        *ngIf="questions" 
                        [formTitle]="entityName"
                        [errors]="errors|errorToString"
                        [questions]="questions"
                        (value)="commonSubmit($event)"
                        (back)="goBack()">
                </dynamic-form>
                <dynamic-view *ngIf="viewElements" [viewElements]="viewElements">
                </dynamic-view>
                </div>
            </div>
    `
})
export class GenericEditComponent extends BaseGenericComponent implements OnInit {

    /**
     * used for put and get
     * if you dont specify it, component will get it from url using ':id' parameter 
     * type any due to users and roles ID which are strings
     */
    @Input() entityId: any;

    viewElements;

    formType = 'edit';

    constructor(
        http: Http,
        actRoute: ActivatedRoute,
        router: Router,
        alertService: AlertService,
        protected history: HistoryService,
        protected urlService: UrlService) {
        super(http, router, actRoute, alertService, history, urlService);
    }

    onSubmit(value) {
        console.log(JSON.stringify(value))
        return this.http.put(this.entityPath, value);
    }
    getElements(name, path) {
        return this.actRoute.data.flatMap(val => {
            if (val['item'] === 'users' || val['item'] === 'roles') {
                this.entityId = this.entityId || this.urlService.getId(val['item'] + "/edit");
            }
            this.entityId = this.entityId || +this.urlService.getId(val['item'] + "/edit");
            this.entityPath += '/' + this.entityId;
            return this.http.get(this.entityPath).map(r => r.json()).flatMap(r => this.get(this.formType, name, r));
        });
    }
    afterInit() {
        this.viewElements = this.viewModel.createViewElementsList();
    }

}