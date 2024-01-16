import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesSericeService {

  constructor(private http: HttpClient) { }

  getSalesDataForSale(milkType:any){
    return  this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/cow/${milkType}`)
  }

  getSalesDataQuartely(milkType:any){
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/cow/quarterly/${milkType}`)
  }
 

  getSalesDataDaily(milkType: any) {
    return this.http.get(`http://dairyfarm-env.eba-amvxm32d.ap-south-1.elasticbeanstalk.com/api/cow/daily/${milkType}`);
  }

  
}
