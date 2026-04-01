export type ErrorDetail = {
  field: string;
  message: string;
};

export type Error = {
  success: false;
  message: string;
  error: string;
  details?: ErrorDetail[];
};

export type Success<T> = {
  success: true;
  message: string;
  data: T;
};

export type Response<T> = Success<T> | Error;