import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  // Registers the user, has some minor validation. 
  register(): void {
    if(!this.registerForm.valid) {
      window.alert(`email address must contain '@', and password must be min 6 char.`)
    } else {
      this.store.dispatch(register(this.registerForm.value));
      window.alert("User registered successfully!")
      this.router.navigate(['/login']);
    }
  }
}