import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  products: Product[];
  product: Product;
  getProducts()
  {
    return this.http.get('http://localhost:3000/api/products');
  }

  addProduct(newProduct)
  {
    var headers = new HttpHeaders;
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/product',newProduct,{headers:headers});
    //.map(res=>res.json());
  }

  updateProduct(id,updatedProduct)
  {
    var headers = new HttpHeaders;
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/updateProduct/' + id,updatedProduct,{headers:headers});
  }


  deleteProduct(id)
  {
    return this.http.delete('http://localhost:3000/api/product/'+id);
  }

  findProduct(productId)
  {
    return this.http.get('http://localhost:3000/api/productId/'+productId);
  }
}
