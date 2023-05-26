import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ModalContentBase from 'src/app/models/modal.content.base';
import { ModalType } from 'src/app/models/modal.model';
import { CreateWordDTO } from 'src/app/models/word.model';
import { ModalService } from 'src/app/services/modal.service';
import { WordService } from 'src/app/services/word.service';

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
      code: ['', [Validators.required, Validators.maxLength(45)]],
    });
  }

  save(e: MouseEvent) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.valid) {
      this.sending = true;

      const product: CreateWordDTO = this.form.value;
      this.wordService.create(product).subscribe((data) => {
        console.log(data);
      });

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

  get text_es() {
    return this.form.get('text_es');
  }

  get text_en() {
    return this.form.get('text_en');
  }

  get code() {
    return this.form.get('code');
  }
}
