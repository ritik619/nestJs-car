import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserResponseDto } from 'src/user/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    //all tasks that you want before handling request
    return next.handle().pipe(
      map((data: any) => {
        // all tasks that you want to do before sending response
        return plainToClass(UserResponseDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
