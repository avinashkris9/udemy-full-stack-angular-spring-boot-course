import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../common/product';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 


  private baseUrl ="http://localhost:8080/api/products";
  private productCategoryUrl="http://localhost:8080/api/product-category";
  constructor(private httpClient:HttpClient) { 


  }

  
  /**
 * Search Products using the input keyword
 * 
 * @param theKeyWord - The string variable
 * @param Observable of List of products
 */
  searchProducts(theKeyWord: string):Observable<Product[]> {
  
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    
    return this.httpClient.get<GetResponseProducts>
    (searchUrl).pipe
    (
      
      tap(_ => console.log(`Fetching data for ${theKeyWord}`)),
        map(response => response._embedded.products), 
      
      catchError(this.handleError<Product[]>('searchProducts'))
      );
    
  }

 /**
 * Search Products using the input keyword and Page Size
 * 
 * @param theKeyWord - The string variable
 * @param Observable of List of products
 */
searchProductsByPaginate(theKeyWord: string,thePage:number,thePageSize:number):Observable<GetResponseProducts> {
  
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`+`&page=${thePage}&size=${thePageSize}`;
  
  return this.httpClient.get<GetResponseProducts>
  (searchUrl).pipe
  (
    
    tap(_ => console.log(`Fetching data for ${theKeyWord}`)),
   
    
    catchError(this.handleError<GetResponseProducts>('searchProducts'))
    );
  
}
/**
 * Fetch all product categories from api
 * @return Observable of List of product category
 */


  getProductCategories():Observable<ProductCategory[]>
  {
    return  this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl)
    .pipe
    (

      tap(_ => console.log("fetched data")),
      map(response => response._embedded.productCategory),
    catchError(this.handleError<ProductCategory[]>('getProducts'))

    );
    
  }

  
/**
 * Fetch all product based on category id from api
 * @param categoryId : category id integer
 * 
 * @return Observable of List of products
 */
  getProductList(categoryId:number):Observable<Product[]>
  {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe
    (
      tap(_ => console.log('fetched data')),
       map(response => response._embedded.products),
       catchError(this.handleError<Product[]>('getProducts'))
        
        );

  }


  /**
 * Fetch all product based on category id from api
 * @param thePage : Pagination page number
 * @param thePageSize : Number of elements per page
 * @return Observable of List of products
 */
getProductListPaginate(thePage:number,thePageSize:number,
      categoryId:number):Observable<GetResponseProducts>
{

  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
  +`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe
  (
    tap(_ => console.log('fetched data for '+searchUrl)),
    
     catchError(this.handleError<GetResponseProducts>('getProducts'))
      
      );

}


/**
 * Fetch all product based on category id from api
 * @param productId : product Id id integer
 * 
 * @return Observable of List of products
 */
  getProductById(productId:number):Observable<Product>
  {

    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl).pipe
    (
      tap(_ => console.log('fetched data')),
       map(response => response),
       catchError(this.handleError<Product>('getProducts'))
        
        );

  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
 
}



/**
 * Helper interfaces to parse json output.

 */
interface GetResponseProducts
{
  _embedded:
  {
    products  :Product[];
  }
  page: {
    size: number,
    totalElements:number,
    totalPages:number,
    number: number
    }
}

interface GetResponseProductCategory
{
  _embedded:
  {
    productCategory  :ProductCategory[];
  }
  page: {
    size: number,
    totalElements:number,
    totalPages:number,
    number: number
    }
}