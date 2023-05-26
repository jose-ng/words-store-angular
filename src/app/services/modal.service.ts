import {
  Injectable,
  ComponentRef,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { ModalAnchorComponent } from '../shared/components/dynamic/modal-anchor/modal-anchor.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalOptions } from '../models/modal.model';
import ModalContentBaseComponent from '../models/modal.content.base';

@Injectable()
export class ModalService {
  private modalContainerRef: ComponentRef<ModalContentBaseComponent> | null =
    null;
  private viewContainerRef!: ViewContainerRef;
  callback?: () => void;

  registerContainerRef(vcRef: ViewContainerRef) {
    this.viewContainerRef = vcRef;
  }

  openModal<T extends ModalContentBaseComponent>(component: Type<T>) {
    if (!this.modalContainerRef) {
      this.modalContainerRef = this.viewContainerRef.createComponent(component);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    }
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalContainerRef.destroy();
      this.modalContainerRef = null;
    }
  }
}
