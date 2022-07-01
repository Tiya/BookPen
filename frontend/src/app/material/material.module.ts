import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


const MaterialComponents =[
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule
]

@NgModule({
  imports: [ MaterialComponents ],
  exports: [MaterialComponents]
})
export class MaterialModule { }
