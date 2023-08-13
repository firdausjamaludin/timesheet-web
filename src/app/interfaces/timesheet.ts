export interface Timesheet {
    id: number,
    project: string;
    task: string;
    assignedTo: string;
    from: Date;
    to: Date;
    status: string;
}
