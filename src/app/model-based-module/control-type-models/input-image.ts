import { QuestionBase } from './question-base';

export class InputImageField extends QuestionBase<string> {
  controlType = 'input-image';
  imageType:number;
  constructor(options: {} = {}) {
    super(options);
    this.imageType = options['imageType'] || 3;
  }
}