import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor () {
    this.users = [];
    this.tweets = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  signUpUser(body : CreateUserDto) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }

  createTweet(body: CreateTweetDto) {
    const { username, tweet } = body;
    return this.tweets.push(new Tweet(username, tweet));
  }

  getTweets() {
    const dezUltimos = this.tweets.reverse().slice(0, 14);
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
