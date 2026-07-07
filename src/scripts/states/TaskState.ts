import { TaskComponent } from "../components/TaskComponent";

export interface TaskState {
  completeTask(task: TaskComponent): void;
}
