import json
import uuid

from util import constant


def save_memo(memo: list[str]) -> bool:
    if not memo or len(memo) == 0:
        return False

    memos = None
    with open(constant.MEMO_FILE, "r") as f:
        try:
            memos = json.load(f)
        except json.decoder.JSONDecodeError:
            memos = []
        memos.append({"memo": memo, "id": str(uuid.uuid4())})
    with open(constant.MEMO_FILE, "w") as f:
        json.dump(memos, f, indent=2, ensure_ascii=False)

    return True
