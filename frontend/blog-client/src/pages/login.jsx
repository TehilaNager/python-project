import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import FormButtons from "../components/common/formButtons";

function Login() {
  return (
    <div className="container col-10 col-md-4">
      <PageHeader title="Login" classTitle="my-5 text-center fw-bold" />

      <form>
        <div className="d-grid gap-4 mb-5">
          <Input
            label="User Name"
            type="text"
            placeholder="Tehila Nagar"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="AAAaaa111@"
            required
          />
        </div>

        <FormButtons />
      </form>
    </div>
  );
}

export default Login;
