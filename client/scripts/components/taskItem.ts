import { taskComponent } from './taskComponent';
import { taskState } from '../states/taskState';
import { notStartedState } from '../states/notStartedState';

export class taskItem implements taskComponent {
  public title: string;
  public description: string;
  public dueDate: Date;
  private id: number;

  private state: taskState;

  constructor(title: string, description: string, id: number, dueDate?: Date) {
    this.title = title;
    this.description = description;
    if (dueDate) {
      this.dueDate = dueDate;
    } else {
      this.dueDate = new Date;
    }

    this.id = id;

    this.state = new notStartedState();
  }
}
