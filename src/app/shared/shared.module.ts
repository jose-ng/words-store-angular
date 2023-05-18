import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { ListItemsComponent } from './components/list-items/list-items.component';

@NgModule({
  declarations: [SearchComponent, ListItemsComponent],
  imports: [CommonModule, FormsModule],
  exports: [SearchComponent, ListItemsComponent],
})
export class SharedModule {}
