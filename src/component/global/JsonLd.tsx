import { jsonLdString } from "@/utils/schema";

// Renders one JSON-LD block; jsonLdString escapes anything that could close the tag.
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
