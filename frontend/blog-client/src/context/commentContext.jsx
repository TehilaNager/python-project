import { useContext, createContext, useState, useEffect } from "react";
import commentService from "../services/commentService";

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

  return (
    <commentContext.Provider value={{ comments, fetchComments }}>
      {children}
    </commentContext.Provider>
  );
}

export function useComments() {
  return useContext(commentContext);
}
