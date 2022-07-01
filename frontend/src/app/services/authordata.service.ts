import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthorModel } from '../components/authors/authors.model';

@Injectable({
  providedIn: 'root'
})
export class AuthordataService {

  constructor(private http:HttpClient) { }
   getAuthors(){
    //  return this.http.get("http://localhost:3000/authors");
    return this.http.get("api/authors");
   }
  //  newAuthor(item: AuthorModel){
    newAuthor(formData: FormData){
    // return this.http.post("http://localhost:3000/authors/insert",formData)
    return this.http.post("api/authors/insert",formData)
    .subscribe(data =>{console.log(data)})
  }


  getAuthor(id:any){
    // return this.http.get("http://localhost:3000/authors/"+id);
    return this.http.get("api/authors/"+id);
  }

  // delete a author
  deleteAuthor(id:any)
  {
console.log("id to delete", id);
    // return this.http.delete("http://localhost:3000/authors/remove/"+id)
    return this.http.delete("api/authors/remove/"+id)

  }
  //update a author
  editAuthor(author:any)
  {
    console.log('Author update')
    // return this.http.put("http://localhost:3000/authors/update",author)
    return this.http.put("api/authors/update",author)
    .subscribe(data =>{console.log(data)})
  }
}
