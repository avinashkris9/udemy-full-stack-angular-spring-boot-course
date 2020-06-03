import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component'
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [ 
  
  {path: 'checkout', component:CheckoutComponent},
  {path : 'cart-details' , component: CartDetailsComponent},
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'category/:id', component : ProductListComponent},
  {path: 'products/:id', component:ProductDetailsComponent},
  { path: 'products', component: ProductListComponent },
  {path: 'category', component : ProductListComponent},
  {path: '', redirectTo: '/products' ,pathMatch: 'full'},
  {path: '**', redirectTo: '/products',pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
