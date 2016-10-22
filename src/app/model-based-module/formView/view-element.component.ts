import { Component, OnInit, Input } from '@angular/core';
import { BaseView } from './../dynamic-views-models/base-view';

@Component({
    selector: 'view-element',
    templateUrl: 'view-element.component.html'
})
export class ViewComponent implements OnInit {
    /**
     * view element 
     * need to specify element type
     */
    @Input() viewElementModel: BaseView;

    constructor() { }

    ngOnInit() {
        console.log(this.viewElementModel);
    }
}