import { Component, Input } from '@angular/core';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent {
  @Input() listItems!: Word[];
  @Input() totalItems = 0;
  @Input() totalShowedItems = 0;
}
