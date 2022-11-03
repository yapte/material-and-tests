import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HandledError } from '../layer2-repo/handled-error';
import { FeatureFacadeService } from '../layer3-facade/feature-facade.service';
import { FeaturePageModel } from '../layer3-facade/feature-page-model.interface';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  inProgress$: Observable<boolean> = this._facade.inProgress$;
  page$: Observable<FeaturePageModel> = this._facade.page$;
  error$: Observable<HandledError> = this._facade.error$;

  constructor(private _facade: FeatureFacadeService) { }

  ngOnInit(): void {
    this._facade.init();
  }

  update() {
    this._facade.update();
  }

}
