import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "둘리",
        comment: "호이",
    },
    {
        name: "마이콜",
        comment: "라면",
    },
    {
        name: "야호",
        comment: "왜그래",
    }
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comments) => {
                return (
                    <Comment name = {comments.name} comment = {comments.comment} />
                )
            })}
        </div>
    )
}

export default CommentList;