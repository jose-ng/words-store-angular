import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-base',
  template: '',
})
export default class ModalContentBaseComponent {
  closeModal(modalService: ModalService) {
    modalService.closeModal();
  }
}
