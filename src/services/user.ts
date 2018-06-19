import { IUser } from 'interfaces/user';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class UserService {
  constructor() { }

  public save(model: IUser): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => null)
    );
  }
}

const userService = new UserService();
export default userService;