var WordCloud = (function() {

    function WordCloud(tweets) {
        this.tweets = tweets;
        this.json = {}
        this.positiveColor = "#00FF00";
        this.negativeColor = "#FF0000";
    }

    WordCloud.prototype.plot = function(container) {
        var data = [];
        var wordFrequency = {};
        this.tweets.forEach(function(row) {
            var tweet = row.tweet;
            var words = tweet.split(" ").filter(w => /^([a-zA-Z]){6,}$/.test(w));
            words.forEach(function(word) {
                if (!wordFrequency.hasOwnProperty(word)) {
                    wordFrequency[word] = {};
                }
                wordFrequency[word][row.sentiment] = wordFrequency[word][row.sentiment] ?
                    wordFrequency[word][row.sentiment] + 1 : 1;
            });
        });
        
        for(var wordObject in wordFrequency){
            var name = wordObject;
            var weight = 0;
            var color = "#00FF00";
            for(var sentiment in wordFrequency[wordObject]){
                weight += wordFrequency[wordObject][sentiment];
            }
            var sentiments = Object.keys(wordFrequency[wordObject]);
            if(sentiments.length == 1){
                if(sentiments[0] == 0){
                    color = "#FF0000";
                }
            } else{
                if(wordFrequency[wordObject][0] > wordFrequency[wordObject][1]){
                    color = "#FF0000";
                }
            }
            data.push({'name':name, 'weight':weight, 'color':color});
        }
        var title = {
            text: 'Wordcloud of recent Tweeets'
        };
        var series = [{
            type: 'wordcloud',
            data: data,
            name: 'Occurrences'
        }];

        this.json.title = title;
        this.json.series = series;

        $(container).highcharts(this.json);
    };

    return WordCloud;
}());