import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthordataService } from 'src/app/services/authordata.service';
import {AuthorModel} from '../authors/authors.model';

@Component({
  selector: 'app-addauthors',
  templateUrl: './addauthors.component.html',
  styleUrls: ['./addauthors.component.css']
})
export class AddauthorsComponent implements OnInit {
  title:String="Add an Author";
  image: any
  constructor(private authorService:AuthordataService ,  private router: Router) { }
  authorItem= new AuthorModel(0,"","","","");
  ngOnInit(): void {
  }
  AddAuthor()
  {
    const formData = new FormData();
    formData.append('image', this.image)
    formData.append('authorname', this.authorItem.authorname)
    formData.append('aboutauthor', this.authorItem.aboutauthor)
  
   this.authorService.newAuthor(formData);
    console.log("called");
    alert("Author "+ this.authorItem.authorname+" is added Successfully");
    this.router.navigate(['/authors']);
  }
  onImageSelect(event: any){
    const image=event.target.files[0];
    this.image=image;
  }
}