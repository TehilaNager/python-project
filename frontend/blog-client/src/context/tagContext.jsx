import { createContext, useContext, useEffect, useState } from "react";
import tagsService from "../services/tagService";
import Swal from "sweetalert2";

const tagContext = createContext();
tagContext.displayName = "Tag";

export function TagProvider({ children }) {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  const fetchTags = async () => {
    try {
      const response = await tagsService.getAllTags();
      setTags(response);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTag = async () => {
    const name = newTagName.trim();
    if (!name) return;

    if (tags.some((tag) => tag.name.toLowerCase() === name.toLowerCase())) {
      Swal.fire({
        icon: "warning",
        title: "This tag already exists!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await tagsService.createTag({ name });
      setTags([...tags, response]);
      setNewTagName("");
    } catch (err) {
      console.error("Error creating tag:", err);
    }
  };

  const deleteTag = async (id) => {
    try {
      await tagsService.deleteTag(id);
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (err) {
      console.error("Error deleting tag:", err);
    }
  };

  return (
    <tagContext.Provider
      value={{ newTagName, setNewTagName, createTag, tags, deleteTag }}
    >
      {children}
    </tagContext.Provider>
  );
}

export function useTag() {
  return useContext(tagContext);
}
