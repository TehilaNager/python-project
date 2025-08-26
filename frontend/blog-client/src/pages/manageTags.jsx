import { useState } from "react";
import PageHeader from "../components/common/pageHeader";
import { useTag } from "../context/tagContext";
import createTagSchema from "../schemas/createTagSchema";
import { useFormik } from "formik";

function ManageTags() {
  const { createTag, tags, deleteTag } = useTag();
  const [serverError, setServerError] = useState("");

  const { resetForm, handleSubmit, getFieldProps, touched, errors } = useFormik(
    {
      initialValues: { name: "" },
      validate: (values) => {
        const schema = createTagSchema();
        const { error } = schema.validate(values, { abortEarly: false });
        if (!error) return {};
        const errors = {};
        for (const detail of error.details) {
          errors[detail.path[0]] = detail.message;
        }
        return errors;
      },
      onSubmit: async (values) => {
        try {
          setServerError("");
          await createTag(values.name);
          resetForm();
        } catch (err) {
          setServerError(
            err.response?.data?.name ||
              err.response?.data?.detail ||
              "Something went wrong."
          );
        }
      },
    }
  );

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
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mb-3 d-flex">
          <input
            type="text"
            className={`form-control ${
              errors.name && touched.name ? "is-invalid" : ""
            }`}
            placeholder="Enter new tag..."
            {...getFieldProps("name")}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Add Tag
          </button>
        </div>

        {errors.name && touched.name && (
          <div className="text-danger mb-2">{errors.name}</div>
        )}
        {serverError && <div className="alert alert-danger">{serverError}</div>}
      </form>

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
