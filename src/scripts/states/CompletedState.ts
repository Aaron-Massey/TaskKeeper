import { TaskState } from './TaskState';
import { TaskItem } from '../components/TaskItem';

export class CompletedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error(`Task already completed: ${task.title}.`);
  }

  public completeTask(task: TaskItem): void {
    console.error(`Task already completed: ${task.title}.`);
  }
}
