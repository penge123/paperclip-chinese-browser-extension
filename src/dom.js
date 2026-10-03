import { translateUiString } from "./translate.js";

const USER_CONTENT = ".paperclip-markdown, [data-testid='task-chat-human-bubble'], [data-testid='task-chat-agent-bubble'], [data-testid='task-chat-agent-identity'], [data-testid='task-chat-live-transcript'], [data-testid='instructions-raw-source'], [data-testid='issue-detail-header'] h2, nav.flex-wrap, aside a[href^='/issues/'], span.inline-flex[title], span.truncate[title], h2.cursor-pointer, h1.truncate, h2.truncate, button[aria-label='Open account menu'] span.truncate, [data-radix-popper-content-wrapper] p.truncate, [data-slot='task-row-title'], a[href*='/runs/'] > span.text-xs.truncate, span.truncate[class~='max-w-(--sz-300px)'], [data-filter-options='creators'] button > span.truncate, [data-filter-options='projects'] label span.text-sm, [data-filter-options='labels'] label span.text-sm, [data-filter-options='workspaces'] label span.text-sm, [contenteditable], [role='textbox'], pre, code";
const TEXT_EXCLUDED = `${USER_CONTENT}, input, textarea, script, style`;
const UI_ATTRIBUTES = ["placeholder", "title", "aria-label"];
const COUNT_UNITS = { agent: "智能体", project: "项目", task: "任务", routine: "例行任务" };

function contextFor(element) {
  if (/\/u\/[^/]+\/?$/.test(element.ownerDocument.location.pathname)) return "user-profile";
  if (element.closest("select[aria-label='Environment'], select[aria-label='环境']")) return "environment-choice";
  if (element.textContent.trim() === "Title" && element.closest("[data-radix-popper-content-wrapper]") && /\/issues(?:\/|$)/.test(element.ownerDocument.location.pathname)) return "task-sort";
  if (element.closest("[data-filter-options='responsible']")) return "issue-filter";
  if (element.closest("[data-page='search'] [data-result-type]") && element.matches("span.uppercase.tracking-wide")) return "search-result";
  if (element.closest("div[class~='text-muted-foreground/70']")) return "metric";
  if (element.closest(".status-chip")) return "status";
  if (element.closest("[data-page='search']")) return "search";
  if (element.closest("[data-radix-popper-content-wrapper]") && element.ownerDocument.querySelector("[data-page='search']")) return "search";
  if (element.closest(".rounded-full")) return "status";
  if (element.matches("a.capitalize")) return "detail-link";
  if (element.matches("span.capitalize")) return "run-origin";
  if (element.matches("span.text-muted-foreground") && (element.closest(".dashboard-list-row") || element.parentElement?.classList.contains("text-foreground"))) return "activity";
  return element.closest("nav, aside") ? "navigation" : "";
}

function translateTextNode(node) {
  const parent = node.parentElement;
  if (!parent) return 0;
  if (/\/u\/[^/]+\/?$/.test(parent.ownerDocument.location.pathname) && parent.matches("main h1")) return 0;
  if (parent.matches("option") && node.nodeValue === "Default: ") {
    node.nodeValue = "默认：";
    return 1;
  }
  const responsibleGroup = parent.closest("[data-filter-options='responsible']");
  if (responsibleGroup && parent.matches("span.text-sm")) {
    const label = parent.closest("label");
    const fixedUnassigned = label === responsibleGroup.querySelector("label") && parent.textContent.trim() === "No responsible";
    const fixedMe = label?.querySelector("svg.lucide-user") && parent.textContent.trim() === "Me";
    if (!fixedUnassigned && !fixedMe) return 0;
  }
  if (parent.matches("div.text-xs.text-red-600")) return 0;
  if (parent.matches("p") && parent.textContent.startsWith("Installed apps load tools into ") && [...parent.childNodes].every((child) => child.nodeType === 3)) {
    const translated = translateUiString(parent.textContent);
    if (translated) {
      parent.firstChild.nodeValue = translated;
      for (const child of [...parent.childNodes].slice(1)) child.nodeValue = "";
      return 1;
    }
  }
  if (parent.matches("span.line-clamp-2") && parent.closest("a[href*='/runs/']") && parent.textContent.startsWith("Failed run — ")) {
    const translated = translateUiString(parent.textContent);
    if (translated) {
      const textNodes = [...parent.childNodes].filter((child) => child.nodeType === 3);
      textNodes[0].nodeValue = translated;
      for (const child of textNodes.slice(1)) child.nodeValue = "";
      return 1;
    }
  }
  const searchResult = parent.closest("[data-page='search'] [data-result-type]");
  const searchResultLabel = searchResult && parent.matches("span.uppercase.tracking-wide");
  const searchResultTime = searchResult && parent.matches("span.tabular-nums") && /^\d+(?:mo|[mhdwy])$/.test(node.nodeValue.trim());
  if (searchResult && !searchResultLabel && !searchResultTime) return 0;
  if (parent.matches("[data-page='search'] ul.flex-col > li > button > span.flex-1")) return 0;
  if (parent.closest("[data-page='search']") && parent.matches("div.text-base.font-semibold, p.text-sm.text-muted-foreground, [data-testid='search-loading']")) {
    const translatedGroup = translateUiString(parent.textContent, "search");
    if (translatedGroup && /^(?:No results for “|We couldn’t find a match in |Searching for “)/.test(parent.textContent)) {
      const textNodes = [...parent.childNodes].filter((child) => child.nodeType === 3);
      textNodes[0].nodeValue = translatedGroup;
      for (const child of textNodes.slice(1)) child.nodeValue = "";
      return 1;
    }
  }
  if (searchResultTime) {
    const translatedTime = translateUiString(`${node.nodeValue.trim()} ago`);
    if (!translatedTime) return 0;
    node.nodeValue = translatedTime;
    return 1;
  }
  const dashboardVerb = parent.matches("span.text-muted-foreground") && parent.closest(".dashboard-list-row span[title]");
  const fixedPageTitle = parent.matches("h1.uppercase.tracking-wider");
  const generatedRecoveryBadge = parent.closest("[data-testid='issue-row-recovery-indicator']");
  if (!dashboardVerb && !fixedPageTitle && !generatedRecoveryBadge && parent.closest(TEXT_EXCLUDED)) return 0;
  if (parent.closest(".dashboard-list-row [title]") && !parent.matches(".text-muted-foreground")) return 0;
  const count = /^(\d+) (agent|project|task|routine)s?$/i.exec(parent.textContent);
  if (count && parent.childNodes.length > 1 && [...parent.childNodes].every((child) => child.nodeType === 3)) {
    parent.firstChild.nodeValue = `${count[1]} 个${COUNT_UNITS[count[2].toLowerCase()]}`;
    for (const child of [...parent.childNodes].slice(1)) child.nodeValue = "";
    return 1;
  }
  if (parent.childNodes.length > 1 && [...parent.childNodes].every((child) => child.nodeType === 3) && /^(?:\d+ of \d+ enabled|\d+ total|\d+ tools?)$/.test(parent.textContent.trim())) {
    const translatedCount = translateUiString(parent.textContent);
    if (translatedCount) {
      parent.firstChild.nodeValue = translatedCount;
      for (const child of [...parent.childNodes].slice(1)) child.nodeValue = "";
      return 1;
    }
  }
  const translated = translateUiString(node.nodeValue, contextFor(parent));
  if (translated === null || translated === node.nodeValue) return 0;
  node.nodeValue = translated;
  return 1;
}

function translateAttributes(element) {
  if (element.closest("[data-page='search'] [data-result-type]")) return 0;
  if (element.closest(USER_CONTENT) && !element.matches("[data-testid='issue-row-recovery-indicator']")) {
    if (element.matches("[contenteditable][role='textbox']") && element.getAttribute("aria-label") === "editable markdown") {
      element.setAttribute("aria-label", "可编辑的 Markdown 内容");
      return 1;
    }
    return 0;
  }
  if (element.closest(".dashboard-list-row") && element.hasAttribute("title")) return 0;
  let changed = 0;
  for (const name of UI_ATTRIBUTES) {
    const value = element.getAttribute(name);
    if (value === null) continue;
    const translated = translateUiString(value, contextFor(element));
    if (translated === null || translated === value) continue;
    element.setAttribute(name, translated);
    changed += 1;
  }
  return changed;
}

export function translateSubtree(root) {
  if (!root) return 0;
  const doc = root.ownerDocument ?? root;
  const NodeFilter = doc.defaultView?.NodeFilter ?? globalThis.NodeFilter;
  let changed = 0;
  if (root.nodeType === 3) changed += translateTextNode(root);
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) changed += translateTextNode(walker.currentNode);
  if (root.nodeType === 1) changed += translateAttributes(root);
  if (typeof root.querySelectorAll === "function") {
    for (const element of root.querySelectorAll("*")) changed += translateAttributes(element);
  }
  return changed;
}

export function observePaperclip(doc) {
  const root = doc.querySelector("#root");
  if (!root) return () => {};
  translateSubtree(doc.body);
  const pending = new Set();
  let timer = null;
  const flush = () => {
    timer = null;
    for (const node of pending) translateSubtree(node);
    pending.clear();
  };
  const observer = new doc.defaultView.MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) pending.add(node);
      } else if (mutation.type === "characterData") {
        pending.add(mutation.target);
      } else {
        pending.add(mutation.target);
      }
    }
    if (pending.size && timer === null) timer = doc.defaultView.setTimeout(flush, 0);
  });
  observer.observe(doc.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: UI_ATTRIBUTES,
  });
  return () => {
    observer.disconnect();
    if (timer !== null) doc.defaultView.clearTimeout(timer);
    pending.clear();
  };
}
