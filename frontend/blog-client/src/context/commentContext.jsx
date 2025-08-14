import { useContext, createContext } from "react";

const commentContext = createContext();
commentContext.displayName = "Comments";

export function CommentsProvider({ children }) {
  return <commentContext.Provider>{children}</commentContext.Provider>;
}

export function useComments() {
  return useContext(commentContext);
}
