import { IncidentMetadata } from '@/utils/incident';
import * as fs from 'node:fs';
import path from "node:path";

async function fetchIncidents(getOlder: boolean = false) {
  try {
    const incidentsPath = path.join(process.cwd(), 'content', 'incidents');
    const incidentList = fs.readdirSync(incidentsPath, 'utf-8');

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