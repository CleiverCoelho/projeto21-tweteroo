import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, Res, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post("sign-up")
  @HttpCode(200)
  signUpUser(@Body() body : CreateUserDto ) {
    try{
      return this.appService.signUpUser(body);
    }catch(err){
      throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }

  @Post('tweets')
  createTweet(@Body() body: CreateTweetDto) {
    try{
      return this.appService.createTweet(body);
    }catch(err){
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('tweets')
  getTweets() {
    return this.appService.getTweets();
  }

  @Get('tweets/:username')
  getTweetsFromUser(@Param("username") username : string) {
    return this.appService.getTweetsFromUser(username);
  }
}
