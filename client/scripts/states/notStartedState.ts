import { TaskState } from "./TaskState";
import { TaskItem } from "../components/TaskItem";
import { InProgressState } from "./InProgressState";
import { ArchivedState } from "./ArchivedState";

export class NotStartedState implements TaskState {
  public startTask(task: TaskItem): void {
    console.log(`Starting task: ${task.title}`);
    task.setState(new InProgressState());
  }

  public blockTask(task: TaskItem): void {
    console.error(
      `Cannot block a task that hasn't been started: ${task.title}`,
    );
  }

  public completeTask(task: TaskItem): void {
    console.error(
      `Cannot complete a task that hasn't been started: ${task.title}`,
    );
  }

  public archiveTask(task: TaskItem): void {
    console.log(`Archiving task: ${task.title}`);
    task.setState(new ArchivedState());
  }
}
