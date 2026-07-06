import { TaskComponent } from "../components/TaskComponent";

export interface TaskState {
  startTask(task: TaskComponent): void;
  completeTask(task: TaskComponent): void;
}