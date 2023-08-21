import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  username: string; // required().string().max(1)

  @IsString()
  @IsNotEmpty()
  tweet: string;
}