import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/userSignup.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() userInfo: createUserDto) {
    this.userService.create(userInfo);
  }
}
