
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';

const graphqlEndpoint = environment.graphqlEndpoint;


@Injectable({
    providedIn: 'root'
  })
  export class LeetCodeService {

    async getLeetCodeData(username:string){
    const query = `
        query getUserProfile($username: String!) {
        matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
            }
        }
        }
        `;

        const variables = {
        username: username,
        };

       try{
         const resp = await fetch("http://localhost:4200/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
            },
                body: JSON.stringify({
                query,
                variables,
                }),
            });
        const data = await resp.json();
        return data;
        }
    catch(e){
        console.log(e);
        return {};
    }

    }

  }