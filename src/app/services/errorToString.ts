import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '../Utils';

@Pipe({ name: 'errorToString' })
export class ErrorToStringPipe implements PipeTransform {
  transform(value: any): string {
    console.log(typeof value);

    if (typeof value === "string") {
      var res = Utils.isHTML(value);
      console.log(res);
      if (res) {
        return res.text;
      } else {
        console.log(value);
        try {
          return Utils.parseObject('', JSON.parse(value));
        } catch (er) {
          return Utils.parseObject('', value);
        }
      }
    } else if (value) {
      return Utils.parseObject('', value);
    }
    return value;


  }
}