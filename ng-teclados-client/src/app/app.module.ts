import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KeyboardItemComponent } from './keyboard-item/keyboard-item.component';
import { KeyboardDetailComponent } from './keyboard-detail/keyboard-detail.component';
import { KeyboardService } from './shared/keyboard.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { KeyboardEditComponent } from './keyboard-edit/keyboard-edit.component';
import { KeyboardData } from './shared/keyboard-data';
import { HttpClientModule } from '@angular/common/http';
import { KeyboardNewComponent } from './keyboard-new/keyboard-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    KeyboardItemComponent,
    KeyboardDetailComponent,
    KeyboardEditComponent,
    KeyboardNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(KeyboardData)
  ],
  providers: [KeyboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
