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
    items: any;

    constructor(public http: Http, sqlite: SQLite) {
        console.log('Hello LocalService Provider');
        sqlite.create({
            name: "data.db",
            location: "default",
            createFromLocation: 1
        }).then((db: SQLiteObject) => {
            this.database = db;
            console.log(db);
            db.executeSql("CREATE TABLE IF NOT EXISTS sells (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name VARCHAR(50), product_brand VARCHAR(30), product_volume VARCHAR(10), product_quantity NUMBER(4), paid_amount NUMBER(15), entry_datetime DATE)", {}).then((data) => {
                // '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                // 'customer_name VARCHAR(50), ' +
                // 'product_brand VARCHAR(30), ' +
                // 'product_volume VARCHAR(10), ' +
                // 'product_quantity NUMBER(4), ' +
                // 'paid_amount NUMBER(15), ' +
                // 'entry_datetime DATE)', {}).then((data) => {
                console.log("TABLE CREATED: ", data);
            }).catch((error) => {
                console.error("Unable to execute sql", error);
            })
        }).catch((error) => {
            console.error("Unable to open database", error);
        });
        // sqlite.create({
        //     name: 'data.db',
        //     location: 'default'
        // }).then((db: SQLiteObject) => {
        //     this.database = db;
        // }).catch(e => alert(JSON.stringify(e)));
    }


    insertData(obj) {
        console.log(obj);
        //data insert section
        var entry_datetime = new Date().toDateString();
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
            .then(() => {
                console.log('Executed SQL');

            })
            .catch(e => console.log(e));
    }

    selectData() {
        this.database.executeSql('SELECT * FROM sells', []).then((data) => {

            console.log(JSON.stringify(data));

//alert(data.rows.length);
            alert(data.rows.length);
            this.items = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
//alert(data.rows.item(i).name);
                    this.items.push({
                        name: data.rows.item(i).customer_name,
                        brand: data.rows.item(i).product_brand,
                        size: data.rows.item(i).product_volume,
                        quantity: data.rows.item(i).product_quantity,
                        amount: data.rows.item(i).paid_amount,
                        datetime: data.rows.item(i).entry_datetime
                    });
                }
            }

        }).catch(e => alert(JSON.stringify(e)));
        return Promise.resolve(this.items);
    }

    clearTableData() {
        this.database.executeSql('DELETE FROM sells', [])
            .then(() => console.log('TABLE CLEARED'))
            .catch(e => console.log(e));
    }
    //
    // saveAsCsv() {
    //     var csv: any = this.convertToCSV(this.items);
    // }

    //            function ConvertToCSV(objArray) {
    //                console.log(objArray);
    //                var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    //                var str = '';
    // //                for (var i = 0; i < array.length; i++) {
    //                    var line = '';
    //                    for (var index in array[i]) {
    //                        if (line != '')
    //                            line += ','
    // //                        line += array[i][index];
    //                    }
    // //                    str += line + '\r\n';
    //                }
    // //                return str;
    //            }

}
