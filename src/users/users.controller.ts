import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private usersSevice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.usersSevice.create(body.email, body.password);
  }
}
