import { Component, computed, input, signal, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

export interface TableHeader<T> {
  label: string;
  key: keyof T | string;
  sortable?: boolean;
  filterable?: boolean;
  class?: string; // New field for responsive utilities
}

export interface DataTableConfig {
  pageSize?: number;
  searchPlaceholder?: string;
}

@Component({
  selector: 'app-generic-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generic-data-table.html',
  styleUrls: ['./generic-data-table.scss']
})
export class GenericDataTableComponent<T extends Record<string, any>> {
  // Inputs (Signals API)
  data = input<T[]>([]);
  headers = input<TableHeader<T>[]>([]);
  config = input<DataTableConfig>({});

  // Content Projection for custom columns
  @ContentChild('rowTemplate') rowTemplate?: TemplateRef<any>;

  // Internal State (Signals)
  searchTerm = signal('');
  searchControl = new FormControl('', { nonNullable: true });
  
  currentPage = signal(1);
  pageSize = signal(10);
  
  sortKey = signal<keyof T | string | null>(null);
  sortDir = signal<'asc' | 'desc' | null>(null);

  // Column Filters
  columnFilters = signal<Record<string, string>>({});

  constructor() {
    // Sync search input with signal
    this.searchControl.valueChanges.subscribe(val => {
      this.searchTerm.set(val);
      this.currentPage.set(1);
    });
    
    // Default page size from config
    const initialPageSize = this.config().pageSize || 10;
    this.pageSize.set(initialPageSize);
  }

  // 1. Filtrage (Global + Par Colonne)
  filteredData = computed(() => {
    let source = this.data();
    const globalTerm = this.searchTerm().toLowerCase();
    const colFilters = this.columnFilters();

    // Filtre Global
    if (globalTerm) {
      source = source.filter(row => 
        Object.values(row).some(val => 
          val?.toString().toLowerCase().includes(globalTerm)
        )
      );
    }

    // Filtres de Colonne
    Object.keys(colFilters).forEach(key => {
      const term = colFilters[key].toLowerCase();
      if (term) {
        source = source.filter(row => 
          row[key]?.toString().toLowerCase().includes(term)
        );
      }
    });

    return source;
  });

  // 2. Tri
  sortedData = computed(() => {
    const data = [...this.filteredData()];
    const key = this.sortKey();
    const dir = this.sortDir();

    if (!key || !dir) return data;

    return data.sort((a, b) => {
      const valA = a[key as string];
      const valB = b[key as string];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      // Type-specific comparison
      const isNumeric = !isNaN(Number(valA)) && !isNaN(Number(valB));
      const res = isNumeric 
        ? Number(valA) - Number(valB)
        : valA.toString().localeCompare(valB.toString());

      return dir === 'asc' ? res : -res;
    });
  });

  // 3. Pagination
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  // Helpers pour le template
  totalItems = computed(() => this.filteredData().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  
  displayRange = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(this.currentPage() * this.pageSize(), this.totalItems());
    return { start, end, total: this.totalItems() };
  });

  // Actions
  toggleSort(key: keyof T | string): void {
    if (this.sortKey() === key) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  setPage(p: number): void {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  updateColumnFilter(key: string, event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.columnFilters.update(prev => ({ ...prev, [key]: term }));
    this.currentPage.set(1);
  }

  onPageSizeChange(event: Event): void {
    const val = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(val);
    this.currentPage.set(1);
  }
}
