import { Component, OnInit } from '@angular/core';
import { Listing } from '../../types';
import { fakeListings } from 'src/app/fake-data';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit{
  listings: Listing[] = [];

  ngOnInit(): void{
    this.listings = fakeListings;
  }
}
