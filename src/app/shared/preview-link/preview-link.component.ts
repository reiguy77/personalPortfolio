

    import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

    import { DomSanitizer } from '@angular/platform-browser';
    @Component({
  selector: 'preview-link',
  templateUrl: './preview-link.component.html',
  styleUrls: ['./preview-link.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PreviewLinkComponent {
    @Input() link:string = '';
    @Input() text:string = '';
    hideLink = () => {
       let element =  document.getElementById("linkView");
       if(element != null){
        element.style.display = "none";
       }
       console.log('bye');
    }
    showLink = ()=> {
        let element =  document.getElementById("linkView");
        if(element != null){
        element.style.display = "block";
       }

       console.log('yo ');
    }

}