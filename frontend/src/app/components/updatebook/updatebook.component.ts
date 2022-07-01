import { Component, OnInit } from '@angular/core';
import { BookdataService } from 'src/app/services/bookdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  image: any
  pdffile: any
  bookItem= {
    bookName:'',
    bookAuthor:'',
    bookCategory:'',
    bookDescription:'',
    bookImagePath:'',
    bookFilePath:''
    }

  constructor( private bookdataService: BookdataService, private router:Router) { }

  ngOnInit(): void {

    let bookId = localStorage.getItem("editBookId");
    this.bookdataService.getBook(bookId).subscribe((data)=>{
    this.bookItem=JSON.parse(JSON.stringify(data));
  })

  }
  editBook()
  {    
    // const formData = new FormData();
    // formData.append('file', this.pdffile)
    // formData.append('image', this.image)
    // formData.append('bookName', this.bookItem.bookName)
    // formData.append('bookAuthor', this.bookItem.bookAuthor)
    // formData.append('bookCategory', this.bookItem.bookCategory)
    // formData.append('bookDescription', this.bookItem.bookDescription)
    this.bookdataService.editBook(this.bookItem); 
    console.log(this.bookItem); 
    alert(this.bookItem.bookName+" is updated successfully");
    this.router.navigate(['books']);
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
