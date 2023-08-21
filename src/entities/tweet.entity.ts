export class Tweet {
    private username: string;
    private tweet: string;

    constructor(username: string, tweet : string){
        this.username = username;
        this.tweet = tweet;
    }

    getTweet(){
        return this.tweet;
    }

    getUsername(){
        return this.username;
    }
}