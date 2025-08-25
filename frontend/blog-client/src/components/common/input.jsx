function Input({ label, error, type = "text", ...rest }) {
  return (
    <div className="form-floating mb-3">
      {type === "textarea" ? (
        <textarea
          style={{ resize: "none", height: "200px" }}
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={rest.name}
          placeholder={rest.name}
          {...rest}
        />
      ) : (
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={rest.name}
          placeholder={rest.name}
          {...rest}
        />
      )}
      <label htmlFor={rest.name}>
        {rest.required ? <span className="text-danger">* </span> : null}
        {label}
      </label>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default Input;
