import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookdataService } from 'src/app/services/bookdata.service';
import { BooksModel } from '../books/books.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: BooksModel[]=[];
  myPDF: Uint8Array | undefined;
  blob: Blob | undefined;
  thumbnail: any;
  bookImage:any;
  bookItem= {
    bookName:'',
    bookAuthor:'',
    bookCategory:'',
    bookDescription:'',
    bookImagePath:'',
    bookFilePath:''
    }
  constructor(private sanitizer: DomSanitizer, private bookdataService: BookdataService, private router:Router,public _authservice:AuthService) { }

  ngOnInit(): void {

    let bookId = localStorage.getItem("singleBookId");
    this.bookdataService.getBook(bookId).subscribe((data)=>{
    this.bookItem=JSON.parse(JSON.stringify(data));
  console.log(this.bookItem)
     // this.bookImage = this.bookItem.bookImage.data;
       this.getPicture();

    })

  }
  _id :any
  deleteBook(book: any)
  {
    if(confirm("Are you sure to delete "+book.bookName+" ?")) {
    console.log(book._id);
    this.bookdataService.deleteBook(book._id)
      .subscribe((data) => {
        this.book = this.book.filter(p => p !== book);
      });
      alert(book.bookName+" is deleted successfully");
      this.router.navigate(['books']);
    }
  }
  editBook(book:any)
  {
    localStorage.setItem("editBookId", book._id.toString());
    this.router.navigate(['update']);

  }
  getPicture() {
    let reader = new FileReader();
    reader.readAsDataURL(this.bookImage);
    reader.onloadend = (() => {
       let objectURL = reader.result;
       this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl('' + objectURL);
    });
  }
 
  getImageUrl(book: any) {
 
  console.log(book.bookImage.data);
    let objectURL = 'data:image/png;base64,' + book.bookImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);

  } 
}
