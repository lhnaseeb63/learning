import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * NgModule brought in from the Angular Core
 * When you create a component using the CLI, it will 
 * automatically format it as shown above at line 8 with
 * declarations, imports, providers, and bootstrap. 
 * 
 * 
 * BrowserModule is for interacting with the DOM
 * Providers is for any global services
 * 
 */