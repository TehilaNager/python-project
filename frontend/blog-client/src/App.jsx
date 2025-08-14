import AppRoutes from "./routes/appRoutes";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <header>
        <Navbar />
      </header>
      <main
        className="flex-fill pb-5"
        style={{ backgroundColor: "rgba(238, 240, 240, 1)" }}
      >
        <AppRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
