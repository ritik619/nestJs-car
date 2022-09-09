import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(body: createUserDto): Promise<User> {
    const user = this.repo.create(body);
    return this.repo.save(user);
  }

  async findUserById(id: number): Promise<User> {
    return await this.repo.findOneBy({ id });
  }

  findUserByEmail(email: string): Promise<User[]> {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException();
    const updatedUser = { ...user, ...attrs };
    return this.repo.save(updatedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException();
    return this.repo.remove(user);
  }
}
