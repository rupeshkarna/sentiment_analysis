from app import app
from flask import request, render_template
from tweet_classifier import TweetClassifier
import json

tweet_handler = TweetClassifier()

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sentiment", methods=['POST'])
def get_twitter_feed():
    if not tweet_handler.authenticate():
        return json.dumps(dict(success=False, error='Authentication failure!!!'))
    searchkey = request.form['searchkey']
    tweets = TweetClassifier.search_tweets(searchkey)
    TweetClassifier.classify_tweets(tweets)
    return json.dumps(dict(success=True, rows=tweets))
