import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ModalContentBase from 'src/app/models/modal.content.base';
import { CreateNoteDTO } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent extends ModalContentBase {
  form!: FormGroup;
  submitted = false;
  sending = false;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    super();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      text: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.maxLength(45)]],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.valid) {
      this.sending = true;
      const product: CreateNoteDTO = this.form.value;
      this.noteService.create(product).subscribe((data) => {
        console.log(data);
      });

      this.sending = false;
      this.submitted = false;
      super.closeModal();
    } else {
      this.form.markAllAsTouched();
    }
  }

  get title() {
    return this.form.get('title');
  }

  get text() {
    return this.form.get('text');
  }

  get code() {
    return this.form.get('code');
  }
}
