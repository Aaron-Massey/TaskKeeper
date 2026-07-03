import { TaskState } from "./TaskState";
import { TaskItem } from "../components/TaskItem";
import { ArchivedState } from "./ArchivedState";

export class CompletedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error(`Task already completed: ${task.title}.`);
  }

  public blockTask(task: TaskItem): void {
    console.error(`Task already completed: ${task.title}.`);
  }

  public completeTask(task: TaskItem): void {
    console.error(`Task already completed: ${task.title}.`);
  }

  public archiveTask(task: TaskItem): void {
    console.log(`Archiving task: ${task.title}`);
    task.setState(new ArchivedState());
  }
}
