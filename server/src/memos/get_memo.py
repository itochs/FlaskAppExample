import json

from util import constant


def get_all_memos(user_id: str = None):
    memos = []
    with open(constant.MEMO_FILE, "r") as f:
        try:
            memos = json.load(f)
        except json.decoder.JSONDecodeError:
            memos = []

    if user_id is None:
        return memos

    user_memos = list(filter(lambda m: m["user_id"] == user_id, memos))
    return user_memos


def get_memo(memo_id: str, user_id: str = None):
    memos = get_all_memos(user_id)
    memo = next(filter(lambda m: m["id"] == memo_id, memos), None)
    return memo
