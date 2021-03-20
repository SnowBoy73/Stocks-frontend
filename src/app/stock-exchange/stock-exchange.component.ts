import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    stockControl = new FormControl('');
    stock = 'dd';
    allStocks: string[] = [];
    unsubscribe$ = new Subject();
    constructor(private stockExchangeService: StockExchangeService) { }

    ngOnInit(): void {
         this.stockExchangeService.listenForStocks()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(newStockValue => {
                console.log('listen for stocks');
                this.allStocks.push(newStockValue);
            });

         this.stockExchangeService.getAllStocks()
            .pipe(
                take(1)
            )
            .subscribe(stocks => {
                console.log('get all');
                this.allStocks = stocks;
            });
       this.stockExchangeService.connect();
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.stockExchangeService.disconnect();
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
