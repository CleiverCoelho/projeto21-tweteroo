import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetDto, PassQueryPage } from './dtos/tweet.dto';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor () {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  signUpUser(body : CreateUserDto) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }

  createTweet(body: CreateTweetDto) {
    const { username, tweet } = body;
    
    if(!this.users.find((elemento) => elemento.getUsername() === username)){
      throw new Error('UNAUTHORIZED');
    }
    return this.tweets.push(new Tweet(username, tweet));
  }

  getTweets(query : PassQueryPage) {
    let page = parseInt(query?.page);
    if(page < 1) throw new Error("Invalid Page");
    if(isNaN(page)) page = 1;
    const sum = 1;
    const dezUltimos = this.tweets.reverse().slice((page - 1) * 14 + (page > 1 ? sum : 0), page * 15);
    const tweetsAvatares = dezUltimos.map((elemento, index) => {
      const user = this.users.find((findUsername) => findUsername.getUsername() === elemento.getUsername())
      const novoObj = {
        username: user.getUsername(),
        avatar: user.getAvatar(),
        tweet: elemento.getTweet()
      }
      return novoObj;
    })
    return tweetsAvatares;
  }

  getTweetsFromUser(username : string) {
    const userTweets = this.tweets.filter((elemento, index) => elemento.getUsername() === username);
    const tweetsAvatares = userTweets.map((elemento, index) => {
      const user = this.users.find((findUsername) => findUsername.getUsername() === elemento.getUsername())
      const novoObj = {
        username: user.getUsername(),
        avatar: user.getAvatar(),
        tweet: elemento.getTweet()
      }
      return novoObj;
    })
    return tweetsAvatares; 
  }
}
