import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { BaseGenericComponent } from './base-generic.component';
import { AlertService } from './../../services/alert-service.service';
import { HistoryService } from './../../services/history.service';
import { UrlService } from './../../services/url.service';



@Component({
    selector: 'create',
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
                        [formTitle]="title"
                        (back)="goBack()">
                </dynamic-form>

        </div>
    </div>
    `
})
export class GenericCreateComponent extends BaseGenericComponent implements OnInit {

    formType = 'create';
    constructor(
        protected http: Http,
        actRoute: ActivatedRoute,
        router: Router,
        alserv: AlertService,
        protected history: HistoryService,
        protected urlService: UrlService) {
        super(http, router, actRoute, alserv, history, urlService);
    }
    onSubmit(value) {
        return this.http.post(this.entityPath, value);
    }
    getElements(name) {
        return this.get(this.formType, name);
    }
}