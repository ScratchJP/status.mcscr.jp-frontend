import { IncidentMetadata } from '@/utils/incident';
import { incidentList } from '@/lib/incident-list';

export const runtime = 'edge';

async function fetchIncidents(getOlder: boolean = false) {
  try {
    const incidents = await Promise.all(incidentList.map(async incident => {
      const { default: Post, frontmatter: metadata } = await import(`@/../content/incidents/${incident}`);

      return {
        ...metadata,
        time: new Date(metadata.time),
        id: incident.replace(/\.mdx?$/, ''),
      } as IncidentMetadata;
    }));

    if (getOlder) return incidents;

    return incidents.filter(incident =>
      incident.time.getTime() >= new Date().getTime() - 30 * 24 * 60 * 60 * 1e3
    );
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
  }
}

export async function GET(request: Request) {
  const searchParams = new URLSearchParams(new URL(request.url).search);

  const list = await fetchIncidents(searchParams.has('all'));

  return new Response(JSON.stringify(list), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })

}