function PostCommentBox() {
  function handleSubmit() {}

  return (
    <>
      <h3>Post Comment Box</h3>
      <form id="post-comment-box" onSubmit={handleSubmit}>
        <label>
          Type Comment:
          <input id="post-comment-text-area" type="text"></input>
        </label>
        <button id="post-comment-button" type="submit">
          Post
        </button>
      </form>
    </>
  );
}

export default PostCommentBox;
