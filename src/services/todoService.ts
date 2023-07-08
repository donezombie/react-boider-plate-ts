import { TODO_URL } from 'consts/apiUrl';
import httpService from './httpService';
import { CommonFilters } from 'interfaces/common';
import { Todo } from 'interfaces/todo';
import { AxiosResponse } from 'axios';

export interface RequestGetToDoList extends CommonFilters {}
export type ResponseToDoList = AxiosResponse<Todo[]>;

class TodoService {
  getTodoList(filters: RequestGetToDoList): Promise<ResponseToDoList> {
    return httpService.get(`${TODO_URL}?_page=${filters.page}&_limit=${filters.rowsPerPage}`);
  }
}

export default new TodoService();
