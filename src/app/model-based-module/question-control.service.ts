import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './control-type-models/question-base';


@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {

      group[question.key] = new FormControl({ value: question.value, disabled: question.disabled }, question.validators);
    });
    return new FormGroup(group);
  }
}