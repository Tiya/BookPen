import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AddauthorsComponent } from './components/addauthors/addauthors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { GenresComponent } from './components/genres/genres.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { UpdateauthorComponent } from './components/updateauthor/updateauthor.component';
import { AuthGuard } from './auth.guard';
import { HasRoleGuard } from './has-role.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    AddbookComponent,
    BooksComponent,
    AuthorsComponent,
    AddauthorsComponent,
    UpdatebookComponent,
    GenresComponent,
    AuthorComponent,
    BookComponent,
    UpdateauthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuard,HasRoleGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
