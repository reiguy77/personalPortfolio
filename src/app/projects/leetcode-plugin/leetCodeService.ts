
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';



@Injectable({
    providedIn: 'root'
  })
  export class LeetCodeService {

    async getLeetCodeData(username:string){
        let baseUrl = `${environment.server.protocol}://${environment.server.host}/api/leetCode`
       try{
         const resp = await fetch(baseUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
            },
                body: JSON.stringify({
                    username
                }),
            });
            console.log(username);
        const data = await resp.json();
        console.log(data);
        return data;
        }
    catch(e){
        console.log(e);
        return {};
    }

    }

  }