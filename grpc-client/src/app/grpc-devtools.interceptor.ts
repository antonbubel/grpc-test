import { GrpcCallType, GrpcHandler, GrpcInterceptor, GrpcRequest } from '@ngx-grpc/core';
import { Status } from 'grpc-web';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class GrpcWebDevtoolsInterceptor implements GrpcInterceptor {

  intercept<REQ, RES>(request: GrpcRequest<REQ, RES>, next: GrpcHandler): Observable<RES | Status> {
    if (!environment.production) {
      return next.handle(request)
        .pipe(
          tap(response => {
            if (request.type === GrpcCallType.unary) {
              window.postMessage({
                type: '__GRPCWEB_DEVTOOLS__',
                method: request.path,
                methodType: 'unary',
                request: request.requestData,
                response,
              }, '*');
            }
          }),
          catchError(error => {
            if (request.type === GrpcCallType.unary) {
              window.postMessage({
                type: '__GRPCWEB_DEVTOOLS__',
                method: request.path,
                methodType: 'unary',
                request: request.requestData,
                error,
              }, '*');
            }

            return throwError(error);
          }),
        );
    }

    return next.handle(request);
  }

}