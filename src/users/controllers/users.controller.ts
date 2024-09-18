import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
  
  import { UsersService } from '../services/users.service';
  import { CreateUserDto} from '../dtos/user.dto';
  import { ApiTags } from '@nestjs/swagger';


  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post()
    createUser(@Body() payload: CreateUserDto) {
      return this.usersService.createUser(payload);
    }
  
  }