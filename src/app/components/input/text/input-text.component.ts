import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'input-text',
    templateUrl: 'input-text.component.html'

})
export class InputTextComponent implements OnInit {
    text: string;
    @Input() placeholder = 'enter text...';
    @Input() required: boolean = false;
    @Input() type = 'text';
    @Input() set value(val) {
        this.ngModel = val;
        this.text = val;
    }
    @Input() alert: string = '';
    @Output() valueChange = new EventEmitter();
    constructor() { }

    get value() {
        return this.text;
    }
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
