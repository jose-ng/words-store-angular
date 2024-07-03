import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ModalContentBase from '@models/modal.content.base';
import { ModalType } from '@models/modal.model';
import { CreateWordDTO } from '@models/word.model';
import { ModalService } from '@services/modal.service';
import { WordService } from '@services/word.service';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent extends ModalContentBase {
  form!: FormGroup;
  submitted = false;
  sending = false;
  modalType = ModalType.Word;
  modalTitle = 'Add Word';
  confirmButton = true;

  constructor(
    private formBuilder: FormBuilder,
    private wordService: WordService,
    private modalService: ModalService
  ) {
    super();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      text_en: ['', [Validators.required, Validators.maxLength(45)]],
      text_es: ['', [Validators.required, Validators.maxLength(45)]],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.valid) {
      this.sending = true;

      const product: CreateWordDTO = this.form.value;
      this.wordService.create(product).subscribe(
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
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    super.closeModal(this.modalService);
  }

  get text_es() {
    return this.form.get('text_es');
  }

  get text_en() {
    return this.form.get('text_en');
  }
}
