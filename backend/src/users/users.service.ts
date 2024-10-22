import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create({ username, email, password }: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const user = this.userRepository.create({
      username,
      email,
      password,
      refreshToken: '',
    });
    return this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async updateRefreshToken(userId: ObjectId, refresh_token: string) {
    const user = await this.userRepository.findOne({
      where: { _id: userId },
    });
    user.refreshToken = refresh_token;
    return this.userRepository.save(user);
  }
}
