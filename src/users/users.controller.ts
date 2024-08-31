import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  Delete,
  Session,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-fto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/currrent-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersSevice: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersSevice.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoamI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  // @UseInterceptors(new SerializerInterceptor(UserDto))

  @Post('/signin')
  async signin(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

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
