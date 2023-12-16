from flask import Flask, request
from memos.save_memo import save_memo

app = Flask(__name__)


@app.route("/memos", methods=["POST"])
def index():
    req: dict = request.get_json()
    memo = req.get("memo")
    if save_memo(memo):
        return {"message": "memo saved"}, 204
    else:
        return {"message": "memo have no content"}, 400
