import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import authorData from "@/data/authors";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDate } from "@/utils/date";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, frontmatter: metadata } = await import(`@/../content/incidents/${decodeURIComponent(slug)}.mdx`)
 
  return (
    <>
      <section className="my-4 text-center">
        <div className="text-4xl sm:text-6xl font-semibold py-4">
          { metadata.title }
        </div>

        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span>
            Reported by
          </span>

          <AvatarGroup>
            { metadata.author.map((author: string) => (
              <Avatar key={author}>
                <AvatarImage src={authorData.find(i => i.name === author)?.avatar} />
                <AvatarFallback>
                  {author}
                </AvatarFallback>
              </Avatar>
            )) }
          </AvatarGroup>

          <span>
            { metadata.author.length === 1 ? metadata.author[0]
              : metadata.author.length === 2 ? `${metadata.author[0]} and ${metadata.author[1]}`
              : <>
                {metadata.author[0]} and <Tooltip>
                  <TooltipTrigger>
                    {metadata.author.length - 1} more
                  </TooltipTrigger>  
                  <TooltipContent>
                    {metadata.author.slice(1).join(', ')}
                  </TooltipContent>
                </Tooltip>
              </>
            } at {formatDate(new Date(metadata.time), {
              withSeconds: false
            })}
          </span>
        </div>
      </section>

      <Separator />

      <article className="post max-w-4xl mx-auto my-4">
        <Post />
      </article>
    </>
  );
}

export const dynamicParams = false;