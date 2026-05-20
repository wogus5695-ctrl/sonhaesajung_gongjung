import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps) {
  permanentRedirect(`/?k=${encodeURIComponent(params.slug)}`);
}

export default function Page({ params }: PageProps) {
  permanentRedirect(`/?k=${encodeURIComponent(params.slug)}`);
}
