import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ChartModule, GrowlModule, AccordionModule } from "primeng/primeng";
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { OrderByModule } from '../shared/OrderByPipe/OrderByModule';
import { DashboardComponent } from './dashboard.component';
import { HashBlockComponent } from './hash-block/hash-block.component';
import { TranscationBlockComponent } from './transcation-block/transcation-block.component';
import { InfoOverlayComponent } from './info-overlay/info-overlay.component';
import { ContractAbiDeploymentComponent } from './contract-abi-deployment/contract-abi-deployment.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { SearchKeywordPipe } from './dashboard-search-pipe';

// import { CommonServiceService } from "../../service/common-service.service";
// import { MessageService } from '../../service/message.service';
// import { StatisticsGraphComponent } from './statistics-graph/statistics-graph.component';


@NgModule({
  imports: [BrowserAnimationsModule, HttpModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, AccordionModule, InfiniteScrollModule, DialogModule, GrowlModule, ChartModule, Ng2OdometerModule, OrderByModule],
  declarations: [SearchKeywordPipe, DashboardComponent, HashBlockComponent, TranscationBlockComponent, InfoOverlayComponent, ContractAbiDeploymentComponent],
  exports: [DashboardComponent],
  //providers: [CommonServiceService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule { }
