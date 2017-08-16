import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Home';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              sqlite: SQLite) {
    platform.ready().then(() => {
        sqlite.create({
            name: "data.db",
            location: "default",
            createFromLocation: 1
        }).then((db: SQLiteObject) => {
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

