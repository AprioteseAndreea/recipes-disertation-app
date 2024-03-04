import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  constructor() {}

  async chat(message: string): Promise<string> {
    try {
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Something went wrong.';
    }
  }
}
