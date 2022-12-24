import { Component, OnInit, ɵNG_ELEMENT_ID } from '@angular/core';
import { Car, CarResponse } from 'src/app/data/models/cars';
import { Route, Router } from '@angular/router';
import { CarService } from 'src/app/data/service/cars.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cars:Car[]=[]
  fakeCars:Car[]=[]


  constructor( 
    private carService:CarService,
    private SpinnerService: NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe((car)=>(
      this.cars=car
      ))
            this.SpinnerService.show(); 

      setTimeout(() => {
            for (let car of this.cars) {
    if (car.trendingAdd===true) {
      this.fakeCars.push(car)
    }
  }
      this.SpinnerService.hide();

      }, 1000);

  
  }

  
    
  

  toCar(car:Car){
    this.router.navigate(["/product",car.id]);
  }



}
