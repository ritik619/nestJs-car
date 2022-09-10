import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serializeInterceptor';
import { AuthService } from './auth.service';
import {
  createUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserResponseDto,
} from './dto/user.dto';
import { UserService } from './user.service';

//serialize all the responses
@Serialize(UserResponseDto)
@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() userInfo: createUserDto) {
    return this.authService.signUp(userInfo);
  }

  @Post('/signin')
  signIn(@Body() userLogin: LoginUserDto) {
    return this.authService.signIn(userLogin);
  }

  @Post('/create')
  createUser(@Body() userInfo: createUserDto) {
    return this.userService.create(userInfo);
  }

  //  @UseInterceptors(new SerializeInterceptor(UserResponseDto))
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
