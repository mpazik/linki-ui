import type { HTMLElementsAttributes } from "./html-types";
import type { DirtyJsonMl } from "./jsonml";
import { mapDirtyJsonMl } from "./jsonml";

export type HtmlTag = keyof HTMLElementsAttributes;

export type JsonHtml = DirtyJsonMl;
export type { HTMLElementsAttributes } from "./html-types";

export const mapJsonHtml = mapDirtyJsonMl;

type TagProps<T extends HtmlTag = HtmlTag> =
  | [HTMLElementsAttributes[T], ...JsonHtml[]]
  | [...JsonHtml[]];

export type JsonHtmlTagFactory<T extends HtmlTag> = (
  ...props: TagProps<T>
) => JsonHtml;

export const newTagFactory = <T extends HtmlTag>(
  tag: T
): JsonHtmlTagFactory<T> => (
  ...props: [HTMLElementsAttributes[T], ...JsonHtml[]] | [...JsonHtml[]]
): JsonHtml => [tag, ...props] as JsonHtml;

export const a: JsonHtmlTagFactory<"a"> = newTagFactory("a");
export const abbr: JsonHtmlTagFactory<"abbr"> = newTagFactory("abbr");
export const address: JsonHtmlTagFactory<"address"> = newTagFactory("address");
export const area: JsonHtmlTagFactory<"area"> = newTagFactory("area");
export const article: JsonHtmlTagFactory<"article"> = newTagFactory("article");
export const aside: JsonHtmlTagFactory<"aside"> = newTagFactory("aside");
export const audio: JsonHtmlTagFactory<"audio"> = newTagFactory("audio");
export const b: JsonHtmlTagFactory<"b"> = newTagFactory("b");
export const base: JsonHtmlTagFactory<"base"> = newTagFactory("base");
export const bdi: JsonHtmlTagFactory<"bdi"> = newTagFactory("bdi");
export const bdo: JsonHtmlTagFactory<"bdo"> = newTagFactory("bdo");
export const blockquote: JsonHtmlTagFactory<"blockquote"> = newTagFactory(
  "blockquote"
);
export const body: JsonHtmlTagFactory<"body"> = newTagFactory("body");
export const br: JsonHtmlTagFactory<"br"> = newTagFactory("br");
export const button: JsonHtmlTagFactory<"button"> = newTagFactory("button");
export const canvas: JsonHtmlTagFactory<"canvas"> = newTagFactory("canvas");
export const caption: JsonHtmlTagFactory<"caption"> = newTagFactory("caption");
export const cite: JsonHtmlTagFactory<"cite"> = newTagFactory("cite");
export const code: JsonHtmlTagFactory<"code"> = newTagFactory("code");
export const col: JsonHtmlTagFactory<"col"> = newTagFactory("col");
export const colgroup: JsonHtmlTagFactory<"colgroup"> = newTagFactory(
  "colgroup"
);
export const data: JsonHtmlTagFactory<"data"> = newTagFactory("data");
export const datalist: JsonHtmlTagFactory<"datalist"> = newTagFactory(
  "datalist"
);
export const dd: JsonHtmlTagFactory<"dd"> = newTagFactory("dd");
export const del: JsonHtmlTagFactory<"del"> = newTagFactory("del");
export const details: JsonHtmlTagFactory<"details"> = newTagFactory("details");
export const dfn: JsonHtmlTagFactory<"dfn"> = newTagFactory("dfn");
export const dialog: JsonHtmlTagFactory<"dialog"> = newTagFactory("dialog");
export const dir: JsonHtmlTagFactory<"dir"> = newTagFactory("dir");
export const div: JsonHtmlTagFactory<"div"> = newTagFactory("div");
export const dl: JsonHtmlTagFactory<"dl"> = newTagFactory("dl");
export const dt: JsonHtmlTagFactory<"dt"> = newTagFactory("dt");
export const em: JsonHtmlTagFactory<"em"> = newTagFactory("em");
export const embed: JsonHtmlTagFactory<"embed"> = newTagFactory("embed");
export const fieldset: JsonHtmlTagFactory<"fieldset"> = newTagFactory(
  "fieldset"
);
export const figcaption: JsonHtmlTagFactory<"figcaption"> = newTagFactory(
  "figcaption"
);
export const figure: JsonHtmlTagFactory<"figure"> = newTagFactory("figure");
export const font: JsonHtmlTagFactory<"font"> = newTagFactory("font");
export const footer: JsonHtmlTagFactory<"footer"> = newTagFactory("footer");
export const form: JsonHtmlTagFactory<"form"> = newTagFactory("form");
export const h1: JsonHtmlTagFactory<"h1"> = newTagFactory("h1");
export const h2: JsonHtmlTagFactory<"h2"> = newTagFactory("h2");
export const h3: JsonHtmlTagFactory<"h3"> = newTagFactory("h3");
export const h4: JsonHtmlTagFactory<"h4"> = newTagFactory("h4");
export const h5: JsonHtmlTagFactory<"h5"> = newTagFactory("h5");
export const h6: JsonHtmlTagFactory<"h6"> = newTagFactory("h6");
export const head: JsonHtmlTagFactory<"head"> = newTagFactory("head");
export const header: JsonHtmlTagFactory<"header"> = newTagFactory("header");
export const hgroup: JsonHtmlTagFactory<"hgroup"> = newTagFactory("hgroup");
export const html: JsonHtmlTagFactory<"html"> = newTagFactory("html");
export const i: JsonHtmlTagFactory<"i"> = newTagFactory("i");
export const iframe: JsonHtmlTagFactory<"iframe"> = newTagFactory("iframe");
export const img: JsonHtmlTagFactory<"img"> = newTagFactory("img");
export const input: JsonHtmlTagFactory<"input"> = newTagFactory("input");
export const ins: JsonHtmlTagFactory<"ins"> = newTagFactory("ins");
export const kbd: JsonHtmlTagFactory<"kbd"> = newTagFactory("kbd");
export const label: JsonHtmlTagFactory<"label"> = newTagFactory("label");
export const legend: JsonHtmlTagFactory<"legend"> = newTagFactory("legend");
export const li: JsonHtmlTagFactory<"li"> = newTagFactory("li");
export const link: JsonHtmlTagFactory<"link"> = newTagFactory("link");
export const main: JsonHtmlTagFactory<"main"> = newTagFactory("main");
export const map: JsonHtmlTagFactory<"map"> = newTagFactory("map");
export const mark: JsonHtmlTagFactory<"mark"> = newTagFactory("mark");
export const meta: JsonHtmlTagFactory<"meta"> = newTagFactory("meta");
export const meter: JsonHtmlTagFactory<"meter"> = newTagFactory("meter");
export const nav: JsonHtmlTagFactory<"nav"> = newTagFactory("nav");
export const noscript: JsonHtmlTagFactory<"noscript"> = newTagFactory(
  "noscript"
);
export const object: JsonHtmlTagFactory<"object"> = newTagFactory("object");
export const ol: JsonHtmlTagFactory<"ol"> = newTagFactory("ol");
export const optgroup: JsonHtmlTagFactory<"optgroup"> = newTagFactory(
  "optgroup"
);
export const option: JsonHtmlTagFactory<"option"> = newTagFactory("option");
export const output: JsonHtmlTagFactory<"output"> = newTagFactory("output");
export const p: JsonHtmlTagFactory<"p"> = newTagFactory("p");
export const param: JsonHtmlTagFactory<"param"> = newTagFactory("param");
export const picture: JsonHtmlTagFactory<"picture"> = newTagFactory("picture");
export const pre: JsonHtmlTagFactory<"pre"> = newTagFactory("pre");
export const progress: JsonHtmlTagFactory<"progress"> = newTagFactory(
  "progress"
);
export const q: JsonHtmlTagFactory<"q"> = newTagFactory("q");
export const rp: JsonHtmlTagFactory<"rp"> = newTagFactory("rp");
export const rt: JsonHtmlTagFactory<"rt"> = newTagFactory("rt");
export const ruby: JsonHtmlTagFactory<"ruby"> = newTagFactory("ruby");
export const s: JsonHtmlTagFactory<"s"> = newTagFactory("s");
export const samp: JsonHtmlTagFactory<"samp"> = newTagFactory("samp");
export const script: JsonHtmlTagFactory<"script"> = newTagFactory("script");
export const section: JsonHtmlTagFactory<"section"> = newTagFactory("section");
export const select: JsonHtmlTagFactory<"select"> = newTagFactory("select");
export const slot: JsonHtmlTagFactory<"slot"> = newTagFactory("slot");
export const small: JsonHtmlTagFactory<"small"> = newTagFactory("small");
export const source: JsonHtmlTagFactory<"source"> = newTagFactory("source");
export const span: JsonHtmlTagFactory<"span"> = newTagFactory("span");
export const strong: JsonHtmlTagFactory<"strong"> = newTagFactory("strong");
export const style: JsonHtmlTagFactory<"style"> = newTagFactory("style");
export const sub: JsonHtmlTagFactory<"sub"> = newTagFactory("sub");
export const summary: JsonHtmlTagFactory<"summary"> = newTagFactory("summary");
export const sup: JsonHtmlTagFactory<"sup"> = newTagFactory("sup");
export const table: JsonHtmlTagFactory<"table"> = newTagFactory("table");
export const tbody: JsonHtmlTagFactory<"tbody"> = newTagFactory("tbody");
export const td: JsonHtmlTagFactory<"td"> = newTagFactory("td");
export const template: JsonHtmlTagFactory<"template"> = newTagFactory(
  "template"
);
export const textarea: JsonHtmlTagFactory<"textarea"> = newTagFactory(
  "textarea"
);
export const tfoot: JsonHtmlTagFactory<"tfoot"> = newTagFactory("tfoot");
export const th: JsonHtmlTagFactory<"th"> = newTagFactory("th");
export const thead: JsonHtmlTagFactory<"thead"> = newTagFactory("thead");
export const time: JsonHtmlTagFactory<"time"> = newTagFactory("time");
export const title: JsonHtmlTagFactory<"title"> = newTagFactory("title");
export const tr: JsonHtmlTagFactory<"tr"> = newTagFactory("tr");
export const track: JsonHtmlTagFactory<"track"> = newTagFactory("track");
export const u: JsonHtmlTagFactory<"u"> = newTagFactory("u");
export const ul: JsonHtmlTagFactory<"ul"> = newTagFactory("ul");
export const varTag: JsonHtmlTagFactory<"var"> = newTagFactory("var");
export const video: JsonHtmlTagFactory<"video"> = newTagFactory("video");
export const wbr: JsonHtmlTagFactory<"wbr"> = newTagFactory("wbr");
