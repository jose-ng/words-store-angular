import { Component, Input } from '@angular/core';
import { ModalType } from '@models/modal.model';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  ModalType = ModalType;
  @Input() title!: string;
  @Input() message?: string;
  @Input() type!: ModalType;
  @Input() hasChildComponent = true;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}
