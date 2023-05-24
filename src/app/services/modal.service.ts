import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalAnchorComponent } from '../shared/components/dynamic/modal-anchor/modal-anchor.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalOptions } from '../models/modal.model';

@Injectable()
export class ModalService {
  private modalContainerRef: ComponentRef<ModalAnchorComponent> | null = null;
  private viewContainerRef!: ViewContainerRef;

  registerContainerRef(vcRef: ViewContainerRef) {
    this.viewContainerRef = vcRef;
  }

  openModal(options: ModalOptions) {
    // if (!this.modalContainerRef) {
      this.modalContainerRef =
        this.viewContainerRef.createComponent(ModalAnchorComponent);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    // }

    const modalComponent =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        ModalComponent
      );

    modalComponent.instance.title = options.title;
    modalComponent.instance.type = options.type;

    this.modalContainerRef?.instance.viewContainerRef.insert(
      modalComponent.hostView
    );
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalContainerRef.destroy();
    }
  }
}
