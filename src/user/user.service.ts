import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/userSignup.dto';
import { User } from './entity/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(body: createUserDto) {
    const user = this.repo.create(body);
    return this.repo.save(user);
  }
}
