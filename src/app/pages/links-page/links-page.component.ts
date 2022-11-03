import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from 'src/app/models/link';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {

  constructor(private _data: DataService) { }

  items$: Observable<Link[]> = this._data.list();

  ngOnInit(): void {
  }

}
