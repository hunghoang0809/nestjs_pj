import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "./dtos/createUser.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from "./entities/User";

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>) { }

   
   
    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
    
  
   
   
    createUser(UserInfo: UserDto) {
        const newUser = this.userRepository.create({
            ...UserInfo, createdAt: new Date()
        })
        return this.userRepository.save(newUser)
    }

   
   
    getUserById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

   
   
    updateUser(id: number, updateUser: UserDto): Promise<UpdateResult> {
        return this.userRepository.update(id, updateUser)
       
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.userRepository.delete({ id })
    }

   
}

