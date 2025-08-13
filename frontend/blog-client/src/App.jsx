import Navbar from "./components/navbar";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <header>
        <Navbar />
      </header>
      <main className="flex-fill pb-5">Main</main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
