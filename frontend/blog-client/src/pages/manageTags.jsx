import PageHeader from "../components/common/pageHeader";
import { useTag } from "../context/tagContext";

function ManageTags() {
  const { newTagName, setNewTagName, createTag, tags, deleteTag } = useTag();

  return (
    <div className="container col-11 col-md-6">
      <PageHeader
        title="Manage Tags"
        classTitle="mt-5 mb-3 text-center fw-bold"
      />

      <p
        style={{
          color: "#6c757d",
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.1rem",
        }}
      >
        Tags are used to categorize your articles. Create new tags here and
        later, when creating an article, you can select which tags apply to it.
      </p>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={createTag}
        >
          Add Tag
        </button>
      </div>

      <div>
        {tags.length === 0 ? (
          <p>No tags available. Create some!</p>
        ) : (
          <ul className="list-group">
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tag.name}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTag(tag.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageTags;
