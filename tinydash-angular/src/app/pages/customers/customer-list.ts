import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer.service';
import { GenericDataTableComponent, TableHeader } from '../../components/generic-data-table/generic-data-table';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, GenericDataTableComponent, ReactiveFormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.scss']
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);

  // Clients Data (Signal from Service)
  public customers = this.customerService.customers;

  // Header Configuration
  public headers: TableHeader<Customer>[] = [
    { label: '#', key: 'id', sortable: true, class: 'd-none d-lg-table-cell' },
    { label: 'Client', key: 'name', sortable: true, filterable: true, class: 'd-table-cell' },
    { label: 'Entreprise', key: 'company', sortable: true, filterable: true, class: 'd-none d-sm-table-cell' },
    { label: 'LinkedIn/Email', key: 'email', filterable: true, class: 'd-none d-md-table-cell' },
    { label: 'Statut', key: 'status', sortable: true, filterable: true, class: 'd-table-cell' },
    { label: 'Dernier Contact', key: 'lastContactDate', sortable: true, class: 'd-none d-md-table-cell' },
    { label: 'Actions', key: 'actions', class: 'd-table-cell' }
  ];

  // Modal State
  public isModalOpen = signal(false);

  // Add Customer Form
  public customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    status: ['Prospect', Validators.required],
    lastContactDate: [new Date().toISOString().split('T')[0], Validators.required]
  });

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.customerForm.reset({
      status: 'Prospect',
      lastContactDate: new Date().toISOString().split('T')[0]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.getRawValue();
      const newCustomer: Omit<Customer, 'id'> = {
        name: formValue.name || '',
        company: formValue.company || '',
        email: formValue.email || '',
        status: (formValue.status as 'Actif' | 'Inactif' | 'Prospect') || 'Prospect',
        lastContactDate: formValue.lastContactDate || ''
      };
      this.customerService.addCustomer(newCustomer);
      this.closeModal();
    }
  }

  deleteCustomer(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      // Pour cet exemple, on ne fait rien car c'est une démo
      console.log('Delete customer', id);
    }
  }
}
