import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, Password: string) {
    const user = this.repo.create({ email, Password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    return this.findOne(id);
  }

  async find(email: string) {
    return this.find(email);
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attr);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw Error('user not found');
    }
    return this.repo.remove(user);
  }
}
