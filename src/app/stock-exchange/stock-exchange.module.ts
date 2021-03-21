import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockExchangeRoutingModule } from './stock-exchange-routing.module';
import {StockExchangeComponent} from './stock-exchange.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [StockExchangeComponent],
    imports: [
        CommonModule,
        StockExchangeRoutingModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class StockExchangeModule { }
