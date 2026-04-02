import { Injectable, signal } from '@angular/core';

export interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  status: 'Actif' | 'Inactif' | 'Prospect';
  lastContactDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersList: Customer[] = [
    { id: 1, name: 'Jean Dupont', company: 'TechSolutions', email: 'jean@tech.com', status: 'Actif', lastContactDate: '2024-03-15' },
    { id: 2, name: 'Alice Martin', company: 'DigitAll', email: 'alice@digit.fr', status: 'Prospect', lastContactDate: '2024-03-20' },
    { id: 3, name: 'Marc Leroy', company: 'InnoGroup', email: 'm.leroy@inno.be', status: 'Inactif', lastContactDate: '2023-12-10' },
    { id: 4, name: 'Sophie Bernard', company: 'NextGen', email: 'sophie@nextgen.com', status: 'Actif', lastContactDate: '2024-03-25' },
    { id: 5, name: 'Paul Klein', company: 'GlobalTrade', email: 'p.klein@global.de', status: 'Prospect', lastContactDate: '2024-03-28' },
    { id: 6, name: 'Lucie Petit', company: 'PetitCorp', email: 'lucie@petit.fr', status: 'Actif', lastContactDate: '2024-02-15' },
    { id: 7, name: 'Thomas More', company: 'Consulting Ltd', email: 'thomas@consult.com', status: 'Inactif', lastContactDate: '2023-11-22' },
    { id: 8, name: 'Emma Wilson', company: 'FutureApp', email: 'emma@future.io', status: 'Actif', lastContactDate: '2024-04-01' }
  ];

  public customers = signal<Customer[]>(this.customersList);

  addCustomer(customer: Omit<Customer, 'id'>) {
    const newCustomer = {
      ...customer,
      id: Math.max(...this.customersList.map(c => c.id)) + 1
    };
    this.customersList = [newCustomer, ...this.customersList];
    this.customers.set(this.customersList);
  }
}
