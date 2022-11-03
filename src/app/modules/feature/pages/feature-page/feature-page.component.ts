import { Component, OnInit } from '@angular/core';
import { FeatureFacadeService } from '../../layer3-facade/feature-facade.service';

@Component({
  selector: 'app-feature-page',
  templateUrl: './feature-page.component.html',
  styleUrls: ['./feature-page.component.scss'],
  providers: [FeatureFacadeService]
})
export class FeaturePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
