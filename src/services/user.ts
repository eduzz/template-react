import { IUser } from 'interfaces/user';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class UserService {
  constructor() { }

  public list(): rxjs.Observable<IUser[]> {
    const data = new Array(50).fill('').map<IUser>((v, index) => ({
      id: index + 1,
      name: 'Daniel Prado ' + (index + 1),
      email: `daniel.prado.${index}@eduzz.com`,
      course: 'Curso de Teste',
      group: 'Administradores'
    }));

    return rxjs.of(data).pipe(
      rxjsOperators.delay(2000)
    );
  }

  public save(model: IUser): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => null)
    );
  }
}

const userService = new UserService();
export default userService;