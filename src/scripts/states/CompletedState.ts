import { TaskState } from "./TaskState";
import { TaskComponent } from "../components/TaskComponent";

export class CompletedState implements TaskState {
  public startTask(task: TaskComponent): void {
    console.error(`Task already completed: ${task.title}.`);
  }

  public completeTask(task: TaskComponent): void {
    console.error(`Task already completed: ${task.title}.`);
  }
}