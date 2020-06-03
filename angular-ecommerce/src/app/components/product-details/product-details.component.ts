import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  productId:number;
  // giving an initial value to avoid undefined errors on start.
  product:Product =new Product();
  constructor( private route:ActivatedRoute,private productService:ProductService ,private cartService: CartService) { }

  ngOnInit() {

    this.getProductDetails();
  }

  getProductDetails()
  {

  const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if (hasCategoryId) {
      // read id and assign to number. Use + to convert to string;
      this.productId = +this.route.snapshot.paramMap.get("id");
    
      this.productService.getProductById(this.productId).subscribe
     (

        data => 
        {
          this.product =data;
         // console.log(" Calling API"+this.product.imageUrl);
        }
          )
    }

  }

  addProductToCart(product :Product)
  {

    console.log( ` Adding I am here ${ product.name} to cart `);
    const theCartItem =new CartItem(product);
    this.cartService.addToCart(theCartItem);



  }

}
