import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Link } from '../models/link';
import { Product } from '../pages/products-page/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _base = 'http://api.fruit-design.ru/data';

  constructor(private _http: HttpClient) { }

  list(): Observable<Link[]> {
    return this._http.get<Link[]>(`${this._base}/links`);
  }

  moq(): Observable<Product[]> {
    const list: Product[] = 'qwertyuiolmnbvcds'.split('')
      .map(
        (x, index) => ({
          id: index + 1,
          name: `${x.toUpperCase()}-product`,
          description: index % 2
            ? 'Lorem ipsum at possimus.'
            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, possimus.',
          price: 10365 - index * index * 79,
          isActive: !!(index % 5),
        } as Product)
      );

    return of(list).pipe(delay(1000));
  }
}
