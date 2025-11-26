import {Component, Inject, inject, OnInit} from '@angular/core';
import {Customer, CustomerService} from '../../../../services/customer.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-customer-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatIcon,
    NgIf,
    MatError,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent  implements OnInit {
  private customerService = inject(CustomerService);
  private dialogRef = inject(MatDialogRef<CustomerDialogComponent>);

  isEditMode = false;
  isLoading = false;
  dialogTitle = 'Create New Customer';

  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    salary: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    contact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { customer?: Customer }) {}

  ngOnInit() {
    if (this.data?.customer) {
      this.isEditMode = true;
      this.dialogTitle = 'Update Customer';
      this.customerForm.patchValue({
        name: this.data.customer.name,
        address: this.data.customer.address,
        salary: this.data.customer.salary,
        contact: this.data.customer.contact
      });
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.isLoading = true;
      const customerData: Customer = {
        name: this.customerForm.value.name!,
        address: this.customerForm.value.address!,
        salary: this.customerForm.value.salary!,
        contact: this.customerForm.value.contact!
      };

      if (this.isEditMode && this.data.customer?._id) {
        this.customerService.updateCustomer(this.data.customer._id, customerData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.dialogRef.close({ success: true, action: 'update' });
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Update failed:', error);
            alert('Failed to update customer. Please try again.');
          }
        });
      } else {
        this.customerService.createCustomer(customerData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.dialogRef.close({ success: true, action: 'create' });
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Create failed:', error);
            alert('Failed to create customer. Please try again.');
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
