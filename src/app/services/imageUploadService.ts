import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ImageUploadService {

    constructor (private http: HttpClient){

    }

    submitImage(file: any): Observable<any> {
        const fd = new FormData();
        if (file) {
          fd.append('image', file, file.name);
        }
        return this.http.post(`http://${environment.mongodb.host}:${environment.mongodb.port}/api/imageUpload`, fd);
      }
      // submitMultipleImages(file: any): Observable<any> {
      //   const fd = new FormData();
      //   if (file) {
      //     fd.append('image', file, file.name);
      //   }
      //   return this.http.post('http://localhost:8080/api/imageUpload/addMultiple', fd);
      // }
    
    getImages(imageIds: String[] ): Observable<any> {
        return this.http.post(`http://${environment.mongodb.host}:${environment.mongodb.port}/api/imageUpload/findImagesByIds`, imageIds);
    }
  }