import { Component, OnInit } from '@angular/core';
import { BookdataService } from 'src/app/services/bookdata.service';
import { Router } from '@angular/router';
import {BooksModel} from '../books/books.model';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  title:String="Publish Your Book";
  image: any
  pdffile: any
  constructor(private bookdataService: BookdataService,  private router: Router) { }
  bookItem= new BooksModel(0,"","","","","","","");
  ngOnInit(): void {
  }
  AddBook()
  {
    const formData = new FormData();
    formData.append('file', this.pdffile)
    formData.append('image', this.image)
    formData.append('bookName', this.bookItem.bookName)
    formData.append('bookAuthor', this.bookItem.bookAuthor)
    formData.append('bookCategory', this.bookItem.bookCategory)
    formData.append('bookDescription', this.bookItem.bookDescription)
    
   // this.bookdataService.newBook(this.bookItem);
   this.bookdataService.newBook(formData);
  //  this.bookItem.bookImage=this.image.data;
  //  this.bookItem.bookFile=this.pdffile.data;
    console.log("called");
    alert(this.bookItem.bookName+" is added successfully");
    this.router.navigate(['/books']);
  }
  onFileSelect(event: any){
    const pdffile=event.target.files[0];
    this.pdffile=pdffile;
  }
  onImageSelect(event: any){
    const image=event.target.files[0];
    this.image=image;
  }
}
