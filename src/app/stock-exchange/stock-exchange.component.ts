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
    public stock: Stock;
    allStocks: Stock[] = [];
    unsubscribe$ = new Subject();

    stockSelected = ''; // NEW
    updatedStock: Stock;


    constructor(private stockExchangeService: StockExchangeService) {
        this.updatedStock = {
            id: '',
            name: '',
            description: '',
            currentPrice: 0,
            startPrice: 0,
        };

    }

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
            console.log(this.updatedStock.name, this.updatedStock.description);
        } else {
            console.log('error - no stock selected to change value of');
        }
    }

    updateStock(): void  {
        console.log('update', this.stockFC.value);
        console.log('allStocks comp-updateStock(1)=', this.allStocks.length);

        this.stockExchangeService.updateStock(this.updatedStock.id, this.stockFC.value);

        this.stockFC.patchValue(this.updatedStock.currentPrice);

        console.log('allStocks comp-updateStock(2)=', this.allStocks.length);

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
        console.log('onNgModelChange');
        console.log(this.stockSelected);
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
/*
    onAreaListControlChanged(stocks: any): void {
        this.stockSelected = stocks.stockSelected.selected.map(item => item.value);
        console.log('onAreaListControlChanged');
        console.log(this.stockSelected.valueOf());
    }

 */
}
