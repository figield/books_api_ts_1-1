import { validateBook } from "./validateBook";
import {Request, Response, NextFunction} from "express";
import {StatusError} from "../error";

export function validate(req: Request, res: Response, next: NextFunction) {
  const result = validateBook(req.body);

  if(!result.success) {
    const error = new StatusError(result.error, 400);
    next(error);
  } else {
    next();
  }

}

// parse don't validate
// make impossible states impossible

// type RequestStatus = {status: 'loading'} | {status: 'loaded', data: string} | {status: 'error', error: Error}; // 3 states
//
// type RequestStatus = {
//   isLoading: boolean;
//   isError: boolean;
// }; // 4 state
//
// function handleRequestStatus(reqStatus: RequestStatus) {
//   if(reqStatus.status === 'loaded') {
//     console.log(reqStatus.data)
//   } else if(reqStatus.status === 'error') {
//     console.log(reqStatus.error);
//   } else {
//     // console.log(reqStatus.err)
//   }
// }