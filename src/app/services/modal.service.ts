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

  // openModal(component: any, options: ModalOptions) {
  //   // if (!this.modalContainerRef) {
  //   this.modalContainerRef =
  //     this.viewContainerRef.createComponent(ModalAnchorComponent);
  //   document.body.appendChild(this.modalContainerRef.location.nativeElement);
  //   // }

  //   const modalComponent =
  //     this.modalContainerRef.instance.viewContainerRef.createComponent(
  //       ModalComponent
  //     );

  //   modalComponent.instance.title = options.title;
  //   modalComponent.instance.type = options.type;

  //   this.modalContainerRef?.instance.viewContainerRef.insert(
  //     modalComponent.hostView
  //   );
  // }
  componentRef!: any;
  openModal(component: any, options: ModalOptions) {

    // if (!this.modalContainerRef) {
    this.modalContainerRef =
      this.viewContainerRef.createComponent(ModalAnchorComponent);
    document.body.appendChild(this.modalContainerRef.location.nativeElement);
    //  }

    // const modalComponent =
    //   this.viewContainerRef.createComponent(
    //     ModalComponent
    //   );

    const modalComponent: ComponentRef<ModalComponent> =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        ModalComponent
      );

    this.componentRef =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        component
      );

    modalComponent.instance.title = options.title;
    modalComponent.instance.type = options.type;
    modalComponent.instance.hola = "123" + Math.random();
    modalComponent.instance.reload();

    //this.viewContainerRef.insert(modalComponent.hostView);

    //this.viewContainerRef.insert(componentRef.hostView);

    // this.modalContainerRef?.instance.viewContainerRef.insert(
    //   modalComponent.hostView
    // );
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalContainerRef.destroy();
      this.modalContainerRef = null;
    }
  }
}
