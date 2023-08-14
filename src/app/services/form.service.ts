import {Injectable, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RestapiService} from "./restapi.service";
import {BehaviorSubject} from "rxjs";
import {CreateEditComponent} from "../timesheet/create-edit/create-edit.component";

@Injectable({
  providedIn: 'root'
})
export class FormService implements OnInit{

  constructor(
      private restApiService: RestapiService,
      public dialog: MatDialog
  ) { }

  private isEditModeSubject = new BehaviorSubject<boolean>(false);
  isEditMode$ = this.isEditModeSubject.asObservable();

  toggleEditMode() {
    this.isEditModeSubject.next(!this.isEditModeSubject.value);
  }

  openAddEditForm() {
    const dialogRef = this.dialog.open(CreateEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.restApiService.listAll();
          this.toggleEditMode();
        }
      }
    });
  }

  userEditForm(data: any) {
    const dialogRef = this.dialog.open(CreateEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.restApiService.listAll();
        } else {
          this.toggleEditMode();
        }
      }
    });
    this.toggleEditMode();
  }

  ngOnInit(): void {
    let getAllData = this.restApiService.listAll();
  }


}
