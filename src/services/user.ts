import { IUser } from 'interfaces/user';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class UserService {
  private users: ReadonlyArray<IUser> = new Array(50).fill('').map<IUser>((v, index) => ({
    id: index + 1,
    name: 'Daniel Prado ' + (index + 1),
    email: `daniel.prado.${index}@eduzz.com`,
    course: 'Curso de Teste',
    group: 'Administradores'
  }));

  constructor() { }

  public list(): rxjs.Observable<ReadonlyArray<IUser>> {
    return rxjs.of(this.users).pipe(
      rxjsOperators.delay(400)
    );
  }

  public save(model: IUser): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => {
        if (!model.id) {
          this.users = [
            ...this.users,
            { ...model, id: Date.now() }
          ];
          return;
        }

        this.users = [
          model,
          ...this.users.filter(u => u.id !== model.id)
        ];
      })
    );
  }

  public delete(user: IUser): rxjs.Observable<void> {
    return rxjs.of(user).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      })
    );
  }
}

const userService = new UserService();
export default userService;