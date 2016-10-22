import { Component, OnInit, Input } from '@angular/core';
import { BaseView } from './../dynamic-views-models/base-view';


@Component({
    selector: 'dynamic-view',
    templateUrl: 'dynamic-view.component.html'
})
export class DynamicViewComponent implements OnInit {
    /**
     * list of elements that will bew displayed
     */
    @Input() viewElements: BaseView[]

    constructor() { }

    ngOnInit() {
        console.log(this.viewElements);
    }
}