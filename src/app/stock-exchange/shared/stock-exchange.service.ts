import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {StockUpdateDTO} from './stock-update.dto';
import {StockDTO} from './stock.dto';

@Injectable({
    providedIn: 'root'
})
export class StockExchangeService {

    constructor(private socket: Socket) { }

    updateStock(stockId: string, updatedStock: string): any {
        const stockUpdateDto: StockUpdateDTO = {
            id: stockId,
            updatedStockValue: updatedStock
        };
        console.log('DTO = ', stockUpdateDto.id, stockUpdateDto.updatedStockValue);
        this.socket.emit('update', stockUpdateDto);
    }

    deleteStock(stockId: string, deletedStock: string): void  {
        this.socket.emit('delete', deletedStock);
    }

    listenForStockUpdates(): Observable<StockDTO> {
        return this.socket
            .fromEvent<StockDTO>('update');
    }

    listenForAllStocks(): Observable<StockDTO[]> {
        return this.socket
            .fromEvent<StockDTO[]>('getAllStocks');
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

}
