import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({

    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styles: ['.checkbox{display:block}']
})
export class CheckboxComponent implements OnInit {
    @Input() options: Array<any>;
    @Input() formGroup: FormGroup;
    @Input() controlName: string;


    constructor() { }
    update(index, event) {
        this.options[index].selected = !JSON.parse(event.target.value);
        console.log(this.options[index].selected);

        this.formGroup.controls[this.controlName].setValue(this.options);
    }

    ngOnInit() {
        console.log(this.options);
    }
}