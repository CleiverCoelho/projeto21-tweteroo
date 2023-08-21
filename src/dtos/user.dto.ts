import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string; // required().string().max(1)

  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}