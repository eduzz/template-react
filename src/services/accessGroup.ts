import { IAccessGroup } from 'interfaces/accessGroup';
import { IAccessGroupModule } from 'interfaces/accessGroupModule';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

export class AccessGroupService {
  constructor() { }

  public list(): rxjs.Observable<IAccessGroup[]> {
    const data = new Array(5).fill('').map<IAccessGroup>((v, index) => ({
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

    return rxjs.of(data).pipe(
      rxjsOperators.delay(2000)
    );
  }

  public listModules(): rxjs.Observable<IAccessGroupModule[]> {
    const data = new Array(5).fill('').map<IAccessGroupModule>((v, index) => ({
      id: index,
      name: 'Modulo ' + index
    }));

    return rxjs.of(data).pipe(
      rxjsOperators.delay(2000)
    );
  }

  public save(model: IAccessGroup): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => null)
    );
  }

  public delete(model: IAccessGroup): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => null)
    );
  }
}

const accessGroupService = new AccessGroupService();
export default accessGroupService;