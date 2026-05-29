import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  loginform!:FormGroup;

constructor(
  private fb: FormBuilder,
  private service: ServiceService,
  private router: Router
) {}


ngOnInit():void{
this.loginform = this.fb.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required]],
  role: ['', Validators.required]
});
}

login() {

  if (this.loginform.invalid) {
    alert("Please fill all the fields");
    return;
  }

  this.service.auth(this.loginform.value).subscribe({

    next:(response:any)=>{

      localStorage.setItem(
        'user',
        JSON.stringify(response)
      );

      if(response.role == 'Admin'){

        this.router.navigate(['/admin']);

      }

      else{

        this.router.navigate(['/user']);

      }

    }

  });

}
}
