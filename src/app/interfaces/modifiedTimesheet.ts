export interface ModifiedTimesheet {
  createdAt: string | null;
  updatedAt: string | null;
  isDeleted: boolean;
  timesheetId: number;
  project: string;
  task: string;
  startDate: string;
  dueDate: string;
  user: string;
  status: string;
}
