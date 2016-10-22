import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({

    selector: 'datepcker',
    template:`<input-datepicker 
                    [(ngModel)]="ngModel"  
                    [expanded]="true" 
                    [viewFormat]="'D MMMM YYYY'"
                    name="date"></input-datepicker>`
})
export class DatePickerComponent implements OnInit {
    @Input() value;
    @Input() formGroup: FormGroup;
    @Input() controlName: string;
    constructor() { }
    set ngModel(val) {
        this.value = val;
        this.formGroup.controls[this.controlName].setValue(val);  
    }
    get ngModel() {
        return this.value;
    }
    ngOnInit() { }
}