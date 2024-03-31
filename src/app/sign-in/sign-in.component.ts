import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RequestsService } from '../service/requests.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  public hide = true;
  public isLoginMode = true;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{4,}$).*'),
    ])
  })

  constructor(
    private requestsService: RequestsService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.requestsService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response: any) => {
          console.log(response);
          const responseValue = JSON.stringify(response);
          localStorage.setItem('user', responseValue);
          this.router.navigate(['/office']);
        },
        error: (error) => {
          alert('Неверный логин или пароль');
        }
      });
    } else {
      alert('Вы не заполнили все поля');
    }
  }
}
