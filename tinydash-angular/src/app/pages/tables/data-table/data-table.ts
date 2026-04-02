import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent, TableHeader } from '../../../components/generic-data-table/generic-data-table';

interface TableRow {
  id: number;
  name: string;
  phone: string;
  department: string;
  company: string;
  address: string;
  city: string;
  date: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, GenericDataTableComponent],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss']
})
export class DataTableComponent {
  // Headers definitions
  public userHeaders: TableHeader<TableRow>[] = [
    { label: '#', key: 'id', sortable: true },
    { label: 'Name', key: 'name', sortable: true, filterable: true },
    { label: 'Phone', key: 'phone', sortable: true, filterable: true },
    { label: 'Department', key: 'department', sortable: true, filterable: true },
    { label: 'Company', key: 'company', sortable: true, filterable: true },
    { label: 'Address', key: 'address' },
    { label: 'City', key: 'city', sortable: true, filterable: true },
    { label: 'Date', key: 'date', sortable: true },
    { label: 'Action', key: 'action' } // Propriété virtuelle pour l'action
  ];

  // Raw data
  public users = signal<TableRow[]>([
    { id: 368, name: 'Imani Lara', phone: '(478) 446-9234', department: 'Asset Management', company: 'Borland', address: '9022 Suspendisse Rd.', city: 'High Wycombe', date: 'Jun 8, 2019' },
    { id: 323, name: 'Walter Sawyer', phone: '(671) 969-1704', department: 'Tech Support', company: 'Macromedia', address: 'Ap #708-5152 Cursus. Ave', city: 'Bath', date: 'May 8, 2020' },
    { id: 371, name: 'Noelle Ray', phone: '(803) 792-2559', department: 'Human Resources', company: 'Sibelius', address: 'Ap #992-8933 Sagittis Street', city: 'Ivanteyevka', date: 'Apr 2, 2021' },
    { id: 302, name: 'Portia Nolan', phone: '(216) 946-1119', department: 'Payroll', company: 'Microsoft', address: 'Ap #461-4415 Enim Rd.', city: 'Kanpur Cantonment', date: 'Dec 4, 2019' },
    { id: 443, name: 'Scarlett Anderson', phone: '(486) 309-3564', department: 'Tech Support', company: 'Yahoo', address: 'P.O. Box 988, 7282 Lobortis Avenue', city: 'Lot', date: 'Dec 27, 2019' },
    { id: 345, name: 'Kevyn Mills', phone: '(976) 873-4833', department: 'Tech Support', company: 'Sibelius', address: 'P.O. Box 666, 9803 Sed Avenue', city: 'Fino Mornasco', date: 'Dec 24, 2020' },
    { id: 356, name: 'Sharon Buckley', phone: '(429) 517-6784', department: 'Tech Support', company: 'Sibelius', address: 'Ap #372-3407 Sed St.', city: 'Lompret', date: 'Mar 3, 2021' },
    { id: 263, name: 'Fletcher Everett', phone: '(735) 632-1255', department: 'Customer Service', company: 'Borland', address: 'Ap #688-5120 Egestas Avenue', city: 'Beerzel', date: 'Mar 27, 2020' },
    { id: 227, name: 'Bertha Ball', phone: '(656) 680-1553', department: 'Sales and Marketing', company: 'Finale', address: '951-3836 Ac Rd.', city: 'Cherbourg-Octeville', date: 'Feb 11, 2020' },
    { id: 396, name: 'Phoebe Cobb', phone: '(663) 233-0340', department: 'Human Resources', company: 'Adobe', address: '922 Enim. Avenue', city: 'Fahler', date: 'May 18, 2019' }
  ]);
}
