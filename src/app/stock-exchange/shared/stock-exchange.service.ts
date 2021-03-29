import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
// import {Stock} from './stock.model';
import {StockUpdateDTO} from './stock-update.dto';
import {StockDTO} from './stock.dto';

@Injectable({
    providedIn: 'root'
})
export class StockExchangeService {

    constructor(private socket: Socket) { }

    updateStock(stockId: string, updatedStock: string): any { // NEW
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

    listenForStockUpdates(): Observable<StockDTO> {
        console.log('STOCK UPDATE in service');
        const ss = this.socket
            .fromEvent<StockDTO>('update'); // ??  gets the current stock value (of selected company)
        if (!ss) {
            console.log('Ss = undefined');
        } else {
            console.log('Ss = DEFINED', ss);
        }
        return ss;
    }

    listenForNewStockValues(): Observable<StockDTO[]> {
        const stks =  this.socket
            .fromEvent<StockDTO[]>('newStockValues');
        console.log('stks = ', stks);
        return stks;
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

}
