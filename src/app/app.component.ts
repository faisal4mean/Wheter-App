import { error } from '@angular/compiler/src/util';
import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private appService: AppService) { }

  Wether: any[] = []
  date: string = new Date().toDateString();
  time = new Date().getTime();
  @ViewChild('cityName') city!: ElementRef;
  checkDay!: number;
  isCloudy!: number;
  _subscription!: Subscription;
  _cityName!: any;
  isDataCome = false;
  isLoading = false;
  erroMsg = 'Search Your City!';


  ngOnInit() {
  }



  getDay(no: any) {
    if (no === 1) {
      return 'Day';
    } if (no === 0) {
      return 'Night'
    } else {
      return
    }
  }
  getImage(no: any) {
    if (no === 0) {
      return '../assets/images/moon.png'
    }
    if (no === 1) {
      return '../assets/images/sun.png'
    }
    else {
      return;
    }
  }

  // handleError() {
  //   this.appService.handleError(Error).subscribe(res => {
  //       return res
  //   }, error => console.log(error))
  // }

  getWhether() {

    this.isLoading = true;
    setTimeout(() => {
      this._subscription = this.appService.getWhether(this.city.nativeElement.value)
        .subscribe(res => {
          this.isDataCome = true;
          let loc = res.location
          let data = res.current;
          this.checkDay = data.is_day;
          this.isCloudy = data.cloud;
          this._cityName = loc.name;

          this.Wether.push({
            name: loc.name,
            date: this.date,
            time: this.time,
            temp_c: data.temp_c,
            day: data.is_day,
            cloudy: data.cloud,
            condition: {
              whether: data.condition.text,
              icon: data.condition.icon
            },
            wind: {
              wind_dir: data.wind_dir,
              wind_kph: data.wind_kph,
              wind_mph: data.wind_mph
            }
          })
          this.isLoading = false;
          this.city.nativeElement.value = '';
          this.Wether.length >= 2 ? this.Wether.splice(0, 1) : this.Wether;

        }, error => {
          this.erroMsg = error.error.error.message
        })
    }, 1000)
  }
  ngOnDestroy() {
    this._subscription.unsubscribe()
    this.isDataCome = false;
  }

}


