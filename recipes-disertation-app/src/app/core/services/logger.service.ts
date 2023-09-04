import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  error(message: string) {
    // ideally, this should make a post to server to store log for debugging later on
    if (environment.enableConsoleLogging) {
      console.log(message);
    }
  }
}
