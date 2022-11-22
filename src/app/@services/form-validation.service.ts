import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  ValidateSelectInput(control:AbstractControl): {[key:string]: any} | null{


    if(control.value == 0)
      return { 

        SelectError: "الرجاء تحديد واحدة"
      }

    
    return null;
  }

  ValidatePhoneNumber(control:AbstractControl): {[key:string]: any} | null{


    let PhoneNumber = control.value.toString();
    console.log(PhoneNumber);

    if(PhoneNumber == ""){
      return {
        PhoneError: 'يجب الا يحتوى رقم الهاتف على فراغ'
      }
    }

    if(!(/^[0-9]+$/.test(PhoneNumber))){

        return {
          PhoneError: 'يجب الا يحتوى رقم الهاتف على حروف'
        }
    }


    if(PhoneNumber.length >= 3){
      let FirtNumbers = PhoneNumber[0] + PhoneNumber[1] + PhoneNumber[2];

      if(FirtNumbers != "092" && FirtNumbers != "091"){

        return {
          PhoneError: 'يجب ان تكون بداية رقم الهاتف 092 او 091'
        }
      }
      
      if(PhoneNumber.length != 10){

        return {
          PhoneError: 'طور رقم الهاتف غير صحيح'
        }
      }
  
    }


    return null;
  }
}
