import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent {
  form!: FormGroup;
  submitted = false;
  sending = false;

  constructor(private formBuilder: FormBuilder) {
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
      this.sending = false;
      this.submitted = false;
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
