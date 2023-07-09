
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { environment } from '../../environments/environment';

const graphqlEndpoint = environment.graphqlEndpoint;


@Injectable({
    providedIn: 'root'
  })
  export class LeetCodeService {

getLeetCodeData(){
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
        username: "reillym",
        };

        console.log('pre-datA');
        fetch("http://localhost:4200/graphql", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
        },
            body: JSON.stringify({
            query,
            variables,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
        // Process the returned data
        console.log('DATA', data);
        })
        .catch((error) => {
        console.error(error);
        });

    }

  }