export interface ModifiedTimesheet {
  createdAt: string | null;
  updatedAt: string | null;
  isDeleted: boolean;
  timesheetId: number;
  project: string;
  task: string;
  startDate: Date;
  dueDate: Date;
  user: string;
  status: string;
}
