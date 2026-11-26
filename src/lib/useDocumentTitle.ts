import { useEffect } from "react";
import { pageMeta, defaultMeta, type PageMeta, type PageMetaKey } from "@/config/seo";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** 动态设置 document.title、meta description 与 Open Graph 标签。 */
export function useDocumentTitle(key: PageMetaKey | PageMeta): void {
  useEffect(() => {
    const meta: PageMeta = typeof key === "string" ? (pageMeta[key] ?? defaultMeta) : key;
    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
  }, [key]);
}
