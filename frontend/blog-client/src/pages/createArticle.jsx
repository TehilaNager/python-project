import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import FormButtons from "../components/common/formButtons";
import { useTag } from "../context/tagContext";
import { useFormik } from "formik";
import createArticleSchema from "../schemas/createArticleSchema";
import { useArticles } from "../context/articleContext";
import { errorFeedback, successFeedback } from "../helpers/feedback";
import { useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router";

function CreateArticle() {
  const navigate = useNavigate();
  const { tags } = useTag();
  const { createArticle } = useArticles();
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    getFieldProps,
    resetForm,
    setErrors,
    setSubmitting,
    setFieldValue,
    isValid,
    touched,
    errors,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      text: "",
      status: "draft",
      tags: [],
    },
    validate: (values) => {
      const schema = createArticleSchema();
      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) return null;
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await createArticle(values);
        resetForm();
        navigate("/");
        successFeedback(
          `Article created successfully! Title: "${values.title}"`
        );
      } catch (err) {
        errorFeedback("Oops");
        const data = err.response?.data || {};
        const serverErrors = {};

        if (data.title) serverErrors.title = data.title;
        if (data.text) serverErrors.text = data.text;
        if (data.status) serverErrors.status = data.status;
        if (data.tags) serverErrors.tags = data.tags;

        if (
          !data?.title &&
          !data?.text &&
          !data?.status &&
          !data?.tags &&
          data?.message
        ) {
          setServerError(data.message);
        } else if (
          !data?.title &&
          !data?.text &&
          !data?.status &&
          !data?.tags
        ) {
          setServerError(
            "Service temporarily unavailable. Please try again later."
          );
        }

        setErrors(serverErrors);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const tagsOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }));

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="container col-11 col-md-7">
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <PageHeader
          title="Create Article"
          classTitle="my-5 text-center fw-bold"
        />

        <Input
          label="Title"
          type="text"
          placeholder="Enter the article title here..."
          required
          {...getFieldProps("title")}
          error={touched.title && errors.title}
        />
        <Input
          label="Text"
          type="textarea"
          placeholder="Write the content of your article here..."
          required
          {...getFieldProps("text")}
          error={touched.text && errors.text}
        />

        <label htmlFor="status" className="px-2 mb-2 text-secondary">
          Status:
        </label>

        <Select
          styles={{
            singleValue: (provided) => ({
              ...provided,
              color: "#808080ff",
            }),
          }}
          options={statusOptions}
          className="mb-3"
          classNamePrefix="select"
          placeholder="Select status..."
          value={statusOptions.find(
            (option) => option.value === getFieldProps("status").value
          )}
          onChange={(selectedOption) =>
            setFieldValue("status", selectedOption.value)
          }
        />

        {touched.status && errors.status && (
          <div className="text-danger">{errors.status}</div>
        )}

        <label htmlFor="tags" className="px-2 mb-2 text-secondary">
          Tags:
        </label>

        {tags.length === 0 ? (
          <div className="alert alert-info">
            <span>
              No tags available. You can create them in{" "}
              <strong>Manage Tags</strong> if you’d like to categorize your
              article.{" "}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary rounded-5"
              onClick={() => navigate("/manage-tags")}
            >
              Go to Manage Tags
            </button>
          </div>
        ) : (
          <>
            <Select
              isMulti
              options={tagsOptions}
              className="mb-2"
              classNamePrefix="select"
              placeholder="Select tags..."
              value={tagsOptions.filter((option) =>
                getFieldProps("tags").value.includes(option.value)
              )}
              onChange={(selectedOptions) =>
                setFieldValue(
                  "tags",
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : []
                )
              }
            />

            <small className="text-muted d-block mb-3">
              You can always add more tags in{" "}
              <Link to="/manage-tags">Manage Tags</Link>.
            </small>
          </>
        )}

        {touched.tags && errors.tags && (
          <div className="text-danger">{errors.tags}</div>
        )}

        {serverError && (
          <div className="alert alert-danger" role="alert">
            {serverError}
          </div>
        )}

        <FormButtons onReset={resetForm} disabled={!isValid} />
      </form>
    </div>
  );
}

export default CreateArticle;
