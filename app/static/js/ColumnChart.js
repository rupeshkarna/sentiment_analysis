var ColumnChart = (function() {

    function ColumnChart(tweets) {
        this.tweets = tweets;
        this.json = {}
    }

    ColumnChart.prototype.plot = function(container) {
        var data_positive = [];
        var data_negative = [];
        var tweetFrequency = {};
        this.tweets.forEach(function(row) {
            tweet_ts = new Date(row.date).getTime() / 1000;
            tweet_ts = tweet_ts - tweet_ts % 5;
            if (!tweetFrequency.hasOwnProperty(tweet_ts)) {
                tweetFrequency[tweet_ts] = { 0: 0, 1: 0 };
            }
            tweetFrequency[tweet_ts][row.sentiment] = tweetFrequency[tweet_ts][row.sentiment] + 1;
        });

        for (var tsObject in tweetFrequency) {
            for (var sentiment in tweetFrequency[tsObject]) {
                ts = new Date(tsObject * 1000);
                if (sentiment == 1) {
                    data_positive.push([ts, tweetFrequency[tsObject][sentiment]]);
                } else {
                    data_negative.push([ts, tweetFrequency[tsObject][sentiment]]);
                }
            }
        }

        var chart = {
            type: 'column'
        };
        var title = {
            text: 'Tweets timeline'
        };
        var xAxis = {
            categories: Object.keys(tweetFrequency).map(d => new Date(d*1000)),
            title: {
                text: 'Date'
            }
        };
        var yAxis = {
            stackLabels: {
                "enabled": true
            },
            min: 0,
            title: {
                text: 'Frequency'
            }
        };
        var tooltip = {
            enabled: true
        };
        var plotOptions = {
            column: {
                stacking: 'normal',
                pointPadding: 0.2,
                borderWidth: 0
            }
        };
        var credits = {
            enabled: false
        };
        var series = [{
                name: 'Positive Sentiment',
                data: data_positive
            },
            {
                name: 'Negative Sentiment',
                data: data_negative
            }
        ];

        this.json.chart = chart;
        this.json.title = title;
        this.json.tooltip = tooltip;
        this.json.xAxis = xAxis;
        this.json.yAxis = yAxis;
        this.json.series = series;
        this.json.plotOptions = plotOptions;
        this.json.credits = credits;

        $(container).highcharts(this.json);
    };

    return ColumnChart;
}());