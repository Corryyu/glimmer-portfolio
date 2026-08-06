import { useEffect } from "react";
import { pageMeta, defaultMeta, type PageMeta, type PageMetaKey } from "@/config/seo";

/** 动态设置 document.title 与 meta description。 */
export function useDocumentTitle(key: PageMetaKey | PageMeta): void {
  useEffect(() => {
    const meta: PageMeta = typeof key === "string" ? (pageMeta[key] ?? defaultMeta) : key;
    document.title = meta.title;
    const tag =
      document.querySelector('meta[name="description"]') ??
      document.createElement("meta");
    tag.setAttribute("name", "description");
    tag.setAttribute("content", meta.description);
    if (!tag.parentElement) document.head.appendChild(tag);
  }, [key]);
}
