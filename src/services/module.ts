import * as Rx from 'rxjs';
import { IModule } from 'interfaces/models/module';

// import apiService from './api';

const mock: IModule[] = [
  {
    id: 0,
    name: 'Módulo 1',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [
      {
        id: 0,
        name: 'Aula 1',
      },
      {
        id: 1,
        name: 'Aula 2',
      },
      {
        id: 2,
        name: 'Aula 3',
      },
    ],
  },
  {
    id: 1,
    name: 'Módulo 2',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [],
  },
  {
    id: 2,
    name: 'Módulo 3',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [],
  },
  {
    id: 3,
    name: 'Módulo 4',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [],
  },
  {
    id: 4,
    name: 'Módulo 5',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [],
  },
  {
    id: 5,
    name: 'Módulo 6',
    free_module: true,
    hidden_module: true,
    module_validity: 30,
    module_scheduling: 120,
    release_at: '2018-12-25',
    lessons: [],
  },
];

class ModuleService {
  private modules$: Rx.BehaviorSubject<IModule[]> = new Rx.BehaviorSubject(mock);
  private moduleInfo$: Rx.Subject<IModule> = new Rx.Subject();

  public list(): Rx.Observable<IModule[]> {
    return this.modules$.asObservable();
  }

  public setModules(modules: IModule[]): void {
    this.modules$.next(modules);
  }

  public deleteModule(moduleId: number): void {
    this.modules$.next(this.modules$.value.filter(module => module.id !== moduleId));
  }

  public getModuleInfo(): Rx.Observable<IModule> {
    return this.moduleInfo$.asObservable();
  }

  public editModule(module: IModule): void {
    this.moduleInfo$.next(module);
  }

  public newModule(): void {
    this.moduleInfo$.next();
  }

  public deleteLesson(moduleId: number, lessonId: number): void {
    this.modules$.next(this.modules$.value.map(module => {
      if (module.id === moduleId)
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId),
        };
      return module;
    }));
  }
}

const moduleService = new ModuleService();
export default moduleService;