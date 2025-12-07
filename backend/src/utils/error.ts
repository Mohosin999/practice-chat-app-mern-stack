// export interface CustomError extends Error {
//   status?: number;
// }

// export const notFound = (msg = "Resource not found"): CustomError => {
//   const error = new Error(msg) as CustomError;
//   error.status = 404;
//   return error;
// };

// export const badRequest = (msg = "Bad Request"): CustomError => {
//   const error = new Error(msg) as CustomError;
//   error.status = 400;
//   return error;
// };

// export const serverError = (msg = "Internal Server Error"): CustomError => {
//   const error = new Error(msg) as CustomError;
//   error.status = 500;
//   return error;
// };

// export const authenticationError = (
//   msg = "Authentication Failed"
// ): CustomError => {
//   const error = new Error(msg) as CustomError;
//   error.status = 401;
//   return error;
// };

// export const authorizationError = (msg = "Permission Denied"): CustomError => {
//   const error = new Error(msg) as CustomError;
//   error.status = 403;
//   return error;
// };

export class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const notFound = (msg: string = "Resource not found"): CustomError =>
  new CustomError(msg, 404);

export const badRequest = (msg: string = "Bad Request"): CustomError =>
  new CustomError(msg, 400);


export const authenticationError = (
  msg: string = "Authentication Failed"
): CustomError => new CustomError(msg, 401);

export const authorizationError = (
  msg: string = "Permission Denied"
): CustomError => new CustomError(msg, 403);

export const serverError = (
  msg: string = "Internal Server Error"
): CustomError => new CustomError(msg, 500);