import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { NetworkComponent } from './network.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonService } from '../../service/common-service';
import { GrowlModule } from "primeng/primeng";


@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TabViewModule,
    ReactiveFormsModule,
    TooltipModule,
    GrowlModule
  ],
  declarations: [NetworkComponent],
  exports: [NetworkComponent],
  providers: [CommonService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class networkModule { }
