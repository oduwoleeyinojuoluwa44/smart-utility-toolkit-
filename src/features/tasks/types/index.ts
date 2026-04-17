export type TaskPriority = 'high' | 'medium' | 'low';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: number;
};
