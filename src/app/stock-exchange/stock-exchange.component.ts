import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
//import {Stock} from './shared/stock.model';
import {StockDTO} from './shared/stock.dto';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    stockFC = new FormControl('');
    public stock: StockDTO;
    allStocks: StockDTO[] = [];
    unsubscribe$ = new Subject();
    stockSelected = ''; // NEW
    updatedStock: StockDTO;

    allStocks$: Subscription;

    constructor(private stockExchangeService: StockExchangeService) {}

    ngOnInit(): void {


       this.stockExchangeService.listenForStockUpdates()
            .pipe(
                take(1)
            )
            .subscribe(newStockValue => {
                console.log('listen for stock updates');
                this.stockExchangeService.listenForStockUpdates();
                const us = newStockValue;
                console.log('newStockValue = ', newStockValue);
                // NEW 29-3
                const index = this.allStocks.findIndex(s => s.name === newStockValue.name);
                console.log('newStockValue location = ', index);
                this.allStocks[index] = newStockValue;
                //
            });

       this.stockExchangeService.listenForNewStockValues()
            .pipe(
                take(1)
            )
            .subscribe(stocks => {
                console.log('get all');
                this.allStocks = stocks;
                console.log('allStocks Front =', stocks);
            });
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    increaseValue(): void {
        this.changeStockValue(1);
        console.log('up', this.stockFC.value);
    }

    decreaseValue(): void  {
        this.changeStockValue(-1);
        console.log('down', this.stockFC.value);
    }

    changeStockValue(increment): void {
        if (this.updatedStock) {
            this.updatedStock.currentPrice += increment;
            this.stockFC.patchValue(this.updatedStock.currentPrice);
        } else {
            console.log('error - no stock selected to change value of');
        }
    }

    updateStock(): void  {
        console.log('update', this.stockFC.value);
        this.stockExchangeService.updateStock(this.updatedStock.id, this.stockFC.value);
        this.stockFC.patchValue(this.updatedStock.currentPrice);
    }

    deleteStock(): void {
        console.log('delete', this.stockFC.value);
        this.stockExchangeService.deleteStock('5', this.stockFC.value);
        this.stockFC.patchValue(this.updatedStock.currentPrice);
    }

    onSelection(e, v): any {
        console.log(this.stockSelected = e.option.value);
        this.stockSelected = e.option.value;
    }

    onNgModelChange($event: any): void {
        const stockName = this.stockSelected[0].toString();
        this.updatedStock = this.allStocks.find(us => us.name === stockName);
        if (this.updatedStock)
        {
            console.log(this.updatedStock.name, this.updatedStock.description);
            this.stockFC.patchValue(this.updatedStock.currentPrice);
        } else {
            console.log('error - no stock with that name found');
        }
    }

}
