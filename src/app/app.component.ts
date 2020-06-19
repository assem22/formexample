import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  userFrom: FormGroup;
  users: any;


  constructor(private formBuilder: FormBuilder, private service: UserService) {
    this.userFrom = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: [''],
      address1: [''],
      address2: [''],
      city: [''],
      province: [''],
      country: [''],
      postalCode: [''],
      email: ['', [Validators.required, Validators.pattern('"^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
    this.getUserList();

  }

  getUserList() {
    console.log(this.userFrom.getRawValue());
    this.service.get().subscribe(res => {
      this.users = res;
    });
  }
  createUser() {
    this.create();
    this.getUserList();
  }
  create() {
    console.log(this.userFrom.getRawValue());
    this.service.create(this.userFrom.getRawValue()).subscribe(res => {
      alert(res.name);
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(data => {
      this.getUserList();
    });
  }

  updateUser() {
    console.log('this.userFrom.getRawValue()');
    console.log(this.userFrom.getRawValue());
    this.service.update(this.userFrom.getRawValue()).subscribe(data =>
      console.log(data), error => console.log(error));
    this.getUserList();
  }
  update(user: any) {
    this.userFrom = this.formBuilder.group({
      id: [user.id],
      name: [user.name, [Validators.required, Validators.minLength(5)]],
      lastName: [user.lastName],
      address1: [user.address1],
      address2: [user.address2],
      city: [user.city],
      province: [user.province],
      country: [user.country],
      postalCode: [user.postalCode],
      email: [user.email, [Validators.required, Validators.pattern('"^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
}
