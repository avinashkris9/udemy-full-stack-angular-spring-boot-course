import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] =[];
  totalQuantity: number;
  totalPrice: number;;
  subscription: Subscription;
  constructor(private cartService:CartService) {
  
   }

  ngOnInit(): void {

    this.listCartDetails();
  }
  listCartDetails() {
    

   this.cartItems =this.cartService.getAllCartItems();
  
   this.cartService.totalPrice.subscribe
   (
     data =>
     {
       
       this.totalPrice=data;
     }
     );
   this.cartService.totalQuantity.subscribe
   (
     data => 
     { console.log( " cart -details -subscribe -total -quantity" + data);
       this.totalQuantity=data
     }
   );

   /*
     With a normal Subject, Observers that are subscribed at a point later will not *receive data values emitted. So the above subscriber will not get data as it is called at a later point of time. So when we hit subscribe ,we only get undefined.

     So we need to emit next() again by calling the computeCartTotalPrice function.
     So i am changing to behavioral subject which emits latest value.
     
    */
   
  //this.cartService.computeCartTotalPrice();


 




   console.log( "cart details "+ this.totalPrice + " " +this.totalQuantity);
 
  }



  /**
   * Update quantity on cart 
   */

  incrementQuantity(cartItem :CartItem)
   {
        this.cartService.addToCart(cartItem);
   }

   decrementQuantity(cartItem:CartItem)
   {
      this.cartService.decrementQuantity(cartItem);
   }

   removeFromCart(cartItem:CartItem)
   {
     this.cartService.removeFromCart(cartItem);
   }
}
