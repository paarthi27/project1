import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit{

constructor(private service:ServiceService,private cd:ChangeDetectorRef,private router:Router){}
showTable =false;
showForm = false;
users:any=[];

loading= false;

newUser:any={
  userName:'',
  password:'',
  role:''
}


ngOnInit(): void {
    this.getdata();
}

getdata(){

  this.loading = true;

  this.showTable = true;

  this.service.getUser().subscribe({

    next:(data:any)=>{

      this.users = data;

      this.loading = false;
      this.cd.detectChanges();

    },

    error:()=>{

      this.loading = false;

    }

  });

}

 create(){

  console.log(this.newUser);

  this.service.createUser(this.newUser).subscribe({

    next:(res)=>{

      console.log(res);

      alert("User Added");

      this.getdata();

    },

    error:(err)=>{

      console.log(err);

    }

  });

}

 delete(id:number){

const result =confirm("do you want to delete?")

if(result){

  this.service.deleteUser(id).subscribe({
next:()=>{
  alert("deleted");
  this.getdata();
},
error:()=>{
  this.loading=false;
}

  }
)

}


 }

 logout(){

  localStorage.clear();

    this.router.navigate(['/']);
 }




}
