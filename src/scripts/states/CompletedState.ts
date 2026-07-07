import { TaskState } from "./TaskState";
import { TaskComponent } from "../components/TaskComponent";
import { NotStartedState } from "./NotStartedState";

export class CompletedState implements TaskState {
  public completeTask(task: TaskComponent): void {
    task.setState(new NotStartedState());
  }
}
