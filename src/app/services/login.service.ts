import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/users/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const loginRequest = { email, password };
    return this.http.post<string>(`${this.apiUrl}`, loginRequest);
  }
}
