import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Stock} from './stock.model';
import {StockUpdateDTO} from './stock-update.dto';

@Injectable({
    providedIn: 'root'
})
export class StockExchangeService {

    constructor(private socket: Socket) { }

    updateStock(stockId: string, updatedStock: string): void { // NEW
        const stockUpdateDto: StockUpdateDTO = {
            id: stockId,
            updatedStockValue: updatedStock
        };
        console.log('DTO = ', stockUpdateDto.id, stockUpdateDto.updatedStockValue);

        this.socket.emit('update', stockUpdateDto);
    }

    deleteStock(stockId: string, deletedStock: string): void  { // NEW
        this.socket.emit('delete', deletedStock);
    }

    listenForStocks(): Observable<Stock> {
        return this.socket
            .fromEvent<Stock>('stockValue'); // ??  gets the current stock value (of selected company)
    }

    getAllStocks(): Observable<Stock[]> {
        return this.socket
            .fromEvent<Stock[]>('allStocks');
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

}
