import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCardAppearance} from "@angular/material/card";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RestapiService} from "../../services/restapi.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  cardAppearance: MatCardAppearance = 'outlined';


  displayedColumns: string[] = ['project', 'task', 'assignedTo', 'from', 'to', 'status', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private restApiService: RestapiService
  ) {
  }

  ngOnInit() {
    this.restApiService.listAll().subscribe(data => {
      this.dataSource.data = data;
    })
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


