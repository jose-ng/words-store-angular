import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal-anchor',
  template: '<ng-container #modalContainer></ng-container>',
})
export class ModalAnchorComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
