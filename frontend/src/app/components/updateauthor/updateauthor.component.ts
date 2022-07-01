import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthordataService } from 'src/app/services/authordata.service';

@Component({
  selector: 'app-updateauthor',
  templateUrl: './updateauthor.component.html',
  styleUrls: ['./updateauthor.component.css']
})
export class UpdateauthorComponent implements OnInit {
  authorId:any
  image: any
  pdffile: any
  authorItem= {
    authorname:'',
    aboutauthor:'',
    authorImagePath:''    }
  constructor(private authordataservice:AuthordataService, private router:Router) { }

  ngOnInit(): void {
    let authorId = localStorage.getItem("editAuthorId");
    this.authordataservice.getAuthor(authorId).subscribe((data)=>{
    this.authorItem=JSON.parse(JSON.stringify(data));
  })}
  
  editAuthor()
  {    
    this.authordataservice.editAuthor(this.authorItem); 
    console.log(this.authorItem); 
    alert(this.authorItem.authorname+ " is updated successfully");
    this.router.navigate(['authors']);
  }
  
  onImageSelect(event: any){
    const image=event.target.files[0];
    this.image=image;
  }
}
