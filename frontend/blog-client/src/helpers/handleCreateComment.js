const handleCreateComment = async ({ newComment, articleId, createComment, setNewComment }) => {
    if (!newComment.trim()) return;

    try {
        await createComment(articleId, {
            text: newComment,
            article: articleId,
        });
        setNewComment("");
    } catch (err) {
        console.error("Error creating comment:", err);
    }
};

export default handleCreateComment;
