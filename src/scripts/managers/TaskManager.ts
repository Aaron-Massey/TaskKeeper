import { TaskList } from "../components/TaskList";
import { TaskItem } from "../components/TaskItem";
import { TaskComponent } from "../components/TaskComponent";
import { NotStartedState } from "../states/NotStartedState";

export class taskManager {
  public rootFolder: TaskList;
  private currentID: number = 0;

  constructor(projectName: string) {
    this.rootFolder = new TaskList(
      projectName,
      "The root folder for all tasks",

      this.generateID(),
      new NotStartedState(),
    );
  }

  private generateID(): number {
    this.currentID += 1;
    return this.currentID;
  }

  public createTask(
    title: string,
    description: string,
    targetFolder: TaskList,
  ): TaskItem {
    const newTask = new TaskItem(title, description, this.generateID());
    targetFolder.addComponent(newTask);

    console.log(`Task "${title}" created in folder "${targetFolder.title}".`);
    return newTask;
  }

  public createFolder(
    title: string,
    description: string,
    targetFolder: TaskList,
  ): TaskList {
    const newFolder = new TaskList(
      title,
      description,

      this.generateID(),
      new NotStartedState(),
    );
    targetFolder.addComponent(newFolder);

    console.log(`Folder "${title}" created in folder "${targetFolder.title}".`);
    return newFolder;
  }
}
