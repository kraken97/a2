import { QuestionBase } from './question-base';

export class ColorField extends QuestionBase<string> {
  controlType = 'color-picker';
  options: Array<any>;

  constructor(options: {} = {}) {
    super(options);

  }
}
