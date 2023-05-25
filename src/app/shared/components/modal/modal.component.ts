import {
  ChangeDetectorRef,
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalType } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  @ViewChild('modal', { static: true, read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  ModalType = ModalType;
  @Input() title!: string;
  @Input() message!: string;
  @Input() type!: ModalType;
  @Input() confirmButton = false;

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {}

  reload() {
    this.cdr.detectChanges();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addComponent<T>(component: Type<T>) {
    this.viewContainerRef.createComponent(component);
  }
}
