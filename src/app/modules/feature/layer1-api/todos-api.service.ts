import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoDto } from "./todo-dto.interface";

@Injectable({ providedIn: 'root' })
export class TodosApiService {
    private _base = 'https://jsonplaceholder.typicode.com';

    constructor(private _http: HttpClient) { }

    todoList(): Observable<TodoDto[]> {
        environment
        return this._http.get<TodoDto[]>(`${this._base}/todos`);
    }
}