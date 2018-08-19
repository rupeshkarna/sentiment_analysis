import twitter
from sklearn.externals import joblib
import json
import sys
from nltk.tokenize import WordPunctTokenizer
from bs4 import BeautifulSoup
import re

classifier = joblib.load('app/static/model/sentiment.model')

class TweetClassifier(object):
    """class for Searching and classifying tweets"""
    CONSUMER_KEY = ''
    CONSUMER_SECRET = ''
    ACCESS_TOKEN_KEY = ''
    ACCESS_TOKEN_SECRET = ''

    api = twitter.Api(consumer_key=CONSUMER_KEY,
                  consumer_secret=CONSUMER_SECRET,
                  access_token_key=ACCESS_TOKEN_KEY,
                  access_token_secret=ACCESS_TOKEN_SECRET)

    pat1 = r'@[A-Za-z0-9]+' #remove username
    pat2 = r'https?://[A-Za-z0-9./]+' #remove url that starts with http or https
    pat3 = r'www.[^ ]+' #remove url that starts with www
    pat4 = r'\s?[0-9]+\.?[0-9]*' #remove numbers
    pat5 = r'RT[A-Za-z0-9./]*' #remove retweet rt
    combined_pat = r'|'.join((pat1, pat2, pat3, pat4, pat5))
    # handle negation patterns
    negations_dic = {"isn't":"is not", "aren't":"are not", "wasn't":"was not", "weren't":"were not",
                    "haven't":"have not","hasn't":"has not","hadn't":"had not","won't":"will not",
                    "wouldn't":"would not", "don't":"do not", "doesn't":"does not","didn't":"did not",
                    "can't":"can not","couldn't":"could not","shouldn't":"should not","mightn't":"might not",
                    "mustn't":"must not"}
    neg_pattern = re.compile(r'\b(' + '|'.join(negations_dic.keys()) + r')\b')

    def authenticate(self):
        try:
            TweetClassifier.api.VerifyCredentials()
            return True
        except twitter.error.TwitterError as e:
            return False

    @staticmethod
    def search_tweets(search_keyword):
        tweet_list = list()
        tweets = TweetClassifier.api.GetSearch(search_keyword, count=100)
        for tweet in tweets:
            tweet_list.append(dict(date=tweet.created_at,
                user=tweet.user.screen_name,
                tweet=tweet.text))
        return tweet_list


    @staticmethod
    def classify_tweets(tweets):
        for tweet in tweets:
            preprocessed_tweet = TweetClassifier.__pre_process(tweet['tweet'])
            sentiment = classifier.predict([preprocessed_tweet])
            sentiment = 0 if sentiment[0] == 0 else 1
            tweet['sentiment'] = sentiment

    @staticmethod
    def __pre_process(tweet):
        tok = WordPunctTokenizer()        
        soup = BeautifulSoup(tweet, 'lxml')
        souped = soup.get_text()
        stripped = re.sub(TweetClassifier.combined_pat, '', souped)
        try:
            clean = stripped.decode("utf-8-sig").replace(u"\ufffd", "?")
        except:
            clean = stripped
        lower_case = clean.lower()
        neg_handled = TweetClassifier.neg_pattern.sub(
            lambda x: TweetClassifier.negations_dic[x.group()], lower_case)
        letters_only = re.sub("[^a-zA-Z]", " ", neg_handled)
        words = [x for x  in tok.tokenize(letters_only) if len(x) > 1]
        return (" ".join(words)).strip()

if __name__ == '__main__':
    twitter_handler = TweetClassifier()
    if not twitter_handler.authenticate():
        print 'Authentication failed!!!'
        sys.exit(1)
    tweets = TweetClassifier.search_tweets('happy')
    TweetClassifier.classify_tweets(tweets)
    print tweets
