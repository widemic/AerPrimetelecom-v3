import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SensorDataService } from './sensor-data.service'
import { HttpClientModule } from '@angular/common/http';
import { PanouComponent } from './panou/panou.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RegisterNodeComponent } from './register-node/register-node.component';


@NgModule({
  declarations: [
    AppComponent,
    PanouComponent,
    RegisterNodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    GaugesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LeafletModule,
  ],
  providers: [SensorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
