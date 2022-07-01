import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookdataService } from 'src/app/services/bookdata.service';
import { BooksModel } from '../books/books.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  books: BooksModel[]=[];

  constructor(private bookdataService: BookdataService,private router:Router, public _auth:AuthService) { }

  ngOnInit(): void {
    this.bookdataService.getBooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data));
  }
    )
}

singleBook(book:any)
  {
    localStorage.setItem("singleBookId", book._id.toString());
    this.router.navigate(['book']);

  }

}