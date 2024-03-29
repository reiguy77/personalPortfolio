import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.less']
})
export class ResumeComponent {
constructor(private sanitizer: DomSanitizer) { }
pdfUrl: SafeResourceUrl | undefined;
ngOnInit() {
  const pdfPath = 'assets/pdfs/Reilly_McLaren_Resume.pdf#navpanes=0';
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
}
  
}
