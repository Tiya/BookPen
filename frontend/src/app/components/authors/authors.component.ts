import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthordataService } from 'src/app/services/authordata.service';
import { AuthorModel} from './authors.model'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  title:String = 'Author List';
  authors: AuthorModel[]=[];
  blob: Blob | undefined;

  thumbnail: any;
  authorimage:any;
   //image properties
 // imageWidth: number=50;
 // imageMargin: number=2;
  constructor(private authordataService: AuthordataService, private sanitizer: DomSanitizer, public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authordataService.getAuthors().subscribe((data)=>{
      this.authors=JSON.parse(JSON.stringify(data));
      this.authorimage = this.authors[0].authorimage.data;
      this.getPicture();

    })
  }

  onClick(author:any){
    localStorage.setItem("singleauthorId", author._id.toString());
    this.router.navigate(['author']);
    }
   

  getPicture() {
    let reader = new FileReader();
    reader.readAsDataURL(this.authorimage);
    reader.onloadend = (() => {
       let objectURL = reader.result;
       this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl('' + objectURL);
    });
  }
 
  getImageUrl(author: any) {
  console.log(author.authorimage.data);
    let objectURL = 'data:image/png;base64,' + author.authorimage.data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);

  } 

}
