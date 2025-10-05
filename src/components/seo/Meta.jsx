import { useEffect } from "react";

function upsertMetaByName(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(prop, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", prop);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Meta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  canonical,
  noIndex = false,
}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMetaByName("description", description);

    // open graph
    upsertMetaByProperty("og:title", ogTitle || title);
    upsertMetaByProperty("og:description", ogDescription || description);
    upsertMetaByProperty("og:type", ogType);
    if (ogImage) upsertMetaByProperty("og:image", ogImage);

    // canonical
    let canonicalHref = undefined;
    if (canonical === "auto" || canonical === true) {
      canonicalHref = window.location.href;
    } else if (typeof canonical === "string") {
      canonicalHref = canonical;
    }
    if (canonicalHref) upsertLink("canonical", canonicalHref);

    // robots
    if (noIndex) {
      upsertMetaByName("robots", "noindex, nofollow");
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.parentNode.removeChild(robots);
    }
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    canonical,
    noIndex,
  ]);

  return null;
}
