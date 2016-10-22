import { QuestionBase } from './question-base';

export class CheckboxGroup extends QuestionBase<Array<{value:string,checked:boolean}>> {
  controlType = 'checkbox-group';
  options:Array<any>;

  constructor(options: {} = {}) {
    super(options);

  }
}