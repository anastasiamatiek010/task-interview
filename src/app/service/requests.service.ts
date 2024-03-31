
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiURL } from '../api';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';
import { DetailsModel } from '../models/details';
import { ReportModel } from '../models/report';
import { AllUserModel } from '../models/all-user';

@Injectable()

export class RequestsService {
    reportRequest() {
        throw new Error('Method not implemented.');
    }
    constructor(private http: HttpClient) { }

    public login(email: string, password: string): Observable<UserModel> {
        return this.http.post<UserModel>(ApiURL + '/api/login', { email, password });
    }

    public getUserAssessments(token: string): Observable<ReportModel[]> {
        const headers = new HttpHeaders({
            'X-Token': token
        });
        return this.http.get<ReportModel[]>(ApiURL + '/api/userassessments', { headers });
    }

    public getUserAssessmentGraph(id: number, token: string): Observable<DetailsModel[]> {
        const headers = new HttpHeaders({
            'X-Token': token,
            id: id,
        });
        return this.http.get<DetailsModel[]>(ApiURL + '/api/userassessments/graph', { headers, params: { id: id } });
    }

    public getUsers(): Observable<AllUserModel[]> {
        const user = JSON.parse(localStorage.getItem('user') ?? '');
        const token = user.token;
        const headers = new HttpHeaders({
            'X-Token': token
        });
        return this.http.get<AllUserModel[]>(ApiURL + '/api/users', { headers });
    }
}