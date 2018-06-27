import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NetworkComponent } from '../app/components/network/network.component';
import { HeaderComponent } from '../app/components/shared/header/header.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'create-and-join', component: NetworkComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'smart-contract-manager', component: SmartContractManagerFileComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'search', component: SearchComponent }
]; 