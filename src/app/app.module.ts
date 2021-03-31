import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

// NEW
@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: {} });
  }
}

@Injectable()
export class SocketStocks extends Socket {
  constructor() {
    super({ url: 'http://localhost:3001', options: {} });
  }
}
//

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


