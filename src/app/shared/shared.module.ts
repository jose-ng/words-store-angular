import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ModalComponent } from './components/modal/modal.component';
import { WordFormComponent } from './components/forms/word-form/word-form.component';
import { NoteFormComponent } from './components/forms/note-form/note-form.component';
import { ModalAnchorComponent } from './components/dynamic/modal-anchor/modal-anchor.component';
import { ModalService } from '../services/modal.service';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SearchComponent,
    ListItemsComponent,
    WordFormComponent,
    NoteFormComponent,
    LoginFormComponent,
    ModalAnchorComponent,
    ModalComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [
    SearchComponent,
    ListItemsComponent,
    WordFormComponent,
    NoteFormComponent,
    ModalAnchorComponent,
    ModalComponent,
    LoginFormComponent,
  ],
  providers: [ModalService],
})
export class SharedModule {}
