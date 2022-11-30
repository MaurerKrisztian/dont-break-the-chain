import { Component, OnInit } from '@angular/core';
import {AuthEndpoints} from "../../services/login.endpoints";
import {Router} from "@angular/router";
export interface ILogin {
  email: string
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginTemplate = true
  constructor(private readonly authEndpoints:AuthEndpoints, private readonly router: Router) { }

  ngOnInit(): void {
  }

  async login(data: ILogin) {
    const response: { token: string } = await this.authEndpoints.login(data);
    if (response.token){
      localStorage.setItem('token', response.token);
      await this.router.navigate(['/habits']);
    }
  }

  register(data: {email: string, password: string; password2: string; username: string }) {
    return this.authEndpoints.register(data)
  }

  setTemplate(isLoginTemplate: boolean){
    this.isLoginTemplate = isLoginTemplate
  }
}
