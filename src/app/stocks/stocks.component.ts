import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {StocksService} from './shared/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stock = new FormControl('');
  stocks: string[] = [];
  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.stocksService.listenForStocks()
        .subscribe(stock => {
          this.stocks.push(stock);
            });
  }

  increaseValue(): void {
    console.log('up', this.stock.value);
  }

  decreaseValue(): void  {
    console.log('down', this.stock.value);
  }

  updateStock(): void  {
    console.log('update', this.stock.value);
    this.stocksService.updateStock(this.stock.value);
  }


  deleteStock(): void {
    console.log('delete', this.stock.value);
    this.stocksService.deleteStock(this.stock.value);
  }
}
