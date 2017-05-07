#!/usr/bin/env python
# encoding: utf-8

import tweepy #https://github.com/tweepy/tweepy
import json

#Twitter API credentials
consumer_key = "DCgsiPaEQAwk4Hg8i22wU39ZJ"
consumer_secret = "8fZHl5p049rXSNZvKPteKqbkjS0IZ8uQGAP8oGj0LPHNVJJLqY"
access_key = "62655927-VQtiWdzP5p6eHd8zmpxE9fyVpiM3KrYitwQBtVK5f"
access_secret = "biqL1r8v9zxeLjpIMO4S20ndgm73M9GKzvILU8wXOtfl4"


def get_all_tweets(screen_name):
    #Twitter only allows access to a users most recent 3240 tweets with this method

    #authorize twitter, initialize tweepy
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)

    #initialize a list to hold all the tweepy Tweets
    alltweets = []

    #make initial request for most recent tweets (200 is the maximum allowed count)
    new_tweets = api.user_timeline(screen_name = screen_name,count=200)

    #save most recent tweets
    alltweets.extend(new_tweets)

    #save the id of the oldest tweet less one
    oldest = alltweets[-1].id - 1

    while len(new_tweets) > 0:
        new_tweets = api.user_timeline(screen_name = screen_name,count=200,max_id=oldest)
        alltweets.extend(new_tweets)
        oldest = alltweets[-1].id - 1

    outtweets = [[
        tweet.id_str,
        tweet.entities['media'][0]['media_url_https'],
        tweet.created_at.timestamp(),
        tweet.text,
        tweet.retweet_count, tweet.favorite_count,
    ] for tweet in alltweets if (
        "media" in tweet.entities.keys() and
        (not tweet.text.startswith("RT @"))
    )]
    return outtweets

def lambda_handler(event, content):
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps({"data": get_all_tweets("interstellate_")})
    }

if __name__ == "__main__":
    print(get_all_tweets("interstellate_")[0])
