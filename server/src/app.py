from firebase_admin import initialize_app
from flask import Flask, jsonify, request
from memos.get_memo import get_all_memos as get_all_memos_from_db
from memos.get_memo import get_memo as get_memo_from_db
from memos.save_memo import save_memo
from util.verify import require_auth

app = Flask(__name__)
firebase_app = initialize_app()


@app.route("/memos", methods=["POST"])
@require_auth
def index(user_id: str):
    req: dict = request.get_json()
    memo = req.get("memo")
    id = save_memo(memo, user_id)
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
