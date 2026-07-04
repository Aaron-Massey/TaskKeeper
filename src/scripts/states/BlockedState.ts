import { TaskState } from "./TaskState";
import { TaskItem } from "../components/TaskItem";

export class BlockedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error(`Task is currently blocked: ${task.title}.`);
  }

  public blockTask(task: TaskItem): void {
    console.error(`Task is currently blocked: ${task.title}.`);
  }

  public completeTask(task: TaskItem): void {
    console.error(`Task is currently blocked: ${task.title}.`);
  }

  public archiveTask(task: TaskItem): void {
    console.error(`Task is currently blocked: ${task.title}.`);
  }
}
