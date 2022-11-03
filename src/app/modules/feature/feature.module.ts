import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturePageComponent } from './pages/feature-page/feature-page.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './layer4-ui/feature.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    FeaturePageComponent,
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatSnackBarModule,
  ]
})
export class FeatureModule { }
