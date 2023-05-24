import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-anchor',
  template: '<ng-container #modalContainer></ng-container>',
})
export class ModalAnchorComponent implements OnInit {
  @ViewChild('modalContainer', { static: true, read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  
  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.registerContainerRef(this.viewContainerRef);
  }
}
