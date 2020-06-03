import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  previousKeyWord: string = null;;
  searchMode: boolean = false;;
  temp: string = null;
  //pagination properties;
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,private cartService:CartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }


  /**
   * Call service based on mode
   *
   */
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }


  }
  handleSearchProducts() {

    const theKeyWord = this.route.snapshot.paramMap.get("keyword");
    console.log(` Previous keyword ${this.previousKeyWord} and new =${theKeyWord} new page number = ${this.thePageNumber}`);
    if (this.previousKeyWord != theKeyWord) {
      this.thePageNumber = 1;
    }
    this.previousKeyWord = theKeyWord;
    // this.temp=theKeyWord+this.thePageNumber;
    // console.log(`keyword =${theKeyWord} pageNumber=${this.thePageNumber} temp=${this.temp}`);
    // spring boot thePageNumber starts from zero!.
    this.productService.searchProductsByPaginate(theKeyWord,
      this.thePageNumber - 1, this.thePageSize
    )
      .subscribe(this.processResult());

  }

  /**
   * 
   */

  handleListProducts() {

    // check if id param is present,

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if (hasCategoryId) {
      // read id and assign to number. Use + to convert to string;
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
    }
    else {
      ///asign default categoryId as 1
      this.currentCategoryId = 1;
    }

  
    //https://dzone.com/articles/how-does-angular-2-change-detection-really-work-1
    // if any property in view changes it will recalculate component.
    // Check if we have a different categoryId.
    // if we have a different category id than previous
    // set thePageNumber back to 1.
    console.log(this.previousCategoryId + ` pagenumber =${this.thePageNumber} currentCategory= ${this.currentCategoryId}`);
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    // this.temp="log"+this.previousCategoryId;
    //get product for given category id'
    console.log(`currentCategoryId =${this.currentCategoryId} pageNumber=${this.thePageNumber}`);
    // this.productService.getProductList(this.currentCategoryId).subscribe
    //   (
    //     data => {
    //       this.products = data;
    //     }
    //   )

    // angular page size is 1 based.
    // spring boot page starts from zero!.
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }



  /**
   * Helper function to map the service output to data and pagination values.
   */
  processResult() {
    return data => {

      this.products = data._embedded.products;
      // increment 1 as spring boot pages are zero based.
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }


  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }


  /**
   *  Add product to cart. Invoked from Add to cart button
   *  
   */

   addProductToCart(product:Product)
   {
      console.log(` Checking out product  ${product.name}`);

      const theCartItem=new CartItem(product);
      this.cartService.addToCart(theCartItem);
   }
}
