import { TaskState } from "./TaskState";
import { TaskItem } from "../components/TaskItem";
import { BlockedState } from "./BlockedState";
import { ArchivedState } from "./ArchivedState";
import { CompletedState } from "./CompletedState";

export class InProgressState implements TaskState {
  public startTask(task: TaskItem): void {
    console.error("Task Already Started: ${task.title}");
  }

  public blockTask(task: TaskItem): void {
    console.log("Blocking task: $task.title");
    task.setState(new BlockedState());
  }

  public completeTask(task: TaskItem): void {
    console.log("Completing Task: ${task.title}");
    task.setState(new CompletedState());
  }

  public archiveTask(task: TaskItem): void {
    console.log("Archiving task: ${task.title}");
    task.setState(new ArchivedState());
  }
}
