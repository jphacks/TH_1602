import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CategoryResponse } from '../../../api/'

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {
  categories: Array<CategoryResponse> = null
  constructor(public navCtrl: NavController) {
    
  }

}
