import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { createUserDto, LoginUserDto } from './dto/user.dto';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  //gen a salt

  async signUp({ email, name, password }: createUserDto) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser.length)
      throw new BadRequestException('Email already in use');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const encPass = salt + '.' + hash.toString('hex');
    return await this.userService.create({
      email,
      name,
      password: encPass,
    });
  }

  async signIn({ email, password }: LoginUserDto) {
    const [existingUser] = await this.userService.findUserByEmail(email);
    if (!existingUser)
      throw new NotFoundException('No user exist with this email');
    const [salt, storedHash] = existingUser.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new NotAcceptableException();
    }
    return existingUser;
  }
}
