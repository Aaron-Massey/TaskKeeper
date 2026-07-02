import { taskState } from "./taskState";
import { taskItem } from "../components/taskItem";
import { blockedState } from "./blockedState";
import { archivedState } from "./archivedState";
import { completedState } from "./completedState";

export class notStartedState implements taskState {
  public startTask(task: taskItem): void {
    console.error("Task Already Started: ${task.title}");
  }

  public blockTask(task: taskItem): void {
    console.log("Blocking task: $task.title");
    task.setState(new blockedState());
  }

  public completeTask(task: taskItem): void {
    console.log("Completing Task: ${task.title}");
    task.setTask(new completedState());
  }

  public archiveTask(task: taskItem): void {
    console.log("Archiving task: ${task.title}");
    task.setState(new archivedState());
  }
}
