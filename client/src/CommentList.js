import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    let content

    if(comment.status === 'approved') {
      content = comment.content
    }

    if(comment.status === 'pending') {
      content = 'This comment is awaiting mpderation'
    }

    if(comment.status === 'rejected') {
      // eslint-disable-next-line no-unused-vars
      content = 'This comment has being rejected'
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
