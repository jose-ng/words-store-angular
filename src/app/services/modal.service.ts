import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalAnchorComponent } from '../shared/components/dynamic/modal-anchor/modal-anchor.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Injectable()
export class ModalService {
  private modalContainerRef: ComponentRef<ModalAnchorComponent> | null = null;
  private viewContainerRef!: ViewContainerRef;

  registerContainerRef(vcRef: ViewContainerRef) {
    this.viewContainerRef = vcRef;
  }

  openModal() {
    if (!this.modalContainerRef) {
      this.modalContainerRef =
        this.viewContainerRef.createComponent(ModalAnchorComponent);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    }

    const component =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        ModalComponent
      );

    this.modalContainerRef?.instance.viewContainerRef.insert(
      component.hostView
    );
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalContainerRef.destroy();
      this.modalContainerRef = null;
    }
  }
}
