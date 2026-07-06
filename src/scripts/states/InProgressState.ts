import { TaskState } from './TaskState';
import { TaskItem } from '../components/TaskItem';
import { CompletedState } from './CompletedState';

export class InProgressState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error(`Task Already Started: ${task.title}.`);
  }

  public completeTask(task: TaskItem): void {
    console.log(`Completing Task: ${task.title}.`);
    task.setState(new CompletedState());
  }
}
