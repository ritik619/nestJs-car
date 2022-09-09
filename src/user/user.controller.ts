import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { createUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() userInfo: createUserDto) {
    return this.userService.create(userInfo);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findUserById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  findUsersByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Patch('/:id')
  UpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    console.log(user);
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
