import Swal from "sweetalert2";

function handleEditComment(comment, articleId, updateComment) {
    Swal.fire({
        title: "Edit Comment",
        input: "text",
        inputValue: comment.text,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        preConfirm: async (newText) => {
            if (!newText.trim()) {
                Swal.showValidationMessage("Comment cannot be empty");
                return false;
            }
            try {
                await updateComment(comment.id, { text: newText, article: articleId });
                Swal.fire("Updated!", "Your comment has been updated successfully", "success");
            } catch (err) {
                Swal.showValidationMessage("Error updating comment");
            }
        },
    });
}


export default handleEditComment;