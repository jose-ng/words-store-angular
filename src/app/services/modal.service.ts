import { Injectable, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ModalAnchorComponent } from '../shared/components/dynamic/modal-anchor/modal-anchor.component';

@Injectable()
export class ModalService {
  private modalContainerRef: ComponentRef<ModalAnchorComponent> | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  openModal(component: any) {
    if (!this.modalContainerRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalAnchorComponent);
            this.modalContainerRef = componentFactory.create(this.modalContainerRef!.instance.viewContainerRef.injector);
      document.body.appendChild(this.modalContainerRef.location.nativeElement);
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.modalContainerRef.injector);
    this.modalContainerRef.instance.viewContainerRef.insert(componentRef.hostView);
  }

  closeModal() {
    if (this.modalContainerRef) {
      this.modalContainerRef.destroy();
      this.modalContainerRef = null;
    }
  }
}
