import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './../../control-type-models/question-base';

@Component({

  selector: 'df-input',
  templateUrl: 'dynamic-input.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  get isToched() { return this.form.controls[this.question.key].touched; }

  ngOnInit() {
    this.form.controls[this.question.key].setValue(this.question.value);
  }

  set value(e) {
    this.form.controls[this.question.key].setValue(e);
  }
  get value() {
    return this.form.controls[this.question.key].value;
  }
}