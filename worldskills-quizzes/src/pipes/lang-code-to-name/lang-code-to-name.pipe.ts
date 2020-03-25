import {Pipe, PipeTransform} from '@angular/core';
import {langCodeToName} from '../../utils/locale';

@Pipe({
  name: 'langCodeToName'
})
export class LangCodeToNamePipe implements PipeTransform {

  transform(value: string): string {
    return langCodeToName(value);
  }

}
