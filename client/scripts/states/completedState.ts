import { taskState } from "./taskState";
import { taskItem } from "../components/taskItem";
import { archivedState } from "./archivedState";

export class notStartedState implements taskState {
  public startTask(task: taskItem): void {
    console.error("Task already completed: ${task.title}.");
  }

  public blockTask(task: taskItem): void {
    console.error("Task already completed: ${task.title}.");
  }

  public completeTask(task: taskItem): void {
    console.error("Task already completed: ${task.title}.");
  }

  public archiveTask(task: taskItem): void {
    console.log("Archiving task: ${task.title}");
    task.setState(new archivedTask());
  }
}
