export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  concluded?: boolean;
  concludedAt?: string;
}

export interface ConcludedTask {
  day: string;
  total_hours: number;
}
