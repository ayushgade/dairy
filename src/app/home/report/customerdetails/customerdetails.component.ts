import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { UpdateCustomerdetailsComponent } from '../update-customerdetails/update-customerdetails.component';
import { DeleteCustomerDialogComponent } from '../delete-customer-dialog/delete-customer-dialog.component';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent  implements OnInit{
  customers: any[] = [];
  dialog: any;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private customerService: CustomerService,private matDialog:MatDialog) {}

  displayedColumns: string[] = [
    'id',
    'customerName',
    'address',
     'bill',
     'checkDate',
     'contactNo',
  
  'delivered',
  'emailId',
  'idOfSociety',
  'milkType',
      'status',
      'timing',
   'quantity',
  'rate',
  'action'
  ];
  customerList:any;
  id:any;
  ngOnInit() {
   this.getAllustomers()
    
    this.deleteCustomer(this.id);
  }

 
 
  getAllustomers(){
    this.customerService.getAllCustomerData().subscribe((data: any)=> {
     this.customerList=data
     console.log("8888888888888888",this.customerList);
     this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteCustomer(id:any){
    this.customerService.deleteCustomerById(id).subscribe(data=>{   
    console.log("deleted",id)
    })

  }


  openEditDialog(customer: any): void {
    const dialogRef = this.matDialog.open(UpdateCustomerdetailsComponent, {
      width: '100%', // Adjust the width as per your design
      data: { customer: customer }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // The form was successfully submitted, you can update your table or perform other actions
        console.log('Dialog closed with result:', result);
        // Update your table or perform other actions
      } else {
        // The user closed the dialog without submitting the form
        console.log('Dialog closed without changes');
      }
    });
  }


  openConfirmationDialog(customerId: number): void {
    const dialogRef = this.matDialog.open(DeleteCustomerDialogComponent, {
      width: '300px', // Adjust the width as per your design
      data: { message: 'Are you sure you want to delete this customer?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked 'Yes,' proceed with deletion
        this.deleteCustomer(customerId);
      } else {
        // User clicked 'Cancel,' do nothing
      }
    });
  }

}

