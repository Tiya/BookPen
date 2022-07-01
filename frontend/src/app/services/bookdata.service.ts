import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {BooksModel} from '../components/books/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookdataService {

  constructor(private http:HttpClient) { }
  getBook(id:any){
    // return this.http.get("http://localhost:3000/books/"+id);
    return this.http.get("api/books/"+id);
  }

   getBooks(){
    //  return this.http.get("http://localhost:3000/books");
    return this.http.get("api/books");
   }
    newBook(formData: FormData){
    // return this.http.post("http://localhost:3000/books/insert",formData)
    return this.http.post("api/books/insert",formData)
    .subscribe(data =>{console.log(data)})
  }
  // delete a book
  deleteBook(id:any)
  {
console.log("id to delete", id);
    // return this.http.delete("http://localhost:3000/books/remove/"+id)
    return this.http.delete("api/books/remove/"+id)

  }
  //update a book
  editBook(book:any)
  {
    console.log('book update')
    // return this.http.put("http://localhost:3000/books/update",book)
    return this.http.put("api/books/update",book)
    .subscribe(data =>{console.log(data)})
  }
}
