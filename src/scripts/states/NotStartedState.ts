import { TaskState } from "./TaskState";
import { TaskComponent } from "../components/TaskComponent";
import { InProgressState } from "./InProgressState";

export class NotStartedState implements TaskState {
  public startTask(task: TaskComponent): void {
    console.log(`Starting task: ${task.title}`);
    task.setState(new InProgressState());
  }

  public completeTask(task: TaskComponent): void {
    console.log(`Ending task: ${task.title}.`);
  }
}