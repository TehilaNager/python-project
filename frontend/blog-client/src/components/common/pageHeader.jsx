function PageHeader({ title, classTitle }) {
  return (
    <div className="container">
      <h1 className={classTitle}>{title}</h1>
    </div>
  );
}

export default PageHeader;
