import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ModifiedTimesheet} from "../interfaces/modifiedTimesheet";
import {Timesheet} from "../interfaces/timesheet";
import {environment} from "../../environments/environment.development";
import {parse} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(
    private http: HttpClient) {
  }

  protected getUrl(url: String) {
    return environment.apiUrl + url;
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // List all Data API
  listAll(): Observable<ModifiedTimesheet[]> {
    let url = this.getUrl(`/api/timesheet/listTimesheet`);
    return this.http.get<Timesheet[]>(url, this.httpOptions)
      .pipe(
        map((data: Timesheet[]) => {
          return data.map(item => {
            const fromDate = parse(item.startDate, 'yyyy-MM-dd', new Date());
            const toDate = parse(item.dueDate, 'yyyy-MM-dd', new Date());

            const userData = item.user.user;
            const statusData = item.status.status;

            return {
              timesheetId: item.timesheetId,
              project: item.project,
              task: item.task,
              user: userData,
              startDate: fromDate,
              dueDate: toDate,
              status: statusData,
              createdAt: null,
              updatedAt: null,
              isDeleted: false
            };
          });
        })
      );
  }

  // Search Specific Data API
  listTask(str: string): Observable<ModifiedTimesheet[]> {
    let url = this.getUrl(`/api/timesheet/listTask`);
    const requestBody = {task: str};

    return this.http.post<Timesheet[]>(url, requestBody, this.httpOptions)
      .pipe(
        map((data: Timesheet[]) => {
          return data.map(item => {
            const fromDate = parse(item.startDate, 'yyyy-MM-dd', new Date());
            const toDate = parse(item.dueDate, 'yyyy-MM-dd', new Date());

            const userData = item.user.user;
            const statusData = item.status.status;

            return {
              timesheetId: item.timesheetId,
              project: item.project,
              task: item.task,
              user: userData,
              startDate: fromDate,
              dueDate: toDate,
              status: statusData,
              createdAt: null,
              updatedAt: null,
              isDeleted: false
            };
          });
        })
      );
  }

  // Add Data API

  // Edit Data API

  // Delete Specific Data API
}
