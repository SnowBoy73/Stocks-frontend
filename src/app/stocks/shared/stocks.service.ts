import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class StocksService {

    constructor(private socket: Socket) { }

    updateStock(updatedStock: string): void {
        this.socket.emit('update', updatedStock);
    }

    deleteStock(deletedStock: string): void  {
        this.socket.emit('delete', deletedStock);
    }
    
}
