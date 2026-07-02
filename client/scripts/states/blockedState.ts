import { taskState } from "./taskState";
import { taskItem } from "../components/taskItem";

export class notStartedState implements taskState {
  public startTask(task: taskItem): void {
    console.error("Task is currently blocked: ${task.title}.");
  }

  public blockTask(task: taskItem): void {
    console.error("Task is currently blocked: ${task.title}.");
  }

  public completeTask(task: taskItem): void {
    console.error("Task is currently blocked: ${task.title}.");
  }

  public archiveTask(task: taskItem): void {
    console.error("Task is currently blocked: ${task.title}.");
  }
}
