import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ModifiedTimesheet} from "../interfaces/modifiedTimesheet";
import {Timesheet} from "../interfaces/timesheet";
import {environment} from "../../environments/environment.development";

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
                        const userData = item.user.user;
                        const statusData = item.status.status;

                        return {
                            timesheetId: item.timesheetId,
                            project: item.project,
                            task: item.task,
                            user: userData,
                            startDate: item.startDate,
                            dueDate: item.dueDate,
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

                        const userData = item.user.user;
                        const statusData = item.status.status;

                        return {
                            timesheetId: item.timesheetId,
                            project: item.project,
                            task: item.task,
                            user: userData,
                            startDate: item.startDate,
                            dueDate: item.startDate,
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
    createTimesheet(formData: ModifiedTimesheet): Observable<any> {
        let url = this.getUrl(`/api/timesheet/createTimesheets`);

        return this.http.post(url, formData, this.httpOptions);
    }

    // Edit Data API
    editTimesheet(formData: ModifiedTimesheet): Observable<any> {
        const url = this.getUrl(`/editTimesheets/${formData.timesheetId}`);

        return this.http.put(url, formData, this.httpOptions);
    }

    // Delete Specific Data API
    deleteTimesheet(timesheetId: number): Observable<any> {
        const url = this.getUrl(`/deleteTimesheets/${timesheetId}`);
        return this.http.delete(url, this.httpOptions);
    }
}
