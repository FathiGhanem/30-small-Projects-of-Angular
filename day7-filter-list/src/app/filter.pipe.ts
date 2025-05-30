import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(itmes:any[],seacrhText:string) : any[] {
    if (!itmes || !seacrhText){
      return itmes;
    }
    return itmes.filter((items)=> items.toLowerCase().includes(seacrhText.toLocaleLowerCase()));

  }

}
