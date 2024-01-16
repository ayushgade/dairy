import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
export class updateData{
  id: any;
  checkDate: any;
  delivered: any;
  milkType: any;
  quantity: any;
}
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = 'http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/addCostumer';

  private societyUrl = 'http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/getSocieties';


  constructor(private http: HttpClient,private datePipe: DatePipe) {}

  customer(userData: any): Observable<any> {
    return this.http.post(this.customerUrl, userData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }


  
  getActiveCustomers(societyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/active/${societyId}`).pipe(
      catchError(this.handleError)
    );
  }

  getInactiveCustomers(societyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/inactive/${societyId}`).pipe(
      catchError(this.handleError)
    );
  }

  getEveningCustomers(societyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/evening/${societyId}`).pipe(
      catchError(this.handleError)
    );
  }

  getMorningCustomers(societyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/morning/${societyId}`).pipe(
      catchError(this.handleError)
    );
  }




  getSocieties(): Observable<any> {
    return this.http.get(this.societyUrl).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // getCustomers(): Observable<any[]> {
  //   return this.http.get<any[]>(this.getCustomerurl);
  // }

   //get customer daily data by society id
   getDailycustomerbyid(societyId:any){
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/customersBySocietyId/${societyId}`)

   }

   getAllCustomerData(){
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/getCostumer`)
   }


   deleteCustomerById(id:any){
    return this.http.delete(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/deleteCustomer/${id}`)
   }


   updateCustomerDetails(id: any, customer: any) {
    return this.http.put(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/update/${id}`, customer)
      .pipe(
        catchError(error => {
          console.error('Error updating customer details:', error);
          return throwError(error);
        })
      );
  }

  //  updateCustomerDetails(id : any, customer: any){
  //   return this.http.put(`http://localhost:8081/api/update/${id}`, customer);
  //  }


   // add list of data to daily customer table 
   saveDataList(dataList: any) {
    return this.http.post(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/dailyCustomers/addListOfDailyCustomer`,  dataList );
  }
   getDailyCustomerDataFromCustomerTable(){
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/dailyCustomers/addCustomerToDailyCustomer`)
   }


   updateDailyCustomer(id:any,customer:any){
    return this.http.put(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/dailyCustomers/${id}`,customer);
   }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  updateDilyCustomerByDateId(data:any){
   const id=data.id;
   const checkDate=data.date;
   const delivered=data.delivered;
   const milkType=data.milkType;
   const quantity=data.quantity;
   const status=data.status;
   const timing=data.timing;
    console.log(data,"ccccccccccccc");
    return this.http.put("http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/dailyCustomers/updateData",data)

  }

  historyofcustomer(customerId:any){
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/dailyCustomers/historyOfCustomer/${customerId}`);
  }



  // Billing 

  // getBills(id: number, startDate: string, endDate: string): Observable<any> {
  //   const url = `${this.baseUrl}/getBills/${id}?startDate=${startDate}&endDate=${endDate}`;
  //   return this.http.get(url);
  // }

  // getTotalBill(id: number, startDate: string, endDate: string): Observable<any> {\
  //   const url = `${this.baseUrl}/getTotalBill/${id}?startDate=${startDate}&endDate=${endDate}`;
  //   return this.http.get(url);
  // }
}
