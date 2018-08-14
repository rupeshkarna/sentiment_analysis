var TweetsTable = (function() {

    function TweetsTable(tweets) {
        this.tweets = tweets;
        this.rowTemplate = '' +
            '<tr class={bgcolor}>\n' +
            '   <td>{date}</td>\n' +
            '   <td>{user}</td>\n' +
            '   <td>{tweet}</td>\n' +
            '</tr>';
    }

    TweetsTable.prototype.plot = function(container) {
        var actualThis = this;
        this.tweets.forEach(function(row){
            var tableRow = actualThis.getRow(row);
            $(container).append(tableRow);
        });
    };

    TweetsTable.prototype.getRow = function(row){
        var bgcolor = "success";
        if(row.sentiment == 0){
            bgcolor = "danger";
        }
        return this.rowTemplate.replace("{date}", row.date)
            .replace("{user}", row.user)
            .replace("{tweet}", row.tweet)
            .replace("{bgcolor}", bgcolor);
    };

    return TweetsTable;
}());