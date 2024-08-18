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
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user-fto';
@Controller('auth')
export class UsersController {
  constructor(private usersSevice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.usersSevice.create(body.email, body.password);
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
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
