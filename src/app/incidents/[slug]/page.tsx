import { Separator } from "@/components/ui/separator";
import IncidentHeader from "@/components/incidentHeader";

export const runtime = 'edge';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, frontmatter: metadata } = await import(`@/../content/incidents/${decodeURIComponent(slug)}.mdx`)
 
  return (
    <>
      <IncidentHeader metadata={metadata} />

      <Separator />

      <article className="post max-w-4xl mx-auto my-4">
        <Post />
      </article>
    </>
  );
}

export const dynamicParams = false;