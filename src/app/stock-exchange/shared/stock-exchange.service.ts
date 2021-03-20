import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockExchangeService {

    constructor(private socket: Socket) { }

    updateStock(updatedStock: string): void {
        this.socket.emit('update', updatedStock);
    }

    deleteStock(deletedStock: string): void  {
        this.socket.emit('delete', deletedStock);
    }

    listenForStocks(): Observable<string> {
        return this.socket
            .fromEvent<string>('stockValue'); // ??  gets the current stock value (of selected company)
    }

    getAllStocks(): Observable<string[]> {
        return this.socket
            .fromEvent<string[]>('allStocks');
    }
}
