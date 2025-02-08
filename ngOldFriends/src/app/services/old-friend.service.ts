import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { OldFriends } from '../models/old-friends';

@Injectable({
  providedIn: 'root'
})
export class OldFriendService {

  private url = environment.baseUrl + 'api/oldFriends';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<OldFriends[]> {
    return this.http.get<OldFriends[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('OldFriendService.index(): error retrieving friend: ' + err)
        );
      })
    );
  }

  create(newFriend: OldFriends) : Observable <OldFriends> {
    return this.http.post<OldFriends>(this.url, newFriend).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('OldFriendService.index(): error creating friend' + err)
        )
      }
    )
  )}

    update(friend: OldFriends) : Observable<OldFriends> {
      return this.http.put<OldFriends>(this.url + '/' + friend.id, friend).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('OldFriendService.index(): error updating friend ' + err)
          );
        })
      );
    }

}
