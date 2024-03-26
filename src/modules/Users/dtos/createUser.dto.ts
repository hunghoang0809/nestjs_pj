import { IsEmail, IsNotEmpty, IsNumber, isNotEmpty } from "class-validator"


export class UserDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsNumber()
    phone: number
    
    
    isActive: boolean
}