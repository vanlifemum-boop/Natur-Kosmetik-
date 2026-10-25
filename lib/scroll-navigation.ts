type ClickModifiers = { button: number; defaultPrevented: boolean; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean };

export function isPlainNavigationClick(event: ClickModifiers) {
  return event.button === 0 && !event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function scrollTopForTarget(targetTop: number, pageScroll: number, stickyHeaderHeight: number) {
  return Math.max(0, targetTop + pageScroll - stickyHeaderHeight - 16);
}

export function scrollToPageTarget(id: string, documentRef: Document = document, windowRef: Window = window) {
  const target = documentRef.getElementById(id);
  if (!target) return false;
  const disclosure = id.startsWith("rezept-") || id.startsWith("haushalt-")
    ? target.querySelector<HTMLDetailsElement>("details.recipe-disclosure, details.household-disclosure")
    : null;
  if (disclosure) disclosure.open = true;
  const header = documentRef.querySelector<HTMLElement>(".site-header");
  const fixedHeader = header && ["sticky", "fixed"].includes(windowRef.getComputedStyle(header).position);
  const offset = fixedHeader ? header.getBoundingClientRect().height : 0;
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  // One immediate scroll of the document. Never lock body scrolling or attach
  // wheel/touch handlers. No native scroll + animation + hashchange triple run.
  windowRef.scrollTo({ top: scrollTopForTarget(target.getBoundingClientRect().top, windowRef.scrollY, offset), left: 0, behavior: "auto" });
  return true;
}
