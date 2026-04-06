export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
};

export type TaskState = {
  tasks: Task[];
  searchQuery: string;
};

export type HeaderProps ={
  onMenuClick: () => void;
}

export type TaskForm = {
  title: string;
  description: string;
  status: string;
};