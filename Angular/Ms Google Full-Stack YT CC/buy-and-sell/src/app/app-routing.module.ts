import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsPageComponent } from './components/listings-page/listings-page.component';
import { ListingDetailPageComponent } from './components/listing-detail-page/listing-detail-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { EditListingPageComponent } from './components/edit-listing-page/edit-listing-page.component';
import { NewListingPageComponent } from './components/new-listing-page/new-listing-page.component';
import { MyListingsPageComponent } from './components/my-listings-page/my-listings-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/listings', pathMatch:'full'},
  { path: 'listings', component:ListingsPageComponent, pathMatch: 'full' },
  { path: 'listings/:id', component:ListingDetailPageComponent },
  { path: 'contact/:id', component:ContactPageComponent },
  { path: 'edit-listing', component:EditListingPageComponent },
  { path: 'my-listings', component:MyListingsPageComponent},
  { path: 'new-listing', component:NewListingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
