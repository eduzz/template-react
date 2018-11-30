import { IUpsell, IUpsellCourse, IUpsellCourses, IUpsellList, IUpsellProduct } from 'interfaces/models/upsell';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

export const products: IUpsellProduct[] = [
  {
    id: 1,
    title: '09987 - Design Sprint Google Ventures',
    image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
    price: 46,
    content: 'a',
    children: [
      {
        id: 1,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
        price: 46,
        content: 'aa',
      },
      {
        id: 2,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
        price: 50,
        content: 'ab',
      },
      {
        id: 3,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
        price: 239,
        content: 'ac',
      },
    ],
  },
  {
    id: 2,
    title: '09987 - Design Sprint Google Ventures',
    image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
    price: 46,
    content: 'b',
  },
  {
    id: 3,
    title: '09987 - Pacote de cursos 12 houses',
    image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
    price: 46,
    content: 'c',
    children: [
      {
        id: 1,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
        price: 46,
        content: 'ca',
      },
      {
        id: 2,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
        price: 46,
        content: 'cb',
      },
      {
        id: 3,
        title: 'Design Sprint Promoção para Assinantes',
        image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
        price: 700,
        content: 'cc',
      },
    ],
  },
];

class UpsellService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);
  private products$ = new rxjs.BehaviorSubject<IUpsellProduct[]>(null);

  public getCourses() {
    return apiService.get<IUpsellCourses[]>('producer/courses/my').pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public getCourse(courseId: number) {
    return apiService.get<IUpsellCourse>('/producer/upsell/gettreecourse/' + courseId).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public loadProducts(type: number): void {
    apiService.get<IUpsellProduct[]>('/producer/upsell/products/' + type).pipe(
      // rxjsOperators.map(response => response.data),
      rxjsOperators.map(response => products), // MOCK
    ).subscribe(products => {
      this.products$.next(products);
    }, error => {
      this.products$.error(products);
    });
  }

  public getProducts(type: number): rxjs.Observable<IUpsellProduct[]> {
    if (!this.products$.value)
      this.loadProducts(type);

    return this.products$.asObservable();
  }

  public getUpsell(code: number) {
    return apiService.get<IUpsell>('/producer/upsell/' + code).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public list(orderBy: string, orderDirection: string) {
    return apiService.get<IUpsellList[]>('/producer/upsell', { orderby: orderBy, order: orderDirection }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(upsell: IUpsell) {
    return !upsell.id ?
      apiService.post<IUpsellList>(`/producer/upsell`, upsell) :
      apiService.put<IUpsellList>(`/producer/upsell/${upsell.id}`, upsell);
  }

  public edit(id: number, upsell: IUpsellList) {
    return;
  }

  public delete(id: number) {
    return apiService.delete(`producer/upsell/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }
}

const upsellService = new UpsellService();
export default upsellService;