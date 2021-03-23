import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {Stock} from './shared/stock.model';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    stockFC = new FormControl('');
    stock: Stock;
    allStocks: Stock[] = [];
    unsubscribe$ = new Subject();

    stockSelected = ''; // NEW
    private selectedOptions: any;



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
         //this.stockExchangeService.connect();
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        //this.stockExchangeService.disconnect();
    }

    increaseValue(): void {
        console.log('up', this.stockFC.value);
    }

    decreaseValue(): void  {
        console.log('down', this.stockFC.value);
    }

    updateStock(): void  {
        console.log('update', this.stockFC.value);
        this.stockExchangeService.updateStock('5', this.stockFC.value);
    }


    deleteStock(): void {
        console.log('delete', this.stockFC.value);
        this.stockExchangeService.deleteStock('5', this.stockFC.value);
    }



    onSelection(e, v): any {
        console.log(this.stockSelected = e.option.value);
        this.stockSelected = e.option.value;
    }

    onNgModelChange($event: any): void {
        console.log('onNgModelChange');
        console.log(this.stockSelected);


    }
/*
    onAreaListControlChanged(stocks: any): void {
        this.stockSelected = stocks.stockSelected.selected.map(item => item.value);
        console.log('onAreaListControlChanged');
        console.log(this.stockSelected.valueOf());
    }

 */
}
