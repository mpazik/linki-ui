/**
 * EVENT HANDLERS
 */

type EventHandler<E extends Event = Event> = (event: E) => void;
type ClipboardEventHandler = EventHandler<ClipboardEvent>;
type CompositionEventHandler = EventHandler<CompositionEvent>;
type DragEventHandler = EventHandler<DragEvent>;
type ErrorEventHandler = EventHandler<ErrorEvent>;
type FocusEventHandler = EventHandler<FocusEvent>;
type KeyboardEventHandler = EventHandler<KeyboardEvent>;
type InputEventHandler = EventHandler<InputEvent>;
type MediaEncryptedEventHandler = EventHandler<MediaEncryptedEvent>;
type MouseEventHandler = EventHandler<MouseEvent>;
type TouchEventHandler = EventHandler<TouchEvent>;
type PointerEventHandler = EventHandler<PointerEvent>;
type ProgressEventHandler = EventHandler<ProgressEvent>;
type UIEventHandler = EventHandler<UIEvent>;
type WheelEventHandler = EventHandler<WheelEvent>;
type AnimationEventHandler = EventHandler<AnimationEvent>;
type SecurityPolicyViolationEventHandler = EventHandler<SecurityPolicyViolationEvent>;
type TransitionEventHandler = EventHandler<TransitionEvent>;

interface GlobalEventHandlersEventHandlers {
  onAbort?: UIEventHandler | undefined;
  onAnimationCancel?: AnimationEventHandler | undefined;
  onAnimationEnd?: AnimationEventHandler | undefined;
  onAnimationIteration?: AnimationEventHandler | undefined;
  onAnimationStart?: AnimationEventHandler | undefined;
  onAuxClick?: MouseEventHandler | undefined;
  onBeforeInput?: InputEventHandler | undefined;
  onBlur?: FocusEventHandler | undefined;
  onCancel?: EventHandler | undefined;
  onCanPlay?: EventHandler | undefined;
  onCanPlayThrough?: EventHandler | undefined;
  onChange?: EventHandler | undefined;
  onClick?: MouseEventHandler | undefined;
  onClose?: EventHandler | undefined;
  onCompositionEnd?: CompositionEventHandler | undefined;
  onCompositionStart?: CompositionEventHandler | undefined;
  onCompositionUpdate?: CompositionEventHandler | undefined;
  onContextMenu?: MouseEventHandler | undefined;
  onCueChange?: EventHandler | undefined;
  onDblClick?: MouseEventHandler | undefined;
  onDrag?: DragEventHandler | undefined;
  onDragEnd?: DragEventHandler | undefined;
  onDragEnter?: DragEventHandler | undefined;
  onDragExit?: EventHandler | undefined;
  onDragLeave?: DragEventHandler | undefined;
  onDragOver?: DragEventHandler | undefined;
  onDragStart?: DragEventHandler | undefined;
  onDrop?: DragEventHandler | undefined;
  onDurationChange?: EventHandler | undefined;
  onEmptied?: EventHandler | undefined;
  onEnded?: EventHandler | undefined;
  onError?: ErrorEventHandler | undefined;
  onFocus?: FocusEventHandler | undefined;
  onFocusIn?: FocusEventHandler | undefined;
  onFocusOut?: FocusEventHandler | undefined;
  onGotpointercapture?: PointerEventHandler | undefined;
  onInput?: EventHandler | undefined;
  onInvalid?: EventHandler | undefined;
  onKeyDown?: KeyboardEventHandler | undefined;
  onKeyPress?: KeyboardEventHandler | undefined;
  onKeyUp?: KeyboardEventHandler | undefined;
  onLoad?: EventHandler | undefined;
  onLoadedData?: EventHandler | undefined;
  onLoadedMetadata?: EventHandler | undefined;
  onLoadStart?: EventHandler | undefined;
  onLostPointerCapture?: PointerEventHandler | undefined;
  onMouseDown?: MouseEventHandler | undefined;
  onMouseEnter?: MouseEventHandler | undefined;
  onMouseLeave?: MouseEventHandler | undefined;
  onMouseMove?: MouseEventHandler | undefined;
  onMouseOut?: MouseEventHandler | undefined;
  onMouseOver?: MouseEventHandler | undefined;
  onMouseUp?: MouseEventHandler | undefined;
  onPause?: EventHandler | undefined;
  onPlay?: EventHandler | undefined;
  onPlaying?: EventHandler | undefined;
  onPointerCancel?: PointerEventHandler | undefined;
  onPointerDown?: PointerEventHandler | undefined;
  onPointerEnter?: PointerEventHandler | undefined;
  onPointerLeave?: PointerEventHandler | undefined;
  onPointerMove?: PointerEventHandler | undefined;
  onPointerOut?: PointerEventHandler | undefined;
  onPointerOver?: PointerEventHandler | undefined;
  onPointerUp?: PointerEventHandler | undefined;
  onProgress?: ProgressEventHandler | undefined;
  onRateChange?: EventHandler | undefined;
  onReset?: EventHandler | undefined;
  onResize?: UIEventHandler | undefined;
  onScroll?: EventHandler | undefined;
  onSecurityPolicyViolation?: SecurityPolicyViolationEventHandler | undefined;
  onSeeked?: EventHandler | undefined;
  onSeeking?: EventHandler | undefined;
  onSelect?: EventHandler | undefined;
  onSelectionChange?: EventHandler | undefined;
  onSelectStart?: EventHandler | undefined;
  onStalled?: EventHandler | undefined;
  onSubmit?: EventHandler | undefined;
  onSuspEnd?: EventHandler | undefined;
  onTimeUpdate?: EventHandler | undefined;
  onToggle?: EventHandler | undefined;
  onTouchCancel?: TouchEventHandler | undefined;
  onTouchEnd?: TouchEventHandler | undefined;
  onTouchMove?: TouchEventHandler | undefined;
  onTouchStart?: TouchEventHandler | undefined;
  onTransitionCancel?: TransitionEventHandler | undefined;
  onTransitionEnd?: TransitionEventHandler | undefined;
  onTransitionRun?: TransitionEventHandler | undefined;
  onTransitionStart?: TransitionEventHandler | undefined;
  onVolumeChange?: EventHandler | undefined;
  onWaiting?: EventHandler | undefined;
  onWheel?: WheelEventHandler | undefined;
}

interface ElementEventHandlers {
  onFullScreenChange?: EventHandler | undefined;
  onFullScreenError?: EventHandler | undefined;
}
interface DocumentAndElementEventHandlersEventHandlers {
  onCopy?: ClipboardEventHandler | undefined;
  onCut?: ClipboardEventHandler | undefined;
  onCaste?: ClipboardEventHandler | undefined;
}

interface HTMLMediaElementEventHandlers {
  onEncrypted?: MediaEncryptedEventHandler | undefined;
  onWaitingforkey?: EventHandler | undefined;
}

interface HtmlElementEventHandlers
  extends GlobalEventHandlersEventHandlers,
    ElementEventHandlers,
    DocumentAndElementEventHandlersEventHandlers {}

/**
 * Element attributes
 */
interface ElementAttributes {
  class?: string | undefined;
  id?: string | undefined;
  scrollLeft?: number | undefined;
  scrollTop?: number | undefined;
  slot?: string | undefined;
}
interface HTMLOrSVGElementAttributes {
  autofocus?: boolean | unknown;
  nonce?: string | unknown;
  tabIndex?: number | unknown;
}
interface ElementContentEditableAttributes {
  contentEditable?: string | undefined;
  enterKeyHint?: string | undefined;
  inputMode?: string | undefined;
}

interface CSSStyleDeclaration {
  alignContent: string;
  alignItems: string;
  alignSelf: string;
  alignmentBaseline: string;
  all: string;
  animation: string;
  animationDelay: string;
  animationDirection: string;
  animationDuration: string;
  animationFillMode: string;
  animationIterationCount: string;
  animationName: string;
  animationPlayState: string;
  animationTimingFunction: string;
  backfaceVisibility: string;
  background: string;
  backgroundAttachment: string;
  backgroundClip: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOrigin: string;
  backgroundPosition: string;
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundRepeat: string;
  backgroundSize: string;
  baselineShift: string;
  blockSize: string;
  border: string;
  borderBlockEnd: string;
  borderBlockEndColor: string;
  borderBlockEndStyle: string;
  borderBlockEndWidth: string;
  borderBlockStart: string;
  borderBlockStartColor: string;
  borderBlockStartStyle: string;
  borderBlockStartWidth: string;
  borderBottom: string;
  borderBottomColor: string;
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
  borderBottomStyle: string;
  borderBottomWidth: string;
  borderCollapse: string;
  borderColor: string;
  borderImage: string;
  borderImageOutset: string;
  borderImageRepeat: string;
  borderImageSlice: string;
  borderImageSource: string;
  borderImageWidth: string;
  borderInlineEnd: string;
  borderInlineEndColor: string;
  borderInlineEndStyle: string;
  borderInlineEndWidth: string;
  borderInlineStart: string;
  borderInlineStartColor: string;
  borderInlineStartStyle: string;
  borderInlineStartWidth: string;
  borderLeft: string;
  borderLeftColor: string;
  borderLeftStyle: string;
  borderLeftWidth: string;
  borderRadius: string;
  borderRight: string;
  borderRightColor: string;
  borderRightStyle: string;
  borderRightWidth: string;
  borderSpacing: string;
  borderStyle: string;
  borderTop: string;
  borderTopColor: string;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderTopStyle: string;
  borderTopWidth: string;
  borderWidth: string;
  bottom: string;
  boxShadow: string;
  boxSizing: string;
  breakAfter: string;
  breakBefore: string;
  breakInside: string;
  captionSide: string;
  caretColor: string;
  clear: string;
  clip: string;
  clipPath: string;
  clipRule: string;
  color: string;
  colorInterpolation: string;
  colorInterpolationFilters: string;
  columnCount: string;
  columnFill: string;
  columnGap: string;
  columnRule: string;
  columnRuleColor: string;
  columnRuleStyle: string;
  columnRuleWidth: string;
  columnSpan: string;
  columnWidth: string;
  columns: string;
  content: string;
  counterIncrement: string;
  counterReset: string;
  cssFloat: string;
  cssText: string;
  cursor: string;
  direction: string;
  display: string;
  dominantBaseline: string;
  emptyCells: string;
  fill: string;
  fillOpacity: string;
  fillRule: string;
  filter: string;
  flex: string;
  flexBasis: string;
  flexDirection: string;
  flexFlow: string;
  flexGrow: string;
  flexShrink: string;
  flexWrap: string;
  float: string;
  floodColor: string;
  floodOpacity: string;
  font: string;
  fontFamily: string;
  fontFeatureSettings: string;
  fontKerning: string;
  fontSize: string;
  fontSizeAdjust: string;
  fontStretch: string;
  fontStyle: string;
  fontSynthesis: string;
  fontVariant: string;
  fontVariantCaps: string;
  fontVariantEastAsian: string;
  fontVariantLigatures: string;
  fontVariantNumeric: string;
  fontVariantPosition: string;
  fontWeight: string;
  gap: string;
  glyphOrientationVertical: string;
  grid: string;
  gridArea: string;
  gridAutoColumns: string;
  gridAutoFlow: string;
  gridAutoRows: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridColumnGap: string;
  gridColumnStart: string;
  gridGap: string;
  gridRow: string;
  gridRowEnd: string;
  gridRowGap: string;
  gridRowStart: string;
  gridTemplate: string;
  gridTemplateAreas: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  height: string;
  hyphens: string;
  imageOrientation: string;
  imageRendering: string;
  inlineSize: string;
  justifyContent: string;
  justifyItems: string;
  justifySelf: string;
  left: string;
  letterSpacing: string;
  lightingColor: string;
  lineBreak: string;
  lineHeight: string;
  listStyle: string;
  listStyleImage: string;
  listStylePosition: string;
  listStyleType: string;
  margin: string;
  marginBlockEnd: string;
  marginBlockStart: string;
  marginBottom: string;
  marginInlineEnd: string;
  marginInlineStart: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marker: string;
  markerEnd: string;
  markerMid: string;
  markerStart: string;
  mask: string;
  maskComposite: string;
  maskImage: string;
  maskPosition: string;
  maskRepeat: string;
  maskSize: string;
  maskType: string;
  maxBlockSize: string;
  maxHeight: string;
  maxInlineSize: string;
  maxWidth: string;
  minBlockSize: string;
  minHeight: string;
  minInlineSize: string;
  minWidth: string;
  objectFit: string;
  objectPosition: string;
  opacity: string;
  order: string;
  orphans: string;
  outline: string;
  outlineColor: string;
  outlineOffset: string;
  outlineStyle: string;
  outlineWidth: string;
  overflow: string;
  overflowAnchor: string;
  overflowWrap: string;
  overflowX: string;
  overflowY: string;
  overscrollBehavior: string;
  overscrollBehaviorBlock: string;
  overscrollBehaviorInline: string;
  overscrollBehaviorX: string;
  overscrollBehaviorY: string;
  padding: string;
  paddingBlockEnd: string;
  paddingBlockStart: string;
  paddingBottom: string;
  paddingInlineEnd: string;
  paddingInlineStart: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  pageBreakAfter: string;
  pageBreakBefore: string;
  pageBreakInside: string;
  paintOrder: string;
  perspective: string;
  perspectiveOrigin: string;
  placeContent: string;
  placeItems: string;
  placeSelf: string;
  pointerEvents: string;
  position: string;
  quotes: string;
  resize: string;
  right: string;
  rotate: string;
  rowGap: string;
  rubyAlign: string;
  rubyPosition: string;
  scale: string;
  scrollBehavior: string;
  shapeRendering: string;
  stopColor: string;
  stopOpacity: string;
  stroke: string;
  strokeDasharray: string;
  strokeDashoffset: string;
  strokeLinecap: string;
  strokeLinejoin: string;
  strokeMiterlimit: string;
  strokeOpacity: string;
  strokeWidth: string;
  tabSize: string;
  tableLayout: string;
  textAlign: string;
  textAlignLast: string;
  textAnchor: string;
  textCombineUpright: string;
  textDecoration: string;
  textDecorationColor: string;
  textDecorationLine: string;
  textDecorationStyle: string;
  textEmphasis: string;
  textEmphasisColor: string;
  textEmphasisPosition: string;
  textEmphasisStyle: string;
  textIndent: string;
  textJustify: string;
  textOrientation: string;
  textOverflow: string;
  textRendering: string;
  textShadow: string;
  textTransform: string;
  textUnderlinePosition: string;
  top: string;
  touchAction: string;
  transform: string;
  transformBox: string;
  transformOrigin: string;
  transformStyle: string;
  transition: string;
  transitionDelay: string;
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
  translate: string;
  unicodeBidi: string;
  userSelect: string;
  verticalAlign: string;
  visibility: string;
  whiteSpace: string;
  widows: string;
  width: string;
  willChange: string;
  wordBreak: string;
  wordSpacing: string;
  wordWrap: string;
  writingMode: string;
  zIndex: string;
}

interface ElementCSSInlineStyle {
  style?: CSSStyleDeclaration | undefined;
}

/** Any HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
interface HTMLAttributes
  extends ElementAttributes,
    HTMLOrSVGElementAttributes,
    ElementContentEditableAttributes,
    HtmlElementEventHandlers,
    ElementCSSInlineStyle {
  accessKey?: string | undefined;
  autocapitalize?: string | undefined;
  dir?: string | undefined;
  draggable?: boolean | undefined;
  hidden?: boolean | undefined;
  innerText?: string | undefined;
  lang?: string | undefined;
  spellcheck?: boolean | undefined;
  title?: string | undefined;
  translate?: boolean | undefined;
}

type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

type HTMLAttributeAnchorTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | string;

interface HTMLAnchorAttributes extends HTMLAttributes {
  download?: string | undefined;
  href?: string | undefined;
  hreflang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  rel?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  text?: string | undefined;
  type?: string | undefined;
}

interface HTMLAreaAttributes extends HTMLAttributes {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: string | undefined;
  href?: string | undefined;
  hreflang?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  ping?: string | undefined;
  rel?: string | undefined;
  shape?: string | undefined;
  target?: string | undefined;
}

type HTMLAudioAttributes = HTMLMediaAttributes;

interface HTMLBaseAttributes extends HTMLAttributes {
  href?: string | undefined;
  target?: string | undefined;
}

interface HTMLBlockquoteAttributes extends HTMLAttributes {
  cite?: string | undefined;
}

type HTMLBodyAttributes = HTMLAttributes;

type HTMLBRAttributes = HTMLAttributes;

interface HTMLButtonAttributes extends HTMLAttributes {
  autoFocus?: boolean | undefined;
  disabled?: boolean | undefined;
  formAction?: string | undefined;
  formEnctype?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}

interface HTMLCanvasAttributes extends HTMLAttributes {
  height?: number | undefined;
  width?: number | undefined;
}

type HTMLTableCaptionAttributes = HTMLAttributes;

interface HTMLDataAttributes extends HTMLAttributes {
  value?: string | undefined;
}

type HTMLDataListAttributes = HTMLAttributes;

interface HTMLModAttributes extends HTMLAttributes {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface HTMLDetailsAttributes extends HTMLAttributes {
  open?: boolean | undefined;
}

interface HTMLDialogAttributes extends HTMLAttributes {
  open?: boolean | undefined;
  returnValue?: string | undefined;
}

type HTMLDirectoryAttributes = HTMLAttributes;

type HTMLDivAttributes = HTMLAttributes;

type HTMLDListAttributes = HTMLAttributes;

interface HTMLEmbedAttributes extends HTMLAttributes {
  height?: string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: string | undefined;
}

interface HTMLFieldSetAttributes extends HTMLAttributes {
  disabled?: boolean | undefined;
  name?: string | undefined;
}

interface HTMLFontAttributes extends HTMLAttributes {
  color: string;
}

interface HTMLFormAttributes extends HTMLAttributes {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autocomplete?: string | undefined;
  encoding?: string | undefined;
  enctype?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
}

type HTMLHeadingAttributes = HTMLAttributes;
type HTMLHeadAttributes = HTMLAttributes;
type HTMLHtmlAttributes = HTMLAttributes;

interface HTMLIFrameAttributes extends HTMLAttributes {
  allow?: string | undefined;
  allowFullscreen?: boolean | undefined;
  allowPaymentRequest?: boolean | undefined;
  height?: string | undefined;
  name?: string | undefined;
  referrerPolicy?: ReferrerPolicy | undefined;
  src?: string | undefined;
  srcdoc?: string | undefined;
  width?: string | undefined;
}

interface HTMLImageAttributes extends HTMLAttributes {
  alt: string;
  crossOrigin: string | null;
  decoding: "async" | "sync" | "auto";
  height: number;
  isMap: boolean;
  loading: string;
  referrerPolicy: string;
  sizes: string;
  src: string;
  srcset: string;
  useMap: string;
  width: number;
}

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

interface HTMLInputAttributes extends HTMLAttributes {
  accept?: string | undefined;
  alt?: string | undefined;
  autocomplete?: string | undefined;
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  defaultValue?: string | undefined;
  dirName?: string | undefined;
  disabled?: boolean | undefined;
  files?: FileList | null | undefined;
  formAction?: string | undefined;
  formEnctype?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  height?: number | undefined;
  indeterminate?: boolean | undefined;
  max?: string | undefined;
  maxLength?: number | undefined;
  min?: string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  selectionDirection?: "forward" | "backward" | "none" | null | undefined;
  selectionEnd?: number | null | undefined;
  selectionStart?: number | null | undefined;
  size?: number | undefined;
  src?: string | undefined;
  step?: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | undefined;
  valueAsDate?: Date | null | undefined;
  valueAsNumber?: number | undefined;
  width?: number | undefined;
}

interface HTMLLabelAttributes extends HTMLAttributes {
  for?: string | undefined;
}

type HTMLLegendAttributes = HTMLAttributes;
interface HTMLLIAttributes extends HTMLAttributes {
  value?: number | undefined;
}

interface HTMLLinkAttributes extends HTMLAttributes {
  as?: string | undefined;
  crossOrigin?: string | null | undefined;
  disabled?: boolean | undefined;
  href?: string | undefined;
  hreflang?: string | undefined;
  imageSizes?: string | undefined;
  imageSrcset?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  referrerPolicy?: string | undefined;
  rel?: string | undefined;
  type?: string | undefined;
}

interface HTMLMapAttributes extends HTMLAttributes {
  name?: string | undefined;
}

interface HTMLMediaAttributes
  extends HTMLAttributes,
    HTMLMediaElementEventHandlers {
  autoplay?: boolean | undefined;
  controls?: boolean | undefined;
  crossOrigin?: string | null | undefined;
  currentTime?: number | undefined;
  defaultMuted?: boolean | undefined;
  defaultPlaybackRate?: number | undefined;
  loop?: boolean | undefined;
  muted?: boolean | undefined;
  playbackRate?: number | undefined;
  preload?: string | undefined;
  src?: string | undefined;
  srcObject?: MediaProvider | null | undefined;
  volume?: number | undefined;
}

interface HTMLMetaAttributes extends HTMLAttributes {
  content?: string | undefined;
  httpEquiv?: string | undefined;
  name?: string | undefined;
}

interface HTMLMeterAttributes extends HTMLAttributes {
  high?: number | undefined;
  low?: number | undefined;
  max?: number | undefined;
  min?: number | undefined;
  optimum?: number | undefined;
  value?: number | undefined;
}

interface HTMLObjectAttributes extends HTMLAttributes {
  data?: string | undefined;
  height?: string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  useMap?: string | undefined;
  width?: string | undefined;
}

interface HTMLOListAttributes extends HTMLAttributes {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: string | undefined;
}

interface HTMLOptionAttributes extends HTMLAttributes {
  defaultSelected?: boolean | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  text?: string | undefined;
  value?: string | undefined;
}

interface HTMLOptGroupAttributes extends HTMLAttributes {
  disabled?: boolean | undefined;
  label?: string | undefined;
}

interface HTMLOutputAttributes extends HTMLAttributes {
  defaultValue?: string | undefined;
  name?: string | undefined;
  value?: string | undefined;
}

type HTMLParagraphAttributes = HTMLAttributes;
interface HTMLParamAttributes extends HTMLAttributes {
  name?: string | undefined;
  value?: string | undefined;
}

type HTMLPictureAttributes = HTMLAttributes;
type HTMLPreAttributes = HTMLAttributes;

interface HTMLProgressAttributes extends HTMLAttributes {
  max?: number | undefined;
  value?: number | undefined;
}

interface HTMLScriptAttributes extends HTMLAttributes {
  async?: boolean | undefined;
  crossOrigin?: string | null | undefined;
  defer?: boolean | undefined;
  integrity?: string | undefined;
  noModule?: boolean | undefined;
  referrerPolicy?: string | undefined;
  src?: string | undefined;
  text?: string | undefined;
  type?: string | undefined;
}

interface HTMLSelectAttributes extends HTMLAttributes {
  autocomplete?: string | undefined;
  disabled?: boolean | undefined;
  length?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  selectedIndex?: number | undefined;
  size?: number | undefined;
  value?: string | undefined;
}

interface HTMLSlotAttributes extends HTMLAttributes {
  name?: string | undefined;
}

interface HTMLSourceAttributes extends HTMLAttributes {
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcset?: string | undefined;
  type?: string | undefined;
}

type HTMLSpanAttributes = HTMLAttributes;

interface HTMLStyleAttributes extends HTMLAttributes, LinkStyle {
  media?: string | undefined;
}

interface HTMLTableCellAttributes extends HTMLAttributes {
  abbr?: string | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
}

interface HTMLTableColAttributes extends HTMLAttributes {
  span?: number | undefined;
}

type HTMLTableDataCellAttributes = HTMLTableCellAttributes;

type HTMLTableAttributes = HTMLAttributes;

type HTMLTableHeaderCellAttributes = HTMLTableCellElement;

interface HTMLTableRowAttributes extends HTMLAttributes {
  vAlign?: string | undefined;
}

interface HTMLTableSectionAttributes extends HTMLAttributes {
  ch?: string | undefined;
}

type HTMLTemplateAttributes = HTMLAttributes;

interface HTMLTextAreaAttributes extends HTMLAttributes {
  autocomplete?: string | undefined;
  cols?: number | undefined;
  defaultValue?: string | undefined;
  dirName?: string | undefined;
  disabled?: boolean | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  rows?: number | undefined;
  selectionDirection?: "forward" | "backward" | "none" | undefined;
  selectionEnd?: number | undefined;
  selectionStart?: number | undefined;
  value?: string | undefined;
  wrap?: string | undefined;
}

interface HTMLTimeAttributes extends HTMLAttributes {
  dateTime?: string | undefined;
}

interface HTMLTitleAttributes extends HTMLAttributes {
  text?: string | undefined;
}

interface HTMLTrackAttributes extends HTMLAttributes {
  default?: boolean | undefined;
  kind?: string | undefined;
  label?: string | undefined;
  src?: string | undefined;
  srclang?: string;
}

type HTMLUListAttributes = HTMLAttributes;

interface HTMLVideoAttributes extends HTMLMediaAttributes {
  height?: number | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | undefined;
}

export interface HTMLElementsAttributes {
  a: HTMLAnchorAttributes;
  abbr: HTMLAttributes;
  address: HTMLAttributes;
  area: HTMLAreaAttributes;
  article: HTMLAttributes;
  aside: HTMLAttributes;
  audio: HTMLAudioAttributes;
  b: HTMLAttributes;
  base: HTMLBaseAttributes;
  bdi: HTMLAttributes;
  bdo: HTMLAttributes;
  blockquote: HTMLBlockquoteAttributes;
  body: HTMLBodyAttributes;
  br: HTMLBRAttributes;
  button: HTMLButtonAttributes;
  canvas: HTMLCanvasAttributes;
  caption: HTMLTableCaptionAttributes;
  cite: HTMLAttributes;
  code: HTMLAttributes;
  col: HTMLTableColAttributes;
  colgroup: HTMLTableColAttributes;
  data: HTMLDataAttributes;
  datalist: HTMLDataListAttributes;
  dd: HTMLAttributes;
  del: HTMLModAttributes;
  details: HTMLDetailsAttributes;
  dfn: HTMLAttributes;
  dialog: HTMLDialogAttributes;
  dir: HTMLDirectoryAttributes;
  div: HTMLDivAttributes;
  dl: HTMLDListAttributes;
  dt: HTMLAttributes;
  em: HTMLAttributes;
  embed: HTMLEmbedAttributes;
  fieldset: HTMLFieldSetAttributes;
  figcaption: HTMLAttributes;
  figure: HTMLAttributes;
  font: HTMLFontAttributes;
  footer: HTMLAttributes;
  form: HTMLFormAttributes;
  h1: HTMLHeadingAttributes;
  h2: HTMLHeadingAttributes;
  h3: HTMLHeadingAttributes;
  h4: HTMLHeadingAttributes;
  h5: HTMLHeadingAttributes;
  h6: HTMLHeadingAttributes;
  head: HTMLHeadAttributes;
  header: HTMLAttributes;
  hgroup: HTMLAttributes;
  html: HTMLHtmlAttributes;
  i: HTMLAttributes;
  iframe: HTMLIFrameAttributes;
  img: HTMLImageAttributes;
  input: HTMLInputAttributes;
  ins: HTMLModAttributes;
  kbd: HTMLAttributes;
  label: HTMLLabelAttributes;
  legend: HTMLLegendAttributes;
  li: HTMLLIAttributes;
  link: HTMLLinkAttributes;
  main: HTMLAttributes;
  map: HTMLMapAttributes;
  mark: HTMLAttributes;
  meta: HTMLMetaAttributes;
  meter: HTMLMeterAttributes;
  nav: HTMLAttributes;
  noscript: HTMLAttributes;
  object: HTMLObjectAttributes;
  ol: HTMLOListAttributes;
  optgroup: HTMLOptGroupAttributes;
  option: HTMLOptionAttributes;
  output: HTMLOutputAttributes;
  p: HTMLParagraphAttributes;
  param: HTMLParamAttributes;
  picture: HTMLPictureAttributes;
  pre: HTMLPreAttributes;
  progress: HTMLProgressAttributes;
  q: HTMLBlockquoteAttributes;
  rp: HTMLAttributes;
  rt: HTMLAttributes;
  ruby: HTMLAttributes;
  s: HTMLAttributes;
  samp: HTMLAttributes;
  script: HTMLScriptAttributes;
  section: HTMLAttributes;
  select: HTMLSelectAttributes;
  slot: HTMLSlotAttributes;
  small: HTMLAttributes;
  source: HTMLSourceAttributes;
  span: HTMLSpanAttributes;
  strong: HTMLAttributes;
  style: HTMLStyleAttributes;
  sub: HTMLAttributes;
  summary: HTMLAttributes;
  sup: HTMLAttributes;
  table: HTMLTableAttributes;
  tbody: HTMLTableSectionAttributes;
  td: HTMLTableDataCellAttributes;
  template: HTMLTemplateAttributes;
  textarea: HTMLTextAreaAttributes;
  tfoot: HTMLTableSectionAttributes;
  th: HTMLTableHeaderCellAttributes;
  thead: HTMLTableSectionAttributes;
  time: HTMLTimeAttributes;
  title: HTMLTitleAttributes;
  tr: HTMLTableRowAttributes;
  track: HTMLTrackAttributes;
  u: HTMLAttributes;
  ul: HTMLUListAttributes;
  var: HTMLAttributes;
  video: HTMLVideoAttributes;
  wbr: HTMLAttributes;
}
