Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    this.render('home', {
        data: function() { },
        template: 'home'
    });
});

Router.route('/stories/real', function () {
    this.render('story_real', {
        data: function() { },
        template: 'story_real'
    });
});
