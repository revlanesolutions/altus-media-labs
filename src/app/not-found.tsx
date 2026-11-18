import Link from "next/link";
export default function NotFound() {
  return (
    <section className="site-section">
      <div className="site-container">
        <span className="text-eyebrow mb-5">404 / Page not found</span>
        <h1 className="heading-display">
          Let's get you back
          <br />
          on track.
        </h1>
        <p className="text-lead mt-6">
          This page may have moved, or the address may be incorrect.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="button button-primary" href="/">
            Back to home
          </Link>
          <Link className="button button-secondary" href="/work">
            Explore our work
          </Link>
        </div>
      </div>
    </section>
  );
}
