import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockExchangeComponent } from './stock-exchange.component';

const routes: Routes = [{ path: '', component: StockExchangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockExchangeRoutingModule { }
