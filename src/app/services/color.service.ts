import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ColorService {
    shadeColor(color:string, percent:number) {

      let R = parseInt(color.substring(1,3),16);
      let G = parseInt(color.substring(3,5),16);
      let B = parseInt(color.substring(5,7),16);
  
      R = R * (100 + percent) / 100;
      G = G * (100 + percent) / 100;
      B = B * (100 + percent) / 100;
  
      R = (R<255)?R:255;  
      G = (G<255)?G:255;  
      B = (B<255)?B:255;  
  
      R = Math.round(R)
      G = Math.round(G)
      B = Math.round(B)
  
      let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
      let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
      let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
  
      return "#"+RR+GG+BB;
  }
  }

