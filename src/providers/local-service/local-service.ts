import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/*
 Generated class for the LocalService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class LocalService {
    database: SQLiteObject;
    items:any;

    constructor(public http: Http, sqlite: SQLite) {
        console.log('Hello LocalService Provider');
        sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.database = db;
        }).catch(e => alert(JSON.stringify(e)));
    }


    insertData(obj) {
        console.log(obj);
        //data insert section
        var entry_datetime = Date.now().toString();
        console.log(entry_datetime);
        this.database.executeSql('INSERT INTO sells(customer_name,product_brand,product_volume,product_quantity,paid_amount,entry_datetime) VALUES(?,?,?,?,?,?)',
            [
                obj.customer_name,
                obj.product_brand,
                obj.product_volume,
                obj.product_quantity,
                obj.paid_amount,
                entry_datetime
            ])
            .then(() =>{
                console.log('Executed SQL');

            })
            .catch(e => console.log(e));
    }

    selectData() {
        this.database.executeSql('SELECT * FROM sells', {}).then((data) => {

            console.log(JSON.stringify(data));

//alert(data.rows.length);
//alert(data.rows.item(5).name);
            this.items = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
//alert(data.rows.item(i).name);
                    this.items.push({name: data.rows.item(i).customer_name,
                                    brand: data.rows.item(i).product_brand,
                                    size: data.rows.item(i).product_volume,
                                    quantity: data.rows.item(i).product_quantity,
                                    amount: data.rows.item(i).paid_amount,
                                    datetime: data.rows.item(i).entry_datetime});
                }
            }

        }).catch(e => alert(JSON.stringify(e)));
        console.log(this.items);
    }

    clearTableData(){
        this.database.executeSql('DELETE FROM sells', {})
            .then(()=>console.log('TABLE CLEARED'))
            .catch(e => console.log(e));
    }


}
