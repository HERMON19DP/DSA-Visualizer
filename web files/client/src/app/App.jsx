import { Link, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">DSA LEARNER</p>
      <h1>Understand algorithms, one step at a time.</h1>
      <p className="intro">
        The React application scaffold is ready. Existing pages and visualizers
        will be migrated into this app incrementally.
      </p>
      <Link className="text-link" to="/algorithms">Explore algorithms (coming soon)</Link>
    </main>
  );
}

function AlgorithmsPage() {
  return (
    <main className="page-shell">
      <Link className="text-link" to="/">← Home</Link>
      <h1>Algorithms</h1>
      <p className="intro">The existing algorithm catalogue will be connected in a later migration phase.</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/algorithms" element={<AlgorithmsPage />} />
      <Route path="*" element={<main className="page-shell"><h1>Page not found</h1><Link className="text-link" to="/">Return home</Link></main>} />
    </Routes>
  );
}
