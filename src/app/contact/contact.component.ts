import { Component } from '@angular/core';
import { ContactService } from './contactService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {

  constructor(private contactService:ContactService){
    
  }

  formData = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    // Perform email sending logic here
    console.log(this.formData); // Replace with actual email sending code
    this.contactService.sendContactForm(this.formData.message, this.formData.email, this.formData.name);
    // Reset form after submission
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
    
  }

}
