import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, Password: string) {
    const user = this.repo.create({ email, Password });
    return this.repo.save(user);
  }
}
