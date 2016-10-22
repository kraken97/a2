import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'input-toggle',
    templateUrl: 'input-toggle.component.html'

})
export class InputToggleComponent implements OnInit {
    @Input() value: boolean = false;
    @Output() valueChange = new EventEmitter();
    constructor() { }

    ngOnInit() {
        this.ngModel = this.value;
    }

    get ngModel() {
        return this.value;
    }

    set ngModel(value) {
        this.valueChange.emit(value);
    }
}