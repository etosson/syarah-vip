import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/data/models/cars';
import { CarService } from 'src/app/data/service/cars.service';
import { Route, Router } from '@angular/router';
import { SearchValue, SearchValueResponse } from 'src/app/data/models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cars:Car[]=[]
  models:any[]=[]
  years:number[]=[]
  locations:string[]=[]
  makers:any[]=["Mercedes-Benz","Lamborghini","Bentley","Porsche","bmw","dodg","Rolls Royce"]

  searchValue:SearchValueResponse={
    maker:"",
    location:"",
    model:"",
    year: 0,
   
  }
  constructor(private carService:CarService, private router:Router) { }
  ngOnInit(): void {
 
  this.carService.getCars().subscribe((car)=>(
    this.cars=car
    ))
  }
  do(){
      for (const car of this.cars) {
        if (this.makers.includes(car.maker)==false) {
          this.makers.push(car.maker)
        }}
      }
      
  selectbrand(selectedbrand:string){
    this.models=[]
    this.years=[]
    this.locations=[]
    this.searchValue.maker=selectedbrand
    for (const car of this.cars) {
      if (this.searchValue.maker==car.maker) {

        if (this.models.includes(car.model) ===false){
          this.models.push(car.model)
          
        }
        if (this.locations.includes(car.location) ===false){
          this.locations.push(car.location)
        }
        if (this.years.includes(car.year) ===false){
          this.years.push(car.year)
        }}}
      }

  selectmodel(model:string){
  this.searchValue.model=model
}
selectyear(year:any){
  this.searchValue.year=year
}
selectlocation(location:string){
this.searchValue.location=location
// this.router.navigate(["/product"],{queryParams:this.searchValue});


}
  toproduct(){
this.router.navigate(["/product"], {queryParams:{maker:this.searchValue.maker,location:this.searchValue.location,model:this.searchValue.model,year:this.searchValue.year} });

    
  }

}
