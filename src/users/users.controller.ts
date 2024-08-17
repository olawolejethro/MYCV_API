import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private usersSevice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.usersSevice.create(body.email, body.password);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersSevice.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersSevice.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersSevice.remove(parseInt(id));
  }
}
