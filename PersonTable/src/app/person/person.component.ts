import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PersonService } from '../person.service';
//import { PersonDataSource } from './person.datasource';
import { PersonModel } from './person.model';
import { PersonItem } from './personItem';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

//const persons: PersonModel[] = [];

@Component({
  selector: 'app-person',
  templateUrl: 'person.component.html',
  styleUrls: ['person.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PersonComponent implements OnInit, AfterViewInit {
  //public dataSource: PersonDataSource | null;

  public displayedColumns = ['name', 'age', 'gender', 'email'];

  public expandedElement: PersonModel;

  public mytest: PersonModel[];

  public name: any;

  public PERSONS: Array<PersonModel>;

  public person: PersonModel;

  public test: any;

  private subject: BehaviorSubject<Array<PersonModel>> = new BehaviorSubject<
    Array<PersonModel>
  >([]);

  obs: Observable<any>;
  dataSource = new MatTableDataSource<PersonModel>(this.mytest);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public personService: PersonService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.personService
      .retrieve()
      .then((response: Array<PersonModel>) => {
        this.mytest = response;
        this.PERSONS = response;
        this.dataSource.data = response;
      })
      .catch((error: any) => {
        console.error(error);
        this.showError('Falha ao recuperar nomes.');
      });

    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /* public getPersons(): void {
     this.personService
       .retrieve()
       .then((response: Array<PersonModel>) => {
         this.PERSONS = response;
         console.log(this.PERSONS);
       })
       .catch((error: any) => {
         console.error(error);
         this.showError('Falha ao recuperar nomes.');
       });
   }*/
}
