import { Separator } from "@/components/ui/separator";
import IncidentHeader from "@/components/incidentHeader";

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await params
  
      // fetch incident information
      const { frontmatter: metadata } = await import(`@/../content/incidents/${decodeURIComponent(slug)}.mdx`)

    if (!metadata) return {}

    const reporters = metadata.author.length === 1 ? metadata.author[0]
      : metadata.author.length === 2 ? `${metadata.author[0]} and ${metadata.author[1]}`
      : `${metadata.author[0]} and ${metadata.author.length - 1} more`;
  
    return {
      title: `${metadata.title} - ScJPMC Status`,
      description: `Reported by ${reporters}`,
    }
  } catch (err) {
    return {};
  }
}

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