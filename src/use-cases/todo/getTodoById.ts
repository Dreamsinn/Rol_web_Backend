import { GetResponseData } from '../../domain/interficies/response/ResponseData';
import { TodoOutput } from '../../domain/interficies/todo/TodoOutput';
import { Todo } from '../../domain/interficies/todo/Todo';
import { UseCase } from '../UseCase';
import { TodoService } from '../../infraestructure/services/todoService';
import { UseCaseData } from '../../domain/interficies/UseCaseData';

export class GetTodoById extends UseCase {
    private todoService: TodoService;

    constructor(service: TodoService) {
        super();
        this.todoService = service;
    }

    public async call({
        params,
        ...props
    }: UseCaseData<any>): Promise<GetResponseData<TodoOutput | TodoOutput[]>> {
        const id: string = params.id;

        const idsList = id.split(',');

        const queryVariables = this.createqueryVariables(idsList);

        const response: Todo[] = await this.todoService.getTodoByIds(
            queryVariables,
            idsList,
        );

        const items = this.mapResponse(response);

        if (items.length === 1) {
            return { items: items[0] };
        }

        return { items };
    }

    private createqueryVariables(idsList: string[]): string {
        let queryString = '';

        for (let i = 1; idsList.length > i - 1; i++) {
            queryString += `$` + i + ', ';
        }

        return queryString.slice(0, -2);
    }

    private mapResponse(response: Todo[]): TodoOutput[] {
        const output = response.map((todo: Todo) => {
            if (todo.update_at) {
                const mappedTodo = {
                    id: todo.id,
                    description: todo.description,
                    create_at: todo.create_at,
                    update_at: todo.update_at,
                };

                return mappedTodo;
            }

            const mappedTodo = {
                id: todo.id,
                description: todo.description,
                create_at: todo.create_at,
            };

            return mappedTodo;
        });

        return output;
    }
}
