import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyEventService {
  private eventSubject = new Subject<any>();
  event$ = this.eventSubject.asObservable();

  broadcast(data: any) {
    this.eventSubject.next(data);
  }
}