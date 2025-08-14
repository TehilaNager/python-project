function FormButtons() {
  return (
    <div>
      <div
        style={{ gridTemplateColumns: "1fr 1fr" }}
        className="d-grid gap-3 mt-2"
      >
        <button
          type="button"
          className="btn-Cancel p-1 text-danger border border-danger rounded-1"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-refresh bi bi-arrow-clockwise p-1 text-primary border border-primary rounded-1"
        ></button>
      </div>

      <button
        type="submit"
        className="btn w-100 my-3 border-0 p-3 rounded-1 bg-dark text-white"
        style={{ fontSize: "1.2rem" }}
      >
        Submit
      </button>
    </div>
  );
}

export default FormButtons;
