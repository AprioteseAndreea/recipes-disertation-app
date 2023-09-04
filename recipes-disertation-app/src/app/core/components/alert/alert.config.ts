export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Error = 'danger',
  Success = 'success',
}

export const AlertTypeTimeout: { [key in AlertType]: any } = {
  info: 5000,
  warning: 5000,
  danger: 10000,
  success: 3000,
};

export interface Alert {
  type: AlertType;
  message: string;
  timeout: number;
}
