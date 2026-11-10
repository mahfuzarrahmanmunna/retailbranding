import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl">We couldn’t find that page</h1>
      <p className="mt-3 text-muted">It may have moved. Try browsing our products or get in touch.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="btn btn-primary">Explore Products</Link>
        <Link href="/contact" className="btn btn-outline">Contact us</Link>
      </div>
    </div>
  );
}
