import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PersonService } from '../person.service';
//import { PersonDataSource } from './person.datasource';
import { PersonModel } from './person.model';
import { PersonItem } from './personItem';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-person',
  templateUrl: 'person.component.html',
  styleUrls: ['person.component.css'],
})
export class PersonComponent implements OnInit {
  //public dataSource: PersonDataSource | null;

  public displayedColumns = ['name', 'age', 'gender', 'email'];

  public PERSONS: PersonModel[];

  public person: PersonModel;

  public name: any;

  private sort: MatSort;

  public test: any;

  private subject: BehaviorSubject<PersonModel[]> = new BehaviorSubject<
    PersonModel[]
  >([]);

  constructor(public personService: PersonService) {}

  ngOnInit() {
    //this.dataSource = new PersonDataSource(this.subject, this.sort);
    this.getPersons();
  }

  public getPersons(): void {
    this.personService
      .retrieve()
      .then((entities: Array<PersonModel>) => {
        this.subject.next(new Array<PersonModel>());
        for (let person of entities) {
          this.PERSONS = this.subject.value.slice();
          this.PERSONS.push(person);
          this.subject.next(this.PERSONS);
        }
      })
      .catch((error: any) => {
        console.error(error);
        this.showError('Falha ao recuperar nomes.');
      });
  }
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
/*
const PERSONS: PersonModel[] = [
  {
    id: '1',
    name: 'Victor',
    age: 22,
    gender: 'M',
    email: 'victor@victor',
  },
  {
    id: '2',
    name: 'Jose',
    age: 17,
    gender: 'M',
    email: 'jose@victor',
  },
  {
    id: '3',
    name: 'Josefina',
    age: 65,
    gender: 'F',
    email: 'josefina@victor',
  },
  {
    id: '4',
    name: 'Gabriele',
    age: 23,
    gender: 'F',
    email: 'gabriele@victor',
  },
  { id: '5', name: 'Magal', age: 35, gender: 'M', email: 'magal@victor' },
  { id: '6', name: 'Thiago', age: 37, gender: 'M', email: 'thiago@victor' },
  {
    id: '7',
    name: 'Alexandre',
    age: 20,
    gender: 'M',
    email: 'alexandre@victor',
  },
  {
    id: '8',
    name: 'Carolina',
    age: 15,
    gender: 'F',
    email: 'carolina@victor',
  },
  { id: '9', name: 'Ana Luisa', age: 22, gender: 'F', email: 'ana@victor' },
  {
    id: '10',
    name: 'Patrick',
    age: 45,
    gender: 'M',
    email: 'patrick@victor',
  },
  {
    id: '11',
    name: 'Viviane',
    age: 38,
    gender: 'F',
    email: 'viviane@victor',
  },
  {
    id: '12',
    name: 'Paulo',
    age: 22,
    gender: 'M',
    email: 'paulo@victor',
  },
  {
    id: '13',
    name: 'Raquel',
    age: 72,
    gender: 'F',
    email: 'raquel@victor',
  },
  {
    id: '14',
    name: 'Luciana',
    age: 30,
    gender: 'F',
    email: 'luciana@victor',
  },
  { id: '15', name: 'Vitor', age: 31, gender: 'M', email: 'vitor@victor' },
];
*/
