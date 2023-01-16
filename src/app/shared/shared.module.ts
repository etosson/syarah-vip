import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from '../shared/search/search.component';
import { RatingComponent } from '../shared/rating/rating.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import {TranslationModule} from '../translation.module';
import { SortPipe } from './pipes/sort.pipe';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { YouTubePlayerModule } from '@angular/youtube-player';






@NgModule({
  declarations: [
    RatingComponent,
    SearchComponent,
    SortPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    TranslationModule,
    ShareButtonsModule,
    YouTubePlayerModule
    

  ],

  exports: [
    CommonModule,
    RatingComponent,
    SearchComponent,
    SortPipe,
    ShareButtonsModule,
    YouTubePlayerModule
    
  ],
  providers:    [ SortPipe ],
})
export class SharedModule { }