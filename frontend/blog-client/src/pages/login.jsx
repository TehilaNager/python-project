import { useNavigate } from "react-router";
import { useFormik } from "formik";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import FormButtons from "../components/common/formButtons";
import loginSchema from "../schemas/loginSchema";
import { successFeedback, errorFeedback } from "../helpers/feedback";
import { useState } from "react";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    getFieldProps,
    resetForm,
    setSubmitting,
    setErrors,
    touched,
    errors,
    isValid,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const schema = loginSchema();
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
        await login(values);
        successFeedback(`Login successful. Welcome ${values.username}!`);
        resetForm();
        navigate("/");
      } catch (err) {
        errorFeedback("Oops");
        const responseGeneral = err.response.data.detail;
        const data = err.response?.data || {};
        const serverErrors = {};

        if (data.username) serverErrors.username = data.username;
        if (data.password) serverErrors.password = data.password;

        setServerError(responseGeneral);
        setErrors(serverErrors);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container col-10 col-md-4">
      <PageHeader title="Login" classTitle="my-5 text-center fw-bold" />

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="d-grid form-login">
          <Input
            label="User Name"
            type="text"
            placeholder="Tehila Nagar"
            required
            {...getFieldProps("username")}
            error={touched.username && errors.username}
          />

          <Input
            label="Password"
            type="password"
            placeholder="AAAaaa111@"
            required
            {...getFieldProps("password")}
            error={touched.password && errors.password}
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

export default Login;
