import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import axios from 'axios';
import { AccountService } from '../../auth/services/account.service';
@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  baseInstructions = 'You specialize in recipes, nutrition, diets and healthy eating. You will only answer questions related to this subject and nothing else. You will recommend healthy, low-calorie recipes, recipe ideas and combinations or other information in this field. If the user asks you something different from your specialization you will not answer these questions and will inform them that you specialize in other areas such as nutrition. I will also give you my nutritional profile in order to recommend recipe and food ideas as personalized as possible.'
  userInstructions: string;

  constructor(public accountService: AccountService) {
    const firstName = this.accountService.loggedUserValue.firstName;
    const cookingLevel = this.accountService.loggedUserValue.cookingLevel;
    const physicalEffortLevel = this.accountService.loggedUserValue.physicalEffort;
    const dietsFollowed = this.accountService.loggedUserValue.userDiets.map(diet => diet.name).join(', ');
    const cuisinesLiked = this.accountService.loggedUserValue.userCuisines.map(cuisine => cuisine.name).join(', ');
    const dislikedIngredients = this.accountService.loggedUserValue.userDislikedIngredients.map(ingredient => ingredient.name).join(', ');
  
    this.userInstructions = `My name is ${firstName}. I have this level of cooking skills: ${cookingLevel}. I engage in this level of physical activity: ${physicalEffortLevel}. 
      I follow the following diets: ${dietsFollowed}. 
      I enjoy cooking cuisines like: ${cuisinesLiked}.
      I dislike these ingredients: ${dislikedIngredients}.`;
  }

  // Pasul 1 - creare de assistant dar am facut-o deja
  // Pasul 2 - crearea unui thread
  async createThread() {
    try {
      const apiUrl = 'https://api.openai.com/v1/threads';
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );

      return response.data.id;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw 'Something went wrong.';
    }
  }
  //Pasul 3 - adaugarea mesajului in thread-ul deschis
  async addMessagesToThread(message: string, threadId: string) {
    try {
      const apiUrl = `https://api.openai.com/v1/threads/${threadId}/messages`;
      const response = await axios.post(
        apiUrl,
        {
          role: 'user',
          content: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );
      return true;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Something went wrong.';
    }
  }

// Pasul 4 - rularea asistentului
  async runThread(threadId: string): Promise<string> {

    try {
      const apiUrl = `https://api.openai.com/v1/threads/${threadId}/runs`;
      const response = await axios.post(
        apiUrl,
        {
          assistant_id: 'asst_Fz3BvfwByp5MiN2fP0fvHYwl',
          instructions: this.baseInstructions + this.userInstructions,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Something went wrong.';
    }
  }

  async checkRunStatus(threadId: string, runId: string): Promise<boolean> {
    try {
      const apiUrl = `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      });

      const run = response.data
      if (run) {
        const activeRun = run.status === 'completed';
        return !activeRun;
      }

      return false;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return true; // În cazul unei erori, presupunem că există un run activ
    }
  }

  async waitForRunToFinish(threadId: string, runId: string): Promise<void> {
    let activeRun = true;
    while (activeRun) {
      activeRun = await this.checkRunStatus(threadId, runId);
      if (activeRun) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Așteaptă 2 secunde înainte de a verifica din nou
      }
    }
  }

  async listMessages(threadId: string): Promise<any> {
    try {
      const apiUrl = `https://api.openai.com/v1/threads/${threadId}/messages`;
      const response = await axios.get(
        apiUrl,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment.openaiConfig.apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Something went wrong.';
    }
  }
}
