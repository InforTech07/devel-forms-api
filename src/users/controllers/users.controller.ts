import {
    Controller,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  
  import { UsersService } from '../services/users.service';
  import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
  import { ApiTags } from '@nestjs/swagger';


  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    // @Get()
    // findAll() {
    //   return this.usersService.getAllUsers();
    // }
  
    // @Get(':id')
    // get(@Param('id', ParseIntPipe) id: number) {
    //   return this.usersService.getUserById(id);
    // }
  
    @Post()
    create(@Body() payload: CreateUserDto) {
      return this.usersService.createUser(payload);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateUserDto,
    ) {
      console.log('id', id);
      console.log('payload', payload);
      return 'update';
      //return this.usersService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      console.log('id', id);
      return 'remove';
      //return this.usersService.remove(+id);
    }
  }