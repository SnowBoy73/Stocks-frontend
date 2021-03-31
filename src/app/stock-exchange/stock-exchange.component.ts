import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
// import {Stock} from './shared/stock.model';
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

    constructor(private stockExchangeService: StockExchangeService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {

        this.stockExchangeService.listenForStockUpdates()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(newStockValue => {
                console.log('listen for stock updates');
                this.stockExchangeService.listenForStockUpdates();
                const index = this.allStocks.findIndex(s => s.name === newStockValue.name);
                this.allStocks[index] = newStockValue;
                this.cd.detectChanges();
            });

        this.stockExchangeService.listenForNewStockValues()
            .pipe(
                take(1)
            )
            .subscribe(stocks => {
                this.allStocks = stocks;
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

        console.log(this.stockSelected.length);
        if (this.stockSelected.length !== 0)
        {
         const stockName = this.stockSelected[0].toString();
         this.updatedStock = this.allStocks.find(us => us.name === stockName);
         if (this.updatedStock) {
                console.log(this.updatedStock.name, this.updatedStock.description);
                this.stockFC.patchValue(this.updatedStock.currentPrice);
            } else {
                console.log('error - no stock with that name found');
            }
        }
    }

}

