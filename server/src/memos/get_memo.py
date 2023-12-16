import json

from util import constant


def get_all_memos():
    memos = []
    with open(constant.MEMO_FILE, "r") as f:
        try:
            memos = json.load(f)
        except json.decoder.JSONDecodeError:
            memos = []
    return memos


def get_memo(memo_id: str):
    memos = get_all_memos()
    memo = next(filter(lambda m: m["id"] == memo_id, memos), None)
    return memo
