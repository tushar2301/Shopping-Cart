import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  searchProduct(s: string){
    return this.http.get<any[]>("https://localhost:44348/api/Home/Search?query="+s);
  }
}
