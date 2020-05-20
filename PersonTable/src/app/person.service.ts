import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { PersonItem } from './person/personItem';
import { PersonModel } from './person/person.model';
interface Person {
  PersonModel;
}
@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getPersons(): Promise<PersonModel[]> {
    let path: 'http://localhost:3000/persons';

    return this.http
      .get<Array<PersonModel>>(path, this.httpOptions)
      .toPromise()
      .then((response) => {
        let persons: Array<PersonModel> = new Array<PersonModel>();

        if (response !== null && response !== undefined) {
          for (let person of response) {
            persons.push(PersonModel.factory(person));
          }
        }
        return Promise.resolve(persons);
      })
      .catch((erro: any) => {
        return Promise.reject(erro);
      });
  }

  public retrieve(): Promise<PersonModel[]> {
    let path = 'http://localhost:3000/persons';
    return this.http
      .get<Array<PersonModel>>(path)
      .toPromise()
      .then((response) => {
        let personArray: Array<PersonModel> = new Array<PersonModel>();
        if (response !== null && response !== undefined) {
          for (let person of response) {
            personArray.push(PersonModel.factory(person));
          }
        }
        return Promise.resolve(personArray);
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
