import { Meteor } from 'meteor/meteor';

var twitterClient = new Twitter({
    consumer_key: Meteor.settings.twitter.consumer_key,
    consumer_secret: Meteor.settings.twitter.consumer_secret,
    access_token_key: Meteor.settings.twitter.access_token_key,
    access_token_secret: Meteor.settings.twitter.access_token_secret
});

Future = Npm.require('fibers/future');

Meteor.methods({
    getMediaTweets: function() {
        var fut = new Future();

        twitterClient.get('statuses/user_timeline', {
            screen_name: 'Interstellate_',
            count: 100
        }, function(error, tweets, response) {
            fut.return(tweets);
        });

        var items = fut.wait();

        items.forEach(i => Tweets.upsert({_id: i.id}, i));

        return Tweets.find().fetch();
    }
});
