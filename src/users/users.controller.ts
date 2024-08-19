import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-fto';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersSevice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.usersSevice.create(body.email, body.password);
  }
  // @UseInterceptors(new SerializerInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.usersSevice.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not FOUND');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersSevice.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersSevice.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersSevice.update(parseInt(id), body);
  }
}
