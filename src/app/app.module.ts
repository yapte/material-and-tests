import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatNavList } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsComponent } from './components/details/details.component';
import { CreateOrderDialogComponent } from './pages/create-order-dialog/create-order-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ThreePageComponent } from './pages/three-page/three-page.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ArticleEditorComponent } from './features/article-editor/article-editor/article-editor.component';
import { ChatModule } from './features/chat/chat.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { StickyPageComponent } from './pages/sticky-page/sticky-page.component';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailsComponent,
    CreateOrderDialogComponent,
    LinksPageComponent,
    ThreePageComponent,
    ContextMenuComponent,
    ProductsPageComponent,
    ArticleEditorComponent,
    ChatPageComponent,
    StickyPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule,
    ChatModule,

    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB' },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
