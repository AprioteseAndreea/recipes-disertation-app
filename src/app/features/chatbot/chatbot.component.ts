import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { OpenaiService } from './services/openai.service';

export interface Message {
  text: string;
  isOwner: boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom', { static: true })
  private scrollContainer!: ElementRef;
  messageList!: Message[];
  public message!: string;
  isLoading!: boolean;

  constructor(private openaiService: OpenaiService) {}

  ngOnInit(): void {
    this.messageList = [];
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // scroll to bottom
  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  async sendMessage(message: string) {
    if (message.length != 0) {
      this.messageList.push({
        text: message,
        isOwner: true,
      });
      this.message = '';
      this.messageList.push({
        text: 'Typing ...',
        isOwner: false,
      });

      const response = await this.openaiService.chat(message);
      if (response) {
        this.messageList.pop();
        this.messageList.push({
          text: response,
          isOwner: false,
        });
      }
    }
  }
}
