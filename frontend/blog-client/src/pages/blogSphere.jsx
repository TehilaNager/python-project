import PageHeader from "../components/common/pageHeader";
import Card from "../components/card";

function BlogSphere() {
  return (
    <div className="container">
      <PageHeader title="All Articles" classTitle="my-5 text-left fw-bold" />

      <div className="d-flex justify-content-evenly flex-wrap">
        <Card />
      </div>
    </div>
  );
}

export default BlogSphere;
