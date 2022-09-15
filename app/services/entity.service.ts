import { Entity } from './../model/entity';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private httpClient: HttpClient) { }

  public getEntities(): Observable<Entity[]> {
    let customObservableArray: Promise<Entity>[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (item) => {
      let entityByItem: Entity = await this.customPromise(item);
      return entityByItem;
    });
    return from(Promise.all(customObservableArray));
  }

  private customPromise(item: number): Promise<any> {
    return new Promise((resolve: any, recject: any) => {
      let entity: Entity;
      this.httpClient.get<Entity>(environment.uri + '/' + item).subscribe({
        next: (value: Entity) => {
          entity = value
        },
        error: recject,
        complete: () => { return resolve(entity); }
      })
    });
  }
}
