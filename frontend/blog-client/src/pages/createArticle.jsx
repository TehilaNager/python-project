import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import FormButtons from "../components/common/formButtons";
import { useTag } from "../context/tagContext";
import { useFormik } from "formik";

function CreateArticle() {
  const { tags } = useTag();

  const { handleSubmit, getFieldProps, resetForm, isValid, touched, errors } =
    useFormik({
      initialValues: {
        title: "",
        text: "",
        status: "draft",
        tags: [],
      },
      onSubmit: (values) => {
        console.log("Form values:", values);
      },
    });

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
        <select
          id="status"
          {...getFieldProps("status")}
          className="px-3 py-2 rounded-3 mb-4 border-0"
          style={{ width: "100%" }}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        {touched.status && errors.status && (
          <div className="text-danger">{errors.status}</div>
        )}

        <label htmlFor="tags" className="px-2 mb-2 text-secondary">
          Tags:
        </label>
        <select
          id="tags"
          multiple
          className="px-3 py-2 rounded-3 mb-4 border-0"
          style={{ width: "100%", height: "auto" }}
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        {touched.tags && errors.tags && (
          <div className="text-danger">{errors.tags}</div>
        )}
      </form>
      <FormButtons onReset={resetForm} disabled={!isValid} />
    </div>
  );
}

export default CreateArticle;
