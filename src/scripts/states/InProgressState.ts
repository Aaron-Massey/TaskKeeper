import { TaskState } from "./TaskState";
import { TaskComponent } from "../components/TaskComponent";
import { CompletedState } from "./CompletedState";

export class InProgressState implements TaskState {
  public startTask(task: TaskComponent): void {
    console.error(`Task Already Started: ${task.title}.`);
  }

  public completeTask(task: TaskComponent): void {
    console.log(`Completing Task: ${task.title}.`);
    task.setState(new CompletedState());
  }
}