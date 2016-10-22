import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionControlService } from './../../question-control.service';
import { QuestionBase } from './../../control-type-models/question-base';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() errors: any;
  @Input() formTitle: string;
  @Output() value = new EventEmitter();
  @Output() valueChanges = new EventEmitter();
  @Output() back = new EventEmitter();
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) { }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.valueChanges.subscribe(r => {
      this.valueChanges.emit(r);
    });

  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.value.emit(this.form.value);

  }
}