import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalAnchorComponent } from '../shared/components/dynamic/modal-anchor/modal-anchor.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Injectable()
export class ModalService {
  private rootViewContainer!: ViewContainerRef;
  private modalContainerRef: ComponentRef<ModalAnchorComponent> | null = null;

  openModal(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
    if (!this.modalContainerRef) {
      this.modalContainerRef =
        this.rootViewContainer.createComponent(ModalAnchorComponent);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    }

    const component =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        ModalComponent
      );

    this.modalContainerRef.instance.viewContainerRef.insert(component.hostView);
  }

  removeDynamicComponent(component: any) {
    component.destroy();
  }

  closeModal() {
    // if (this.modalContainerRef) {
    //   this.modalContainerRef.destroy();
    //   this.modalContainerRef = null;
    // }
  }
}
