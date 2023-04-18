import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | currency:name
 * Example:
 *   {{ 2 | currency:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'naira'})
export class NairaPipe implements PipeTransform {

  transform(value: number, currency:string = 'NGN'): string {
    const currencyMap:any = {
        "USD": "$",
        "NGN": "N"
    }
    // const regex = `^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}${currencyMap[currency]}`
    // return `${regex.match(value.toString())}`
    return `N${value}`
  }
}