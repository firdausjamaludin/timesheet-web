import {User} from "./user";
import {Status} from "./status";

export interface Timesheet {
  // createdAt: string | null;
  // updatedAt: string | null;
  // isDeleted: boolean;
  timesheetId: number;
  project: string;
  task: string;
  startDate: string;
  dueDate: string;
  user: User;
  status: Status;
}
