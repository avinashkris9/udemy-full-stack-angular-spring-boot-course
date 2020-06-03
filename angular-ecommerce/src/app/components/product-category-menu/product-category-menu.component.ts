import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
// class responsilbe to grab all product category that you see in sidebar.
export class ProductCategoryMenuComponent implements OnInit {


   productCategories:ProductCategory[];
  constructor( private productService:ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }


  
  listProductCategories()
  {
    this.productService.getProductCategories().subscribe
    (

      data =>
      {
        this.productCategories =data;
      }
    )
      
    
  }
}
