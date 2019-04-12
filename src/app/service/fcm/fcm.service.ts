import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor( private fcm: FCM, 
               private localNotifications: LocalNotifications,
               private platform: Platform

               ) {
            }

  notificationSetup() {

    this.fcm.getToken()
    .then((token: string) => {
      console.log('este es mi token ', token);
    })
    .catch((err) => {
      console.log(err);
    });

    this.fcm.onTokenRefresh()
    .subscribe((token: string) => {
      console.log('Refresh de mi token ', token);
    }, (err) => {
      console.log(err);

    });

    this.fcm.onNotification()
    .subscribe((data) => {
//      console.log(data);

      if (data.wasTapped) {
        console.log('recivido en segundo plano ', data);

      } else {
        console.log('recivido en primer plano ', data);
         // Schedule a single notification
         this.localNotifications.schedule({
          // id: Math.floor((Math.random() * 100) + 1) ,
           title: data.title,
           text: data.body,
           icon: 'https://img.icons8.com/color/48/000000/mongrol.png',
           led: { color: '#FF00FF', on: 500, off: 500 },
         });
      }
    }, (err) => {
      console.log(err);
    });

    this.localNotifications.on('add')
    .subscribe((res) => {
      console.log(res);
    });

  }




}
