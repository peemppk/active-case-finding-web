import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translator: TranslationService) { }
  transform(value: any, args?: any): any {
    return this.translator.translate(value);
  }

}
