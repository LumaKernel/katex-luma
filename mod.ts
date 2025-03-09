// deno-lint-ignore-file no-explicit-any
import katex from "katex";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import { removePosition } from "unist-util-remove-position";
import { toHtml } from "hast-util-to-html";
import { unified } from "unified";
import rehypeParse from "rehype-parse";

const parseHtml = unified().use(rehypeParse, { fragment: true });

export function katexLumaRenderToString(
  ...args: Parameters<typeof katex.renderToString>
): string {
  const result = katex.renderToString(...args);
  const html = parseHtml.parse(result);
  removePosition(html, { force: true });
  visit(
    html,
    () => true,
    (htmlElem: any) => {
      if (
        htmlElem?.children?.length === 2 &&
        htmlElem.children[0].properties?.className?.[0] === "vlist-r" &&
        htmlElem.children[1].properties?.className?.[0] === "vlist-r"
      ) {
        htmlElem.children.pop();
      }
    },
  );
  visit(
    html,
    () => true,
    (htmlElem: any) => {
      const dataLoad = htmlElem?.properties?.dataLoad;
      if (typeof dataLoad !== "string") return;
      htmlElem.type = "element";
      htmlElem.tagName = "Load";
      htmlElem.properties = {
        w: dataLoad,
      };
    },
  );
  remove(html, (htmlElem: any) => {
    if (htmlElem?.type !== "element") return false;
    if (htmlElem?.tagName !== "annotation") return false;
    if (htmlElem.properties?.encoding !== "application/x-tex") return false;
    return true;
  });

  return toHtml(html);
}
