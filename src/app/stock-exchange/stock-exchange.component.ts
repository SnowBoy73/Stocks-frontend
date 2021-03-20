import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit {
    stock = new FormControl('');
    stocks: string[] = [];
    constructor(private stockExchangeService: StockExchangeService) { }

    ngOnInit(): void {
        this.stockExchangeService.listenForStocks()
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
        this.stockExchangeService.updateStock(this.stock.value);
    }


    deleteStock(): void {
        console.log('delete', this.stock.value);
        this.stockExchangeService.deleteStock(this.stock.value);
    }
}
