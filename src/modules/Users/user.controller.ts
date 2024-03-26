import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/createUser.dto';
import { User } from './entities/User';
import { DeleteResult, UpdateResult } from 'typeorm';
type NewType = string;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('sortBy') sortBy?: boolean,
  ): Promise<User[]> {
    if (name || email || phone) {
      return this.userService.filterdtUsers(name, email, phone);
    } else if (sortBy) {
      return this.userService.getUsersSortedByCreationDate(sortBy);
    } else {
      return this.userService.getUsers();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: UserDto) {
    this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id',ParseIntPipe) id: number): Promise<User> {
    const user= this.userService.getUserById(id); 
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    } else {
      return user
    }
  }

  @Put('/:id')
  UpdateUser(
    @Param('id',ParseIntPipe) id: number,
    @Body() user: UserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }
  @Delete()
  deleteAll() {
    
  }

  @Delete('/:id')
  deleteUser(@Param('id',ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
  @Post('active')
  active(@Body('id') id: number) {
    return this.userService.active(id);
  }
  @Post('inactive')
  inactive(@Body('id') id: number) {
    return this.userService.inActive(id)
  }

}
