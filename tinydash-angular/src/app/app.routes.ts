import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables';
import { DataTableComponent } from './pages/tables/data-table/data-table';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { CustomerListComponent } from './pages/customers/customer-list';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ui/buttons', component: ButtonsComponent },
      { path: 'tables/basic', component: BasicTablesComponent },
      { path: 'tables/datatables', component: DataTableComponent },
      { path: 'customers', component: CustomerListComponent }
      // Other core pages would go here
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
