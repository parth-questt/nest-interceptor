/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

export interface Response<T> {
  data: Record<string, unknown>;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getRequest();
    const { statusCode, url } = response;
    console.log(url);
    return next.handle().pipe(
      map((data) => {
        if (data.pagination) {
          // const pagination = Object.assign({}, data.data.pagination);
          // delete data.data.pagination;
          return {
            success: true,
            message: 'no issues',
            pagination: data.pagination,
            data: {
              [data.data.length > 1
                ? pluralize(data.data.constructor.name)
                : data.constructor.name]: data.data,
            },
          };
        } else if (statusCode >= 400) {
          return {
            success: false,
            message: 'error message',
            data: { [data.constructor.name]: data.data },
          };
        } else
          return {
            success: true,
            message: '',
            data: {
              [data.data.length > 1
                ? pluralize(data.data[1].constructor.name)
                : data.data.constructor.name]: data.data,
            },
          };
      }),
    );
  }
}
