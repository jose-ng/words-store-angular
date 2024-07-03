import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ModalContentBase from '@models/modal.content.base';
import { ModalType } from '@models/modal.model';
import { CreateNoteDTO } from '@models/note.model';
import { ModalService } from '@services/modal.service';
import { NoteService } from '@services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent extends ModalContentBase {
  form!: FormGroup;
  submitted = false;
  sending = false;
  modalType = ModalType.Note;
  modalTitle = 'Add Note';
  confirmButton = true;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private modalService: ModalService
  ) {
    super();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      text: ['', [Validators.required]],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.valid) {
      this.sending = true;
      const product: CreateNoteDTO = this.form.value;
      this.noteService.create(product).subscribe(
        () => {
          this.sending = false;
          this.submitted = false;
          // Reload list
          this.modalService.dataReceived.next();
          this.cancel();
        },
        (err) => {
          console.log(err);
          this.sending = false;
          this.submitted = false;
        }
      );

      this.sending = false;
      this.submitted = false;
      this.modalService.dataReceived.next();
      this.cancel();
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    super.closeModal(this.modalService);
  }

  get title() {
    return this.form.get('title');
  }

  get text() {
    return this.form.get('text');
  }
}
