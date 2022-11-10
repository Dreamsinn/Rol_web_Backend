import { Request } from 'express';
import { TablesName } from '../../domain/enums/TablesNameEnum';
import { PostResponseData } from '../../domain/interficies/response/ResponseData';
import { Todo } from '../../domain/interficies/todo/Todo';
import { TodoOutput } from '../../domain/interficies/todo/TodoOutput';
import { UseCase } from '../../domain/interficies/UseCase';
import { TodoService } from '../../infraestructure/services/todoService';

export class CreateTodo extends UseCase {
    private todoService: TodoService;

    constructor(service: TodoService) {
        super();
        this.todoService = service;
    }

    public async call({
        query,
        ...req
    }: Request): Promise<PostResponseData<TodoOutput>> {
        const { description } = req.body;
        const response: Todo[] = await this.todoService.createTodo(description);

        const items = this.formatResponse(response);

        return { table: TablesName.TODO, items };
    }

    private formatResponse(response: Todo[]): TodoOutput {
        const output = {
            id: response[0].id,
            description: response[0].description,
            create_at: response[0].create_at,
        };

        return output;
    }
}