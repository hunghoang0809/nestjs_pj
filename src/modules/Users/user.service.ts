import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/createUser.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  createUser(UserInfo: UserDto) {
    const newUser = this.userRepository.create({
      ...UserInfo,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUser: UserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUser);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  filterdtUsers(
    name?: string,
    email?: string,
    phone?: string,
  ): Promise<User[]> {
    let filteredUsers = this.userRepository.createQueryBuilder('user');

    if (name) {
      filteredUsers = filteredUsers.where('user.name = :name', { name });
    }

    if (email) {
      filteredUsers = filteredUsers.orWhere('user.email = :email', { email });
    }

    if (phone) {
      filteredUsers = filteredUsers.orWhere('user.phone = :phone', { phone });
    }

    return filteredUsers.getMany();
  }
  getUsersSortedByCreationDate(sortBy: boolean): Promise<User[]> {
    let query = this.userRepository.createQueryBuilder('user');

    // Add sorting based on query parameter
    if (sortBy) {
      query = query.orderBy('user.createdAt', 'DESC');
    } else {
      query = query.orderBy('user.createdAt', 'ASC');
    }

    return query.getMany();
  }

  async active (id: number):Promise<void> {
    const user = await this.userRepository.findOneBy({ id })
   
    
      if (!user.isActive) {
        user.isActive = true
        this.userRepository.save(user)

      }
    
  }

  async inActive(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (user) {
      user.isActive=false
    }
    await this.userRepository.save(user)
  }
}
