from flask import Flask, request
from memos.save_memo import save_memo

app = Flask(__name__)


@app.route("/memos", methods=["POST"])
def index():
    req: dict = request.get_json()
    memo = req.get("memo")
    id = save_memo(memo)
    if id:
        return {"id": id}, 200
    else:
        return {"message": "memo have no content"}, 400
