import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
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
  getUsers(@Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
  @Query('sortBy') sortBy?: string): Promise<User[]> {
    if (name || email || phone) {
      return this.userService.filterdtUsers(name, email, phone)
    } else if (sortBy) {
      return this.userService.getUsersSortedByCreationDate(sortBy);
    }
    
    
    else {
      
      return this.userService.getUsers();
     }
  }

  @Post()
  createUser(@Body() createUserDto: UserDto) {
    this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  UpdateUser(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  
}
