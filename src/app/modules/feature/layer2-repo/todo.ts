import { TodoDto } from "../layer1-api/todo-dto.interface";

export class Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;

    constructor(dto: TodoDto = null) {
        this.userId = dto?.userId;
        this.id = dto?.id;
        this.title = dto?.title;
        this.completed = dto?.completed;
    }

    getSum(): number {
        return this.userId * this.id;
    }

    get sum(): number {
        return this.userId * this.id;
    }
}