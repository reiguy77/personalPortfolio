import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadObject(object:{}, name:string){
    // Convert JSON object to JSON string
    const jsonString = JSON.stringify(object, null, 2);

     // Create a Blob containing the JSON data
     const blob = new Blob([jsonString], { type: 'application/json' });

     // Generate a unique download URL for the Blob
     const url = URL.createObjectURL(blob);

     // Create a temporary <a> element to trigger the download
     const downloadLink = document.createElement('a');
     downloadLink.href = url;
     downloadLink.download = name;

     // Append the <a> element to the document and click it programmatically
     document.body.appendChild(downloadLink);
     downloadLink.click();

     // Clean up by removing the temporary <a> element and revoking the URL
     document.body.removeChild(downloadLink);
     URL.revokeObjectURL(url);
  }
}
