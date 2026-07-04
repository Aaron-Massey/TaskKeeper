import { TaskState } from "./TaskState";
import { TaskItem } from "../components/TaskItem";

export class ArchivedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error(`Task is already archived: ${task.title}.`);
  }

  public blockTask(task: TaskItem): void {
    console.error(`Task is already archived: ${task.title}.`);
  }

  public completeTask(task: TaskItem): void {
    console.error(`Task is already archived: ${task.title}.`);
  }

  public archiveTask(task: TaskItem): void {
    console.error(`Task is already archived: ${task.title}.`);
  }
}
