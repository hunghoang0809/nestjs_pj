import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator"


export class UserDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    phone: number
    
    
    active: boolean
}