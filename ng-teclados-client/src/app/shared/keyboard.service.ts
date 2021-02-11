import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Keyboard } from './keyboard';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keyboardsUrl = 'http://localhost:8000/teclados';

  constructor(private http: HttpClient) { }

  getKeyboards(): Observable<Keyboard[]> {
    return this.http.get<Keyboard[]>(this.keyboardsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxKeyboardId(): Observable<Keyboard> {
    return this.http.get<Keyboard[]>(this.keyboardsUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getKeyboardById(id: number): Observable<Keyboard> {
    const url = `${this.keyboardsUrl}/${id}`;
    return this.http.get<Keyboard>(url)
      .pipe(
        tap(data => console.log('getKeyboard: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createKeyboard(keyboard: Keyboard): Observable<Keyboard> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    keyboard.id = null;
    return this.http.post<Keyboard>(this.keyboardsUrl, keyboard, { headers: headers })
      .pipe(
        tap(data => console.log('createKeyboard: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteKeyboard(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.keyboardsUrl}/${id}`;
    return this.http.delete<Keyboard>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteKeyboard: ' + id)),
        catchError(this.handleError)
      );
  }

  updateKeyboard(keyboard: Keyboard): Observable<Keyboard> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.keyboardsUrl}/${keyboard.id}`;
    return this.http.put<Keyboard>(url, keyboard, { headers: headers })
      .pipe(
        tap(() => console.log('updateKeyboard: ' + keyboard.id)),
        // Return the keyboard on an update
        map(() => keyboard),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
