import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Timesheet} from "../interfaces/timesheet";
import {Response} from "../interfaces/response";
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
        return environment.apiUrl+url;
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // List all Data API
    listAll():Observable<Timesheet[]> {
        let url = this.getUrl(`/timesheet`);
        return this.http.get<Response[]>(url, this.httpOptions)
            .pipe(
                map((data: Response[]) => {
                    return data.map(item => {
                        const fromDate = parse(item.from, 'dd-MM-yyyy', new Date()); // Parse the date
                        const toDate = parse(item.to, 'dd-MM-yyyy', new Date());

                        return {
                            id: item.id,
                            project: item.project,
                            task: item.task,
                            assignedTo: item.assignedTo,
                            from: fromDate,
                            to: toDate,
                            status: item.status
                        };
                    });
                })
            );
    }

    // Search Specific Data API

    // Add Data API

    // Edit Data API

    // Delete Specific Data API
}
