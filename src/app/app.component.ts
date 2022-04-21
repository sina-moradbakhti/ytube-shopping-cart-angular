import { Component, OnInit } from '@angular/core';
import { ShoppingCartItemModel } from './shared/models/shopping-cart-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';

  items: ShoppingCartItemModel[] = [];
  totalPrice: number = 0;

  onDeleteEvent($cartItemId: number) {
    const index = this.items.findIndex(item => item.id === $cartItemId);
    this.items.splice(index, 1);
  }

  onCountUpdatedEvent($event: ShoppingCartItemModel) {
    const index = this.items.findIndex(item => item.id === $event.id);
    this.items[index] = $event;
  }

  refresh() {
    let sumPrice: number = 0;
    this.items.forEach(item => {
      const price: number = item.price ?? 0;
      sumPrice += (price * (item.count ?? 0));
    });
    this.totalPrice = sumPrice;

    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  initCart() {
    this.items = [
      { id: 1, count: 1, image: 'assets/images/iphone-image.png', name: 'iPhone 13 pro 128GB', price: 999 },
      { id: 2, count: 2, image: 'assets/images/iphone-image.png', name: 'iPhone 13 pro 256GB', price: 1156 },
      { id: 3, count: 5, image: 'assets/images/iphone-image.png', name: 'iPhone 13 pro 512GB', price: 1399 }
    ];
    this.refresh();
  }

  ngOnInit(): void {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    var data = localStorage.getItem('cart');
    if (data) {
      this.items = JSON.parse(data);
      this.refresh();
    }
  }
}
