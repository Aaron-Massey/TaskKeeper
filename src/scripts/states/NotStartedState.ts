import { TaskState } from './TaskState';
import { TaskItem } from '../components/TaskItem';
import { InProgressState } from './InProgressState';

export class NotStartedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.log(`Starting task: ${task.title}`);
    task.setState(new InProgressState());
  }

  public completeTask(task: TaskItem): void {
    console.log(`Ending task: ${task.title}.`);
  }
}
