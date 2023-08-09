import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCardAppearance} from "@angular/material/card";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface ListData {
  project: string;
  task: string;
  assignedTo: string;
  from: string;
  to: string;
  status: string;
}

const TASK_DATA: ListData[] = [
  {project: 'Timesheet Application', task: 'Create HTML Layout', assignedTo: 'Johan Arif', from: '10-01-2023', to: '10-01-2023', status: 'Closed'},
  {project: 'Timesheet Application', task: 'Create Back-End Service', assignedTo: 'Mariam Mohammad', from: '10-01-2023', to: '10-01-2023', status: 'Open'},
  {project: 'Timesheet Application', task: 'Create Database', assignedTo: 'Johan Arif', from: '10-01-2023', to: '10-01-2023', status: 'In Progress'},
  {project: 'Timesheet Application', task: 'Create Database Tables', assignedTo: 'Mariam Mohammad', from: '10-01-2023', to: '10-01-2023', status: 'Open'},
  {project: 'Timesheet Application', task: 'Create CSS', assignedTo: 'Johan Arif', from: '10-01-2023', to: '10-01-2023', status: 'In Progress'},
  {project: 'Timesheet Application', task: 'Create Angular Code', assignedTo: 'Mariam Mohammad', from: '10-01-2023', to: '10-01-2023', status: 'Open'},
];


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit {
  cardAppearance: MatCardAppearance = 'outlined';

  displayedColumns: string[] = ['project', 'task', 'assignedTo', 'from', 'to', 'status', 'action'];
  dataSource = new MatTableDataSource(TASK_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
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
}


