import { TaskItem } from '../components/TaskItem';

export interface TaskState {
  startTask(task: TaskItem): void;
  completeTask(task: TaskItem): void;
}
