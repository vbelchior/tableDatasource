/*import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonItem } from './personItem';

export class PersonDataSource extends DataSource<any> {
  public columns = ['name', 'age', 'gender', 'email'];

  public term = new BehaviorSubject('');

  constructor(
    private subject: BehaviorSubject<PersonItem[]>,
    private sort: MatSort
  ) {
    super();
  }

  public connect(): Observable<PersonItem[]> {
    const changes = [this.sort.sortChange, this.subject, this.term];

    return merge(...changes).pipe(
      map(() => {
        return this.getSortedData()
          .slice()
          .filter((item: PersonItem) => {
            let searchStr = item.entity.name.toLowerCase();

            if (this.term.value != null || this.term.value != undefined) {
              return searchStr.indexOf(this.term.value.toLowerCase()) != -1;
            } else {
              return searchStr.indexOf(this.term.value) != -1;
            }
          });
      })
    );
  }

  public disconnect() {}

  public getSortedData(): PersonItem[] {
    const data = this.subject.value.slice();
    if (!this.sort.active || this.sort.direction == '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'personName':
          [propertyA, propertyB] = [a.entity.name, b.entity.name];
          break;
        case 'personAge':
          [propertyA, propertyB] = [a.entity.age, b.entity.age];
          break;
        case 'personGender':
          [propertyA, propertyB] = [a.entity.gender, b.entity.gender];
          break;
        case 'personEmail':
          [propertyA, propertyB] = [a.entity.email, b.entity.email];
          break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1)
      );
    });
  }
}
*/
