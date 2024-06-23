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
  threadId: string;

  constructor(private openaiService: OpenaiService) {}

  async ngOnInit(): Promise<void> {
    this.messageList = [];
    this.threadId = await this.openaiService.createThread();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  goBack() {
    window.history.back();
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
    }

    try {
      // Adaugă mesajul în thread
      if (this.threadId) {
        await this.openaiService.addMessagesToThread(message, this.threadId);

        // Rulează thread-ul și așteaptă finalizarea rulării
        const runId = await this.openaiService.runThread(this.threadId);

        await this.openaiService.waitForRunToFinish(this.threadId, runId);

        // Listează mesajele actualizate după rularea asistentului
        const messages = await this.openaiService.listMessages(this.threadId);

        this.messageList = [];
        for (const message of messages.reverse()) {
          if (message.content[0]) {
            this.messageList.push({
              text: message.content[0].text.value,
              isOwner: message.role == 'user' ? true : false,
            });
          }
        }
        this.message = '';
      } else {
        console.error('ThreadId lipsă.');
      }
    } catch (error) {
      console.error('Eroare:', error);
    }
  }
}
