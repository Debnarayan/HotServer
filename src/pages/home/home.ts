import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {LocalService} from "../../providers/local-service/local-service";

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    name: 'Home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

    customerName:string = '';
    productBrand:string = ''
    productVolume:string = ''
    productQuantity:number = null;
    paidAmount:number = null;
    storeData:any = {};
    sellsRecord:any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
            private local: LocalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

  saveData(){
      this.storeData.customer_name = this.customerName;
      this.storeData.product_brand = this.productBrand;
      this.storeData.product_volume = this.productVolume;
      this.storeData.product_quantity = this.productQuantity;
      this.storeData.paid_amount = this.paidAmount;

      this.local.insertData(this.storeData);
  }

  showData(){
      this.local.selectData().then((entries)=>{
          this.sellsRecord = entries;

      })
  }

  clearData(){
      this.local.clearTableData();
  }

}
