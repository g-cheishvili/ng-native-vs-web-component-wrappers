import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inKb'
})
export class InKbPipe implements PipeTransform {

  transform(value?: number): unknown {
    if (!value) {
      return '';
    }
    return `${decimals(value / 1024, 2)} KB`;
  }

}

function decimals(value: number, decimalQuantity: number): number {
  return Math.round(value * Math.pow(10, decimalQuantity)) / Math.pow(10, decimalQuantity);
}
