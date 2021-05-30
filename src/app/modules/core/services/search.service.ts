import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search$ = new Subject<string>();

  constructor() {}

  search(filter: string) {
    this.search$.next(filter);
  }
}
