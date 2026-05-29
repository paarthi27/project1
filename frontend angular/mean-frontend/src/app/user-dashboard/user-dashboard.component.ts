import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {

constructor(private service:ServiceService,private router:Router,private cd:ChangeDetectorRef){}

loading=false;
showTable=false;

records:any=[];
user:any = JSON.parse(
    localStorage.getItem('user') || '{}'
  );


 viewRecords(){

  console.log("button clicked");

  this.loading = true;

  this.showTable = true;

  this.service.getRecords().subscribe({

    next:(data:any)=>{

      console.log(data);

      this.records = data;

      this.loading = false;

      this.cd.detectChanges();

    },

    error:(err)=>{

      console.log(err);

      this.loading = false;

    }

  });

}

  logout(){

  localStorage.clear();

    this.router.navigate(['/']);
 }





}
