import { IAuthor } from 'interfaces/author';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class AuthorService {
  private data: ReadonlyArray<IAuthor> = new Array(50).fill('').map<IAuthor>((v, index) => ({
    id: index + 1,
    name: 'Author ' + (index + 1),
    description: null,
    avatar: null
  }));

  constructor() { }

  public list(): rxjs.Observable<ReadonlyArray<IAuthor>> {
    return rxjs.of(this.data).pipe(
      rxjsOperators.delay(400)
    );
  }

  public save(model: IAuthor): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => {
        if (!model.id) {
          this.data = [
            ...this.data,
            { ...model, id: Date.now() }
          ];
          return;
        }

        this.data = [
          model,
          ...this.data.filter(u => u.id !== model.id)
        ];
      })
    );
  }

  public delete(user: IAuthor): rxjs.Observable<void> {
    return rxjs.of(user).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => {
        this.data = this.data.filter(u => u.id !== user.id);
      })
    );
  }
}

const authorService = new AuthorService();
export default authorService;