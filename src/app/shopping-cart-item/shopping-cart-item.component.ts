import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingCartItemModel } from '../shared/models/shopping-cart-item.model';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() item?: ShoppingCartItemModel;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCountUpdated = new EventEmitter<ShoppingCartItemModel>();
  @Output() onRefresh = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    const currentCount: number = this.item?.count ?? 0;
    if (this.item != null) {
      this.item!.count = currentCount + 1;
    }

    this.onCountUpdated.emit(this.item);
    this.onRefresh.emit();
  }
  sub() {
    const currentCount: number = this.item?.count ?? 0;
    if (this.item != null) {
      this.item!.count = currentCount > 0 ? (currentCount - 1) : 0;
    }

    this.onCountUpdated.emit(this.item);
    this.onRefresh.emit();
  }

  del(itemId?: number) {
    this.onDelete.emit(itemId);
    this.onRefresh.emit();
  }

}
