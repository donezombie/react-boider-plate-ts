import { TODOS_URL } from 'constants/apiUrl';
import { PromiseResponseBase } from 'interfaces/common';
import httpService from './httpService';

class TodoService {
  getTodos(): PromiseResponseBase<{ id: number; title: string }[]> {
    return httpService.get(TODOS_URL);
  }
}

export default new TodoService();
