import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragDropSortableService } from 'ng2-dnd';
import { ApiService } from './../../services/api-service.service';
import { AlertService } from './../../services/alert-service.service';
import { AccountService } from './../../services/account.service';

@Component({
    selector: 'image-list',
    templateUrl: 'image-list.component.html',
    styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
    @Input() entities;
    @Input() properties;
    @Input() imageProperty;
    @Output() delete = new EventEmitter();

    constructor(
        private sortService: DragDropSortableService,
        private apiService: ApiService,
        private alert: AlertService,
        private account: AccountService
    ) { }

    ngOnInit() { }

    onDelete(index: number) {
        this.delete.emit(index);
    }
}