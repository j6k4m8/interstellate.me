import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.feed.created = function() {
    Meteor.call('getMediaTweets', function(err, val) {
        Session.set('media_tweets', val);
    });
};

Template.feed.rendered = function() {
    Meteor.setTimeout(function() {
        $('#spacer').hide();
        $('#gallery').justifiedGallery({
            rowHeight: 350,
            maxRowHeight: 0,
            lastRow: 'justify',
            fixedHeight: false,
            captions: true,
            margins: 0,
            randomize: false,
            extension: /.[^.]+$/,
            refreshTime: 250,
            justifyThreshold: 0.35,
            imagesAnimationDuration: 400,
            captionSettings: {
                animationDuration: 100,
                visibleOpacity: 0.7,
                nonVisibleOpacity: 0.0
            }
        }).on('jg.complete', function (e) {
        }).on('jg.resize', function (e) {
        }).on('jq.rowflush', function (e) {
        });
    }, 1000);
};

Template.feed.helpers({
    'media_tweets': function() {
        return Tweets.find({}, {
            sort: { id: -1 }
        }).fetch().filter(i => !~i.text.indexOf('RT @'));
    }
});

Template.tweet_window.helpers({
    'media_url': function() {
        return this.entities.media[0].media_url;
    },

    'caption': function() {
        return this.text;
    },

    'permalink': function() {
        return `https://twitter.com/_/status/${this.id_str}`;
    }
});
