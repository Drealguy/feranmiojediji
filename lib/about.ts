// Content for the About page (/about). Everything here is placeholder-friendly:
// sections show tidy "coming soon" states until real content is added.

export interface GalleryPhoto {
  /** Image in /public. Leave out to show an empty polaroid frame. */
  src?: string;
  caption: string;
  /** Portrait (3:4), square or landscape (4:3) frame. */
  shape?: "portrait" | "square" | "landscape";
}

// TODO (Feranmi): add your photos to /public/about and list them here.
export const gallery: GalleryPhoto[] = [
  { src: "/feranmi.jpg", caption: "Me, on a good day", shape: "portrait" },
  { caption: "At the desk", shape: "landscape" },
  { caption: "Behind the scenes", shape: "square" },
  { caption: "With the team", shape: "landscape" },
  { caption: "Off the clock", shape: "portrait" },
  { caption: "Somewhere new", shape: "square" },
];

/**
 * Spotify playlist shown in "On repeat". Paste the playlist link from Spotify
 * (Share → Copy link to playlist), e.g. "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M".
 * Leave empty to show the "coming soon" record instead.
 */

export const spotifyPlaylistUrl = "https://open.spotify.com/playlist/5Sr96NoqHpl0gDPlrzWlF4";

export const playlistNote = "The soundtrack to late-night builds, deep work and shipping things.";

export interface Award {
  title: string;
  /** Who gave or issued it, e.g. "Google", "Meta", "Coursera". */
  issuer: string;
  year: string;
  kind: "Award" | "Certification";
  /** Link to the credential or announcement. */
  href?: string;
}

// TODO (Feranmi): replace these placeholders with your real awards and certifications.
// Placeholder entries (issuer "Issuer name") are hidden on the live page.
export const awards: Award[] = [
  { title: "Certification name", issuer: "Issuer name", year: "2026", kind: "Certification" },
  { title: "Award name", issuer: "Issuer name", year: "2025", kind: "Award" },
];

/** Turns a Spotify playlist link into its embed URL, or null if it isn't one. */
export function spotifyEmbedUrl(url: string) {
  const match = url.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0` : null;
}
