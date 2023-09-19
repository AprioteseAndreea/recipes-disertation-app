// import { AlertService } from 'src/app/core/alert/alert.service';
// import { LoggerService } from './logger.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ErrorHandler, Injectable } from '@angular/core';
// import { RequestError } from './models';

// @Injectable()
// export class GlobalErrorHandler implements ErrorHandler {
//   constructor(private logger: LoggerService, private alert: AlertService) {}

//   handleError(error: Error | HttpErrorResponse) {
//     let message = '';

//     if (error instanceof HttpErrorResponse) {
//       const requestError: RequestError = error.error as RequestError;

//       let messageDescription = `${requestError.title}`;
//       if (requestError.errors) {
//         Object.entries(requestError.errors).forEach(([key, value]) => {
//           messageDescription += `\n\t - ${key}: ${value.join(', ')}`;
//         });
//       }

//       message =
//         `Error Code: ${error.status}\n` +
//         `Title: ${messageDescription}\n` +
//         `Message: ${error.message}\n` +
//         `TraceID: ${requestError.traceId}`;

//       this.alert.error(messageDescription);
//     } else {
//       message = `Error: ${error.message}\n` + `Trace: ${error.stack}`;
//     }
//     this.logger.error(message);
//   }
// }
