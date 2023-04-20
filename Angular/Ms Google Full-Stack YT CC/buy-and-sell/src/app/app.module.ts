import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsPageComponent } from './components/listings-page/listings-page.component';
import { ListingDetailPageComponent } from './components/listing-detail-page/listing-detail-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { MyListingsPageComponent } from './components/my-listings-page/my-listings-page.component';
import { NewListingPageComponent } from './components/new-listing-page/new-listing-page.component';
import { EditListingPageComponent } from './components/edit-listing-page/edit-listing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsPageComponent,
    ListingDetailPageComponent,
    ContactPageComponent,
    MyListingsPageComponent,
    NewListingPageComponent,
    EditListingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
