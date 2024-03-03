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

  // send text message
  public sendMessage(message: string) {
    if (message.length != 0) {
      this.messageList.push({
        text: message,
        isOwner: true,
      });
      this.message = '';
      this.generateOpenaiChatCompletion(message);
    }
  }

  // to generate openai chatGPT chat completion(response)
  public generateOpenaiChatCompletion(text: string) {
    setTimeout(() => {
      this.isLoading = true;
    }, 100);
    this.openaiService.generateChatCompletion(text)
    .subscribe(
      (res: { result: { role: string; content: string } }) => {
        if (res) {
          this.messageList.push({
            text: res.result.content,
            isOwner: false,
          });
          this.isLoading = false;
          this.scrollToBottom();
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
