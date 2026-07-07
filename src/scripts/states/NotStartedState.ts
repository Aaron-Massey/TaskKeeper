import { TaskState } from "./TaskState";
import { CompletedState } from "./CompletedState";
import { TaskComponent } from "../components/TaskComponent";

export class NotStartedState implements TaskState {
  public completeTask(task: TaskComponent): void {
    task.setState(new CompletedState());
  }
}
