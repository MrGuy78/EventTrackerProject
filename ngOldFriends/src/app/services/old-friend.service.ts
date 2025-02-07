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
          () => new Error('PokemonService.index(): error retrieving pokemon: ' + err)
        );
      })
    );
  }


}
