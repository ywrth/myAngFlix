// global-error-handler.service.ts

import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    console.error('Unexpected error occurred:', error);
    
    // Additional error handling logic...
  }
}