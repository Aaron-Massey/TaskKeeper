import { taskState } from "./taskState";
import { taskItem } from "../components/taskItem";
import { inProgressState } from "./inProgressState";
import { archivedState } from "./archivedState";

export class notStartedState implements taskState {
  public startTask(task: taskItem): void {
    console.log("Starting task: ${task.title}");
    task.setState(new inProgressState());
  }

  public blockTask(task: taskItem): void {
    console.log("Blocking task: $task.title");
  }

  public completeTask(task: taskItem): void {
    console.error("Cannot complete a task that hasn't been started.");
  }

  public archiveTask(task: taskItem): void {
    console.log("Archiving task: ${task.title}");
    task.setState(new archivedState());
  }
}
