import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/app/core/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {

  private apiUrl = 'https://api.openai.com/v1';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' +  environment.openaiConfig.apiKey);
  
  constructor(private httpClient: HttpClient) {}

  generateChatCompletion(text: string) {
    return this.httpClient.post<{ result: { role: string; content: string } }>(
      this.apiUrl,
      { text_message: text },
      {headers: this.headers}
    );
  }
}
