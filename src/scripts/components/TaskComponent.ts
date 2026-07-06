export interface TaskComponent {
    title: string;
    description: string;

    display(indentation?: string): void;

    getID(): string;
    getChildren(): TaskComponent[];
    addComponent(component: TaskComponent): void;
    removeComponent(component: TaskComponent): void;
}
