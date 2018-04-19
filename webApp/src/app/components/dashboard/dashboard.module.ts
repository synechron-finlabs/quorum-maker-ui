import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ChartModule, GrowlModule, AccordionModule } from "primeng/primeng";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { HashBlockComponent } from './hash-block/hash-block.component';
import { TranscationBlockComponent } from './transcation-block/transcation-block.component';

// import { CommonServiceService } from "../../service/common-service.service";
// import { MessageService } from '../../service/utility.service';
// import { StatisticsGraphComponent } from './statistics-graph/statistics-graph.component';


@NgModule({
  imports: [BrowserAnimationsModule, HttpModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, AccordionModule],
  declarations: [DashboardComponent, HashBlockComponent, TranscationBlockComponent],
  exports: [DashboardComponent],
  //providers: [CommonServiceService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule { }
