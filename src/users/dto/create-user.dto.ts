import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly lastName: string;
  
    @IsString()
    readonly password: string;
  
    @IsString()
    readonly email: string;
  
    @IsString()
    readonly firstName?: string;
}
