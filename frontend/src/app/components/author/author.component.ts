import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthordataService } from 'src/app/services/authordata.service';
import { AuthorModel } from '../authors/authors.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  title:String = 'Author List';
  author: AuthorModel[]=[];
  blob: Blob | undefined;
  thumbnail: any;
  authorimage:any;
  authors= {
    authorname:'',
    aboutauthor:'',
    authorImagePath:''
    }
  constructor(private authordataService: AuthordataService, private sanitizer: DomSanitizer, public _auth:AuthService,private router:Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let authorId = localStorage.getItem("singleauthorId");;

    this.authordataService.getAuthor(authorId).subscribe((data)=>{
      this.authors=JSON.parse(JSON.stringify(data));
      // this.authorimage = this.authors[0].authorimage.data;
      this.getPicture();

    })
  }

  
  deleteAuthor(author: any)
  {
    if(confirm("Are you sure to delete "+author.authorname+" ?")) {
      console.log("Implement delete functionality here");
      console.log(author._id);
      this.authordataService.deleteAuthor(author._id)
        .subscribe((data) => {
          this.author = this.author.filter(p => p !== author);
        });
        alert(author.authorname+" is deleted successfully");
        this.router.navigate(['authors']);
    }

   
   
    
    }
  editAuthor(author:any)
  {
    localStorage.setItem("editAuthorId", author._id.toString());
    this.router.navigate(['updateauthor']);

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