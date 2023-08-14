import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  baseUrl = `${environment.server.protocol}://${environment.server.host}/api/file`
  

  async deleteAllFiles(subfolder: string) {
    const resp = await fetch(this.baseUrl+'/clearSubfolder/', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
          body: JSON.stringify({
              subfolder
          }),
      });
    
      const data = await resp.json();
      console.log(data);
      return data;
  }

  async getFileNames(subfolder: string) {
    const resp = await fetch(this.baseUrl+'/fileNames/', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
          body: JSON.stringify({
              subfolder
          }),
      });
    
      const files = await resp.json();
      return files;
  }

  async getFile(id: string) {
    const resp = await fetch(this.baseUrl+'/retrieveFile/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
          body: JSON.stringify({
              id
          }),
      });
      if(resp.status != 200){
        return undefined;
      }
      const contentDispositionHeader = resp.headers.get('Content-Disposition');
      const fileNameMatch = contentDispositionHeader?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded_file.txt';

        // Get the file content as a Blob
      const fileBlob = await resp.blob();
      const file = new File([fileBlob], fileName, { type: fileBlob.type });
      return file;
  }

  async addFiles(subfolder:string, files:File[]){
    const formData = new FormData();
    formData.append('subfolder', subfolder);

    // Append each file to the formData with the key 'files[]'
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    const resp = await fetch(this.baseUrl, {
        method: "POST",
        body: formData
      });
    
      const data = await resp.json();
      return data;
  }

  
}