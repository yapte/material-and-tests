import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditorComponent } from './features/article-editor/article-editor/article-editor.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { StickyPageComponent } from './pages/sticky-page/sticky-page.component';
import { ThreePageComponent } from './pages/three-page/three-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'links', component: LinksPageComponent },
  { path: 'three', component: ThreePageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'article-editor', component: ArticleEditorComponent },
  { path: 'feature', loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule) },
  { path: 'sticky', component: StickyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
