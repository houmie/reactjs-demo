from flask import Flask, render_template
from flask.ext import restful
import json

app = Flask(__name__)
api = restful.Api(app)

class TestJson(restful.Resource):
    def get(self):
        return [{"x": "get"}], 200

    def post(self):
        return [{"x": "Result from Server"}], 201

api.add_resource(TestJson, '/search')

@app.route("/")
def start():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
