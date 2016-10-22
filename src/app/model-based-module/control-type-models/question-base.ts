import { Validators, AbstractControl } from '@angular/forms';
export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  validators: Array<(control: AbstractControl) => {
    [key: string]: boolean;
  }>;
  order: number;
  controlType: string;
  hidden: boolean = false;
  disabled: boolean;
  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    validators?: Array<(control: AbstractControl) => {
      [key: string]: boolean;
    }>,
    order?: number,
    controlType?: string,
    hidden?: boolean,
    disabled?:boolean
  } = {disabled:false}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.validators = options.validators;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.disabled = options.disabled;
    
    if (options.hidden) {
      this.hidden = options.hidden;
    }
  }
}