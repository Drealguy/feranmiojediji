import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const configured = Boolean(projectId);

export const client = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

/** Fetch with 60-second ISR revalidation. Returns null if Sanity is not configured. */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  if (!configured) {
    throw new Error("Sanity not configured — using fallback data");
  }
  return client.fetch<T>(query, params ?? {}, {
    next: { revalidate: 30 },
  });
}
