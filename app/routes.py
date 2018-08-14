from app import app
from flask import request, render_template
import json


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sentiment", methods=['POST'])
def get_twitter_feed():
    # print request.form['searchkey']
    data = [
        {
            "date": "02 Aug 2018",
            "user": "Ram",
            "tweet": "Its a wonderful weather we are having :-D #sunny_days",
            "sentiment": 1
        },
        {
            "date": "02 Aug 2018",
            "user": "Ram",
            "tweet": "Its a unpleasent weather",
            "sentiment": 0
        },
        {
            "date": "03 Aug 2018",
            "user": "Ram",
            "tweet": "This weather is so annoying #rainy_days",
            "sentiment": 0
        },
        {
            "date": "03 Aug 2018",
            "user": "Shyam",
            "tweet": "Just go to hell :-@",
            "sentiment": 0
        },
        {
            "date": "04 Aug 2018",
            "user": "Hari",
            "tweet": "wonderful :-)",
            "sentiment": 1
        }
    ]
    return json.dumps(dict(success=True, rows=data))
