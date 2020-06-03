import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  totalQuantity: number;
  totalPrice: number;


 
  // FormControl -> Contains Actual form element
  // FormGroup - > Define a group of form control elements.
  // FormBuilder -> A utility service to generate form control/ formGroup, form arrays.
  
  checkoutFormGroup: FormGroup;


  constructor(private formBuilder:FormBuilder, private cartService:CartService) { }


  calculateCartPrice()
  {

    this.cartService.totalPrice.subscribe
    (
      data => this.totalPrice=data
    );

    this.cartService.totalQuantity.subscribe
    (
      data =>this.totalQuantity=data
    );
  }
  ngOnInit(): void {
    
    this.checkoutFormGroup=
        this.formBuilder.group
        (
          { // customer is a form group with a group of elements.
              customer: this.formBuilder.group
              (
                {

                  //form control with default value as an array .
                  firstName: [''],
                  lastName: [''],
                  email: ['']
                }


              ),

              shippingAddress:this.formBuilder.group
              (
                {
                  street: [''],
                  city: [''],
                  state: [''],
                  country: [''],
                  zipCode: ['']
                  
                }
              ),

              billingAddress:this.formBuilder.group
              (
                {
                  street: [''],
                  city: [''],
                  state: [''],
                  country: [''],
                  zipCode: ['']
                  
                }
              ),

              creditCardInformation:this.formBuilder.group
              (
                {
                  cardType: [''],
                  nameOnCard: [''],
                  cardNumber: [''],
                  securityCode: [''],
                  expirationMonth: [''],
                  expirationYear: ['']
                  
                }
              )

          }
        )

        
  }
  onSubmit()
  { 
    console.log(" Submitting form");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  /*
  Checkbox action event to copy shipping address to billing
  */
  copyShippingAddToBillingAdd(event)
  {
      if(event.target.checked)
      {
        this.checkoutFormGroup.controls.billingAddress.setValue
        (this.checkoutFormGroup.controls.shippingAddress.value);
      }
      else
      {
        this.checkoutFormGroup.controls.billingAddress.reset();
      }
  }
}
