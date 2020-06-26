import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth/auth.service';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  createFormGroup()
  {
    return new FormGroup({
      email: new FormControl(''),
      usuario: new FormControl(''),
      password: new FormControl('')

    });
  }

  constructor(private auth: AuthService) { 

    this.registerForm = this.createFormGroup();

  }

  ngOnInit(): void {
  }

  onResetForm()
  {
    this.registerForm.reset();
  }

  onSaveForm()
  {
    console.log('Se han guardado los datos');
  }

}
