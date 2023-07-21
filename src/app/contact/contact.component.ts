import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {

  formData = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    // Perform email sending logic here
    console.log(this.formData); // Replace with actual email sending code
    // Reset form after submission
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }

}
