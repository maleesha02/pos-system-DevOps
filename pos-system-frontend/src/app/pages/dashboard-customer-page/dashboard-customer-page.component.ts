import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Customer, CustomerService} from '../../services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CustomerDialogComponent} from './modal/customer-dialog/customer-dialog.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTooltip} from '@angular/material/tooltip';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-dashboard-customer-page',
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    CurrencyPipe,
    MatIconButton,
    MatTooltip,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatInput
  ],
  templateUrl: './dashboard-customer-page.component.html',
  styleUrl: './dashboard-customer-page.component.scss'
})
export class DashboardCustomerPageComponent  implements OnInit {
  private customerService = inject(CustomerService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'address', 'salary', 'contact', 'actions'];
  dataSource = new MatTableDataSource<Customer>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers() {
    this.isLoading = true;
    this.customerService.loadAllCustomers().subscribe({
      next: (response) => {
        this.dataSource.data = response.dataList || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load customers:', error);
        this.isLoading = false;
        alert('Failed to load customers. Please try again.');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadCustomers();
      }
    });
  }

  openEditDialog(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadCustomers();
      }
    });
  }

  deleteCustomer(customer: Customer) {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer._id!).subscribe({
        next: (response) => {
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Failed to delete customer:', error);
          alert('Failed to delete customer. Please try again.');
        }
      });
    }
  }
}
