import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-modal-base',
  template:''
})
export default class ModalContentBaseComponent {
  @Input() closeModal!: () => void;
}
