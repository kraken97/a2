import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'input-radio',
    templateUrl: 'input-radio.component.html'
})
export class InputRadioComponent implements OnInit {
    @Input() displayProperty = 'display';
    @Input() valueProperty = 'value';
    @Output() checked = new EventEmitter();
    @Input() entities: Array<any>;
    @Input() disabled: boolean = false;
    value;

    @Input() set chosen(val) {
        this.value = val + '';
        this.checked.emit(parseInt(this.value));
    }
    get chosen() {
        return this.value;
    }

    constructor() { }

    ngOnInit() {

    }
}
