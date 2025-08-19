import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import FormButtons from "../components/common/formButtons";
import registerSchema from "../schemas/registerSchema";
import { successFeedback, errorFeedback } from "../helpers/feedback";
import { useAuth } from "../context/authContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isValid,
    setErrors,
    resetForm,
    setSubmitting,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const schema = registerSchema();
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
        await register(values);
        successFeedback(`Registration successful. Welcome ${values.username}!`);
        resetForm();
        navigate("/");
      } catch (err) {
        errorFeedback("Oops");
        const data = err.response?.data || {};
        const serverErrors = {};

        if (data.username) serverErrors.username = data.username;
        if (data.email) serverErrors.email = data.email;
        if (data.password) serverErrors.password = data.password;

        if (
          !data?.username &&
          !data?.email &&
          !data?.password &&
          data?.message
        ) {
          setServerError(data.message);
        } else if (!data?.username && !data?.email && !data?.password) {
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

  return (
    <div className="container col-11 col-md-7">
      <PageHeader title="Register" classTitle="my-5 text-center fw-bold" />

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div
          style={{ gridTemplateColumns: "1fr 1fr" }}
          className="d-grid gap-3"
        >
          <Input
            label="User Name"
            type="text"
            placeholder="Tehila Nagar"
            required
            {...getFieldProps("username")}
            error={touched.username && errors.username}
          />

          <Input
            label="Email"
            type="email"
            placeholder="tehila@gmail.com"
            required
            {...getFieldProps("email")}
            error={touched.email && errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="AAAaaa111@"
            required
            {...getFieldProps("password")}
            error={touched.password && errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="AAAaaa111@"
            required
            {...getFieldProps("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword}
          />
        </div>

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

export default Register;
