export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate:string
};

export type TaskState = {
  tasks: Task[];
  searchQuery: string;
};

export type HeaderProps ={
  onMenuClick: () => void;
}

export type Status = string;

export type StatusFilterProps = {
  statusFilter: Status;
  setStatusFilter: (status: Status) => void;
};

