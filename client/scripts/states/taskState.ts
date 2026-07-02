import { taskItem } from "../components/taskItem";

export interface taskState {
  startTask(task: taskItem): void;
  blockTask(task: taskItem): void;
  completeTask(task: taskItem): void;
  archiveTask(task: taskItem): void;
}
