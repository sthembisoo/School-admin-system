import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKey',
})
export class FilterByKeyPipe implements PipeTransform {
  transform(
    values: any[],
    searchInput: string,
    searchKey1: string,
    searchKey2: string | null = null,
    searchKey3: string | null = null
  ): any[] {
    if (!searchInput) {
      return values;
    }

    searchInput = searchInput.toLowerCase().trim();

    if (searchKey3 === null) {
      if (searchKey2 === null) {
        return values.filter((value) =>
          value[searchKey1].toLowerCase().includes(searchInput)
        );
      } else {
        return values.filter(
          (value) =>
            value[searchKey1].toLowerCase().includes(searchInput) ||
            value[searchKey2].toLowerCase().includes(searchInput)
        );
      }
    } else {
      if (searchKey2 === null) {
        return values.filter(
          (value) =>
            value[searchKey1].toLowerCase().includes(searchInput) ||
            value[searchKey3].toLowerCase().includes(searchInput)
        );
      } else {
        return values.filter(
          (value) =>
            value[searchKey1].toLowerCase().includes(searchInput) ||
            value[searchKey2].toLowerCase().includes(searchInput) ||
            value[searchKey3].toLowerCase().includes(searchInput)
        );
      }
    }
  }
}
