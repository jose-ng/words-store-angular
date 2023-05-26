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
  private modalContainerRef: ComponentRef<ModalAnchorComponent> | null = null;
  private modalComponent: ComponentRef<ModalComponent> | null = null;
  private viewContainerRef!: ViewContainerRef;
  callback?: () => void;

  registerContainerRef(vcRef: ViewContainerRef) {
    this.viewContainerRef = vcRef;
  }

  openModal<T extends ModalContentBaseComponent>(
    component: Type<T>,
    options: ModalOptions,
    callback?: () => void
  ) {
    this.callback = callback;
    if (!this.modalContainerRef) {
      this.modalContainerRef =
        this.viewContainerRef.createComponent(ModalAnchorComponent);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    }

    this.modalComponent =
      this.modalContainerRef.instance.viewContainerRef.createComponent(
        ModalComponent
      );

    this.modalComponent.instance.addComponent(component, this.closeModal.bind(this));
    this.modalComponent.instance.title = options.title;
    this.modalComponent.instance.type = options.type;
    this.modalComponent.instance.confirmButton = options.confirmButton;
    this.modalComponent.changeDetectorRef.detectChanges();
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalComponent?.destroy();
      this.modalContainerRef.destroy();
      this.modalContainerRef = null;
      if (this.callback) this.callback();
    }
  }
}
