import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, throwError } from "rxjs";
import { TodosApiService } from "../layer1-api/todos-api.service";
import { defaultErrorHandler } from "./default-error-handler.function";
import { ErrorType } from "./error-type.enum";
import { HandledError } from "./handled-error";
import { Todo } from "./todo";

@Injectable({ providedIn: 'root' })
export class TodosRepoService {
    constructor(private _todosApi: TodosApiService) { }

    todos(): Observable<Todo[]> {
        return this._todosApi.todoList()
            .pipe(
                delay(1500),
                map(ts => ts.map(t => {
                    try {
                        // throw new Error('ERROROROROR');
                        return new Todo(t);
                    } catch (err: any) {
                        throw new Error(err?.error?.message ?? err?.message ?? 'Что-то пошло не так X(|');
                    }
                })),
                catchError((err) => throwError(() => defaultErrorHandler(err))),
            );
    }
}