import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { ModalType } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  ModalType = ModalType;
  @Input() title!: string;
  @Input() message!: string;
  @Input() type!: ModalType;
  @Input() confirmButton = false;
  public hola = 'hoola';
  _reload = false;

  constructor(private modalService: ModalService,  private cdr: ChangeDetectorRef) {
    console.log('123', this.hola);
    //this.cdr.detectChanges();
  }
  public reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
    this.cdr.detectChanges();
}

  closeModal() {
    this.modalService.closeModal();
  }
}
