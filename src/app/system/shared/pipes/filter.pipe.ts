import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'computersFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // defaults to lowercase matches

    return items.filter((computers) => {
      // создаём копию объекта events
      const c = Object.assign({}, computers);

      return c['type'].toLowerCase().indexOf(value) !== -1 ||
        c['config'].toLowerCase().indexOf(value) !== -1 ||
        c['department'].toLowerCase().indexOf(value) !== -1 ||
        c['location'].toLowerCase().indexOf(value) !== -1 ||
        c['employeeName'].toLowerCase().indexOf(value) !== -1 ||
        c['software'].toLowerCase().indexOf(value) !== -1 ||
        c['inv_num'].toLowerCase().indexOf(value) !== -1 ||
        c['description'].toLowerCase().indexOf(value) !== -1;
    });

  }

}
