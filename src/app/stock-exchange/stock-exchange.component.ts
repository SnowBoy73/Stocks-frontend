import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {subscriptionLogsToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    stock = new FormControl('');
    stocks: string[] = [];
    unsubscriber$ = new Subject();
    constructor(private stockExchangeService: StockExchangeService) { }

    ngOnInit(): void {
        this.stockExchangeService.listenForStocks()
            .pipe(
                takeUntil(this.unsubscriber$)
            )
            .subscribe(stock => {
                console.log('helloooo');
                this.stocks.push(stock);
            });
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
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
