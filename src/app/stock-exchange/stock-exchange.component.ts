import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    stockControl = new FormControl('');
    stock = 'dd';
    stocks: string[] = [];
    unsubscriber$ = new Subject();
    constructor(private stockExchangeService: StockExchangeService) { }

    ngOnInit(): void {
       this.stockExchangeService.listenForStocks()
            .pipe(
                takeUntil(this.unsubscriber$)
            )
            .subscribe(stock2 => {
                console.log('listen for stocks');
                this.stocks.push(stock2);
            });

       this.stockExchangeService.getAllStocks()
            .pipe(
                take(1)
            )
            .subscribe(stocks => {
                console.log('get all');
                this.stocks = stocks;
            });
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    increaseValue(): void {
        console.log('up', this.stockControl.value);
    }

    decreaseValue(): void  {
        console.log('down', this.stockControl.value);
    }

    updateStock(): void  {
        console.log('update', this.stockControl.value);
        this.stockExchangeService.updateStock(this.stockControl.value);
    }


    deleteStock(): void {
        console.log('delete', this.stockControl.value);
        this.stockExchangeService.deleteStock(this.stockControl.value);
    }
}
