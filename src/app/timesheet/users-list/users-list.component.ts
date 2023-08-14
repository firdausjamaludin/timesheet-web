import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatCardAppearance} from "@angular/material/card";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RestapiService} from "../../services/restapi.service";
import {FormService} from "../../services/form.service";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
    cardAppearance: MatCardAppearance = 'outlined';
    displayedColumns: string[] = ['project', 'task', 'user', 'startDate', 'dueDate', 'status', 'action'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private restApiService: RestapiService,
        private formService: FormService
    ) {
    }

    ngOnInit() {
        // this.restApiService.listAll().subscribe(data => {
        //   this.dataSource.data = data;
        // });
        let getAlldata = this.restApiService.listAll();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    search(str: string) {
        this.restApiService.listTask(str).subscribe(data => {
            this.dataSource.data = data || [];
        });
    }


    openAddEditForm() {
        this.formService.openAddEditForm();
    }

    userEditForm(row: any) {
        this.formService.userEditForm(row);

    }

    confirmDelete(row: any) {
        const confirmation = confirm("Are you sure you want to delete this user?");
        if (confirmation) {
            const data = {...row}; // Include any additional data you want to pass
            console.log("data info", data);

            this.deleteUser(data);
        }
    }

    deleteUser(data: any) {
        this.restApiService.deleteTimesheet(data).subscribe({
            next: () => {
                alert("user deleted");
                this.restApiService.listAll();
            },
            error: console.log,
        });
    }


}


