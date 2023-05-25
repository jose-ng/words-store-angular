import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ModalContentBase from 'src/app/models/form.base';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent extends ModalContentBase {
  form!: FormGroup;
  submitted = false;
  sending = false;

  constructor(private formBuilder: FormBuilder) {
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
      this.sending = false;
      this.submitted = false;
    } else {
      this.form.markAllAsTouched();
    }
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
