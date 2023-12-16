from flask import Flask, jsonify, request
from memos.get_memo import get_all_memos as get_all_memos_from_db
from memos.get_memo import get_memo as get_memo_from_db
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


@app.route("/memos", methods=["GET"])
def get_all_memos():
    all_memo = get_all_memos_from_db()
    return jsonify(all_memo)


@app.route("/memos/<id>", methods=["GET"])
def get_memo(id: str):
    memo = get_memo_from_db(id)
    if memo is None:
        return {"message": "memo not found"}, 404

    return jsonify(memo)
