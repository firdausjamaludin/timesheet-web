import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestapiService} from "../../services/restapi.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModifiedTimesheet} from "../../interfaces/modifiedTimesheet";
import {FormService} from "../../services/form.service";
import {Status} from "../../interfaces/status";
import {User} from "../../interfaces/user";

@Component({
    selector: 'app-create-edit',
    templateUrl: './create-edit.component.html',
    styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
    userForm: FormGroup;

    statusData: Status[] = [
      {statusId: 1, status: "Closed"},
      {statusId: 2, status: "Open"},
      {statusId: 3, status: "In Progress"},
    ];

    userData: User[] = [
      {userId: 1, user: "Johan Arif"},
      {userId: 2, user: "Mariam Mohammad"}
    ];

    constructor(
        private formBuilder: FormBuilder,
        private restApiService: RestapiService,
        private formService: FormService,
        private dialogRef: MatDialogRef<CreateEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModifiedTimesheet
    ) {
        this.userForm = this.formBuilder.group({
            // createdAt: [this.data ? this.data.createdAt : ''],
            // updatedAt: [this.data ? this.data.updatedAt : ''],
            // isDeleted: [this.data ? this.data.isDeleted : ''],
            timesheetId: [this.data ? this.data.timesheetId : ''],
            project: [this.data ? this.data.project : ''],
            task: [this.data ? this.data.task : ''],
            startDate: [this.data ? this.data.startDate : ''],
            dueDate: [this.data ? this.data.dueDate : ''],
            status: [this.data ? this.data.status : ''],
            user: [this.data ? this.data.user : ''],
        });
    }

    isEditMode: boolean = false;
    formSubmitted: boolean = false;

    ngOnInit(): void {
        this.userForm.patchValue(this.data);
        this.formService.isEditMode$.subscribe((isEditMode: boolean) => {
            this.isEditMode = isEditMode;
        });
    }

    onFormSubmit() {
        this.formSubmitted = true;
        console.log(this.userForm);
        if (this.userForm.valid) {
            console.log("this.data check", this.data);
            if (this.data) {
                const formData = this.userForm.value;
                //formData.updatedAt = new Date().toISOString(); // Include current date in the createdAt field
                //formData.isDeleted = "false";

                this.restApiService.editTimesheet(formData).subscribe({
                    next: () => {
                        alert("Timesheet updated");
                        this.dialogRef.close(true);
                        this.formService.toggleEditMode();
                    },
                    error: console.log,
                });
            } else {
                console.log(this.userForm.value);
                const formData = this.userForm.value;

                //formData.createdAt = new Date().toISOString(); // Include current date in the createdAt field
                console.log("formData.createdAt", formData.createdAt);

                this.restApiService.createTimesheet(formData).subscribe({
                    next: () => {
                        alert("User added successfully");
                        this.dialogRef.close(true);
                    },
                    error: console.log,
                });
            }
        }
    }

}
