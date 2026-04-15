import { groq } from "next-sanity";

export const homePageQuery = groq`*[_type == "homePage"][0]{
  badgeText,
  headline,
  headlineAccent,
  headlineSuffix,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  "heroImage": heroImage.asset->url,
  stats,
  videoUrl,
  "videoThumbnail": videoThumbnail.asset->url,
  videoLabel
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  number,
  title,
  description,
  tags
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  description,
  tags,
  accentColor,
  "coverImage": coverImage.asset->url,
  featured,
  liveUrl
}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  description,
  tags,
  accentColor,
  "coverImage": coverImage.asset->url
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  name,
  role,
  company,
  initials,
  accentColor,
  "avatar": avatar.asset->url
}`;

export const faqQuery = groq`*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer
}`;

export const coursesQuery = groq`*[_type == "course"] | order(order asc){
  _id,
  title,
  category,
  level,
  description,
  "coverImage": coverImage.asset->url,
  duration,
  lessons,
  price,
  topics,
  accentColor,
  purchaseUrl,
  available
}`;

export const pricingQuery = groq`*[_type == "pricingPlan"] | order(order asc){
  _id,
  name,
  tagline,
  price,
  priceNGN,
  featured,
  accentColor,
  features,
  notIncluded
}`;

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  category,
  tags
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  category,
  tags,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  seoTitle,
  seoDescription
}`;

export const postSlugsQuery = groq`*[_type == "post"]{ "slug": slug.current }`;

export const aboutQuery = groq`*[_type == "about"][0]{
  headline,
  headlineAccent,
  headlineSuffix,
  bio,
  "photo": photo.asset->url,
  timeline,
  tools,
  ctaText,
  ctaSubtext
}`;
