import { Injectable} from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
  
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['createdSurveys', 'updatedSurveys'], // Incluir encuestas relacionadas
    });
  }

  // // getAll users
  // async getAllUsers(): Promise<User[]> {
  //   return this.userRepository.find();
  // }

  // async validateUser(email: string, password: string): Promise<User | null> {
  //   const user = await this.userRepository.findOneBy({ email });
  //   if (user && await bcrypt.compare(password, user.password)) {
  //     return user;
  //   }
  //   return null;
  // }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}