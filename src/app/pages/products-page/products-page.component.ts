import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.moq()
      .subscribe({
        next: list => {
          console.log(list);

        }
      });
  }

}
