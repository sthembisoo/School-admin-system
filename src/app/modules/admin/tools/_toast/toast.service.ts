import { Injectable, TemplateRef } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    // Make sure toasts array doesnt grow bigger than 3
    if (this.toasts.length >= 3) {
      this.toasts.shift();
    }
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  showSuccess(bodyText: string, delay: number | null = null) {
    const toastDelay = delay === null ? 5000 : delay;
    this.show(bodyText, {
      classname: 'toast-success text-light toast animated fadeIn pre-wrap',
      delay: toastDelay,
      autohide: true,
      headertext: 'Success',
    });
  }

  showError(bodyText: string, delay: number | null = null) {
    const toastDelay = delay === null ? 9000 : delay;
    this.show(bodyText, {
      classname: 'toast-error text-light toast animated fadeIn pre-wrap',
      delay: toastDelay,
      autohide: true,
      headertext: 'Error',
    });
  }



  missingRequiredFields() {
    this.showError(
      'You are missing one or more required fields. Please check your form and try again.'
    );
  }

  featureStillInDevelopment(featureName: string) {
    this.showWarning(`The feature '${featureName}' is still in development.`);
  }

  showWarning(bodyText: string, delay: number | null = null) {
    const toastDelay = delay === null ? 7000 : delay;
    this.show(bodyText, {
      classname: 'toast-warn text-dark toast animated fadeIn pre-wrap',
      delay: toastDelay,
      autohide: true,
      headertext: 'Warning',
    });
  }


}
