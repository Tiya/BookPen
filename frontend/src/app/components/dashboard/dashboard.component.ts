import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookdataService } from 'src/app/services/bookdata.service';
import { BooksModel } from '../books/books.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: BooksModel[]=[];
  myPDF: Uint8Array | undefined;
  blob: Blob | undefined;
  thumbnail: any;
  bookImage:any;

  
  constructor(private viewportScroller: ViewportScroller, private route:ActivatedRoute,private sanitizer: DomSanitizer, private bookdataService: BookdataService, private router:Router,public _authservice:AuthService) { }

  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
    this.bookdataService.getBooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data));
      this.bookImage = this.books[0].bookImage.data;
       this.getPicture();
    })
  }

  singleBook(book:any)
  {
    localStorage.setItem("singleBookId", book._id.toString());
    this.router.navigate(['book']);
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
