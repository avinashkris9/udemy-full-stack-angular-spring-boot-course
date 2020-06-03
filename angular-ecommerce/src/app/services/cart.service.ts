import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 


  cartItems :CartItem[]=[];
  // Subject is a subclasss of observables. 
  // Subject publish events and other observables subscribe them.
  totalPrice:BehaviorSubject<number> =new BehaviorSubject<number>(0);
  totalQuantity:Subject<number> =new Subject<number>();
  constructor() { }

  
  getAllCartItems() 
  {

    return this.cartItems;
  }
  /**
   * 
   * @param theCartItem 
   * 
   */
  addToCart(theCartItem :CartItem)
  {
      //check if we already have item
      let alreadyExistInCart: boolean =false;
      let existingCartItem:CartItem =undefined;


      //find the item in cart using item id
    if(this.cartItems.length >0)
    {

      //find and return first match if present. else undefined. 
      existingCartItem= this.cartItems.find(tempCartItem => tempCartItem.id==theCartItem.id);
     
    }

    // if we found an existing cart item , increment the quantity.
    // true if existingCartItem is defined
    alreadyExistInCart=(existingCartItem!=undefined);

    if(alreadyExistInCart)
    {
      existingCartItem.quantity++;
    }
    else
    {
      //add new item to cart
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotalPrice()

  }


  computeCartTotalPrice()
  {

    let totalPriceValue : number=0;
    let totalQuantityValue: number=0;


    for( let tempCartItem of this.cartItems)
    {

      totalPriceValue +=tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue+=tempCartItem.quantity;
    }

    //publish new values... all subscribers wil recieve this data whenever it changes. cool right ? if you dont use service. can we make this possible using the Child ,Parent data pasing of components ?
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log
    this.logCartData(totalPriceValue,totalQuantityValue);

  }

  
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    for( let tempCartItem of this.cartItems)
    {
      const subTotalPrice =tempCartItem.quantity * tempCartItem.unitPrice;
        console.log(` name = ${tempCartItem.name} total price = ${subTotalPrice} total Quantity =${tempCartItem.quantity}`);

    }

    console.log(` Total Price =${totalPriceValue.toFixed(2)} , totalQuantityValue = ${totalQuantityValue}}`);
  }


  

  decrementQuantity(cartItem: CartItem) {

    // update quantity
    cartItem.quantity--;

    
    if(cartItem.quantity==0)
    {
      this.removeFromCart(cartItem);
    }
    else
    {
      //calculate price again.
      this.computeCartTotalPrice();
    }
    
  }

  removeFromCart(cartItem:CartItem)
  {

    
    // // find the item in array and remove.
    
    
    const itemIndex= this.cartItems.findIndex( item => item.id===cartItem.id );
    console.log('Foud item at '+itemIndex);

 
    console.log(this.cartItems[itemIndex]);
    if(itemIndex > -1) //we found an entry.
    {
      this.cartItems.splice(itemIndex,1);
    }
    


   this.computeCartTotalPrice();
    

  }
}
