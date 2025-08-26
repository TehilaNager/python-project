import { useContext, createContext, useState, useEffect } from "react";
import commentService from "../services/commentService";
import { questionFeedback } from "../helpers/feedback";

const commentContext = createContext();
commentContext.displayName = "Comments";

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const data = await commentService.getAllComments();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const createComment = async (id, values) => {
    const response = await commentService.createComment(id, values);
    setComments([...comments, response]);
    return response;
  };

  const deleteComment = async (id) => {
    try {
      const confirmed = await questionFeedback("The comment has been deleted!");
      if (!confirmed) return;
      await commentService.deleteComment(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const updateComment = async (id, values) => {
    try {
      const response = await commentService.updateComment(id, values);
      setComments(
        comments.map((comment) => (comment.id === id ? response : comment))
      );
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  return (
    <commentContext.Provider
      value={{
        comments,
        fetchComments,
        deleteComment,
        updateComment,
        createComment,
      }}
    >
      {children}
    </commentContext.Provider>
  );
}

export function useComments() {
  return useContext(commentContext);
}
