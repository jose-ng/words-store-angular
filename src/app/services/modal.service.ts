import {
  Injectable,
  ComponentRef,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalOptions } from '../models/modal.model';
import ModalContentBaseComponent from '../models/modal.content.base';

@Injectable()
export class ModalService {
  private modalContentRef: ComponentRef<ModalContentBaseComponent> | null =
    null;
  private modalComponentRef: ComponentRef<ModalComponent> | null = null;
  private viewContainerRef!: ViewContainerRef;
  callback?: () => void;

  registerContainerRef(vcRef: ViewContainerRef) {
    this.viewContainerRef = vcRef;
  }

  openModal<T extends ModalContentBaseComponent>(component: Type<T>) {
    if (!this.modalContentRef) {
      this.modalContentRef = this.viewContainerRef.createComponent(component);
      document.body.appendChild(this.modalContentRef.location.nativeElement);
    }
  }

  openModalBasic(options?: ModalOptions | undefined) {
    if (!this.modalComponentRef) {
      this.modalComponentRef =
        this.viewContainerRef.createComponent(ModalComponent);
      document.body.appendChild(this.modalComponentRef.location.nativeElement);
      this.modalComponentRef.instance.title = (options as ModalOptions).title;
      this.modalComponentRef.instance.message = options?.message;
      this.modalComponentRef.instance.hasChildComponent = (
        options as ModalOptions
      ).hasChildComponent;
    }
  }

  closeModal() {
    if (this.modalContentRef) {
      this.modalContentRef.destroy();
      this.modalContentRef = null;
    }
    if (this.modalComponentRef) {
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
