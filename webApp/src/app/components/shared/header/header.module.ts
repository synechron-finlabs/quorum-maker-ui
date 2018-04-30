import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MessageService } from '../../../service/message.service';
import { TooltipModule } from 'primeng/tooltip';
import { GrowlModule } from "primeng/primeng";

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule, GrowlModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    providers: [MessageService]
})

export class HeaderModule { }
