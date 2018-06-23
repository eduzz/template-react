import { IAccessGroup } from 'interfaces/accessGroup';
import { IAccessGroupModule } from 'interfaces/accessGroupModule';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class AccessGroupService {
  private data = new Array(5).fill('').map<IAccessGroup>((v, index) => ({
    id: index + 1,
    name: 'Group ' + (index + 1),
    modules: [{
      id: 1,
      name: 'Module 1',
      create: true,
      view: false,
      delete: true
    }]
  }));

  constructor() { }

  public list(): rxjs.Observable<IAccessGroup[]> {
    return rxjs.of(this.data).pipe(
      rxjsOperators.delay(400)
    );
  }

  public listModules(): rxjs.Observable<IAccessGroupModule[]> {
    const data = new Array(5).fill('').map<IAccessGroupModule>((v, index) => ({
      id: index,
      name: 'Modulo ' + index
    }));

    return rxjs.of(data).pipe(
      rxjsOperators.delay(400)
    );
  }

  public save(model: IAccessGroup): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => {
        this.data.push({ ...model, id: Date.now() });
      })
    );
  }

  public delete(model: IAccessGroup): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => {
        this.data = this.data.filter(u => u.id !== model.id);
      })
    );
  }
}

const accessGroupService = new AccessGroupService();
export default accessGroupService;