import { TaskItem } from "../components/TaskItem";

export interface TaskState {
  startTask(task: TaskItem): void;
  blockTask(task: TaskItem): void;
  completeTask(task: TaskItem): void;
  archiveTask(task: TaskItem): void;
}
