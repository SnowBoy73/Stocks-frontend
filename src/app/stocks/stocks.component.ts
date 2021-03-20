import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {StocksService} from './shared/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  value = new FormControl('');
  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
  }

  increaseValue(): void {
    console.log(this.value.value);
  }

  decreaseValue(): void  {

  }

  updateStock(): void  {
    console.log(this.value.value);
    this.stocksService.updateStock(this.value.value);
  }


  deleteStock(): void {
    console.log(this.value.value);
    this.stocksService.deleteStock(this.value.value);
  }
}
