import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { translateSubtree, observePaperclip } from "../src/dom.js";

function page(body) {
  return new JSDOM(`<!doctype html><html><body><div id="root">${body}</div></body></html>`, {
    url: "http://localhost:3100/",
  });
}

test("translates Paperclip chrome text and accessibility attributes", () => {
  const dom = page(`
    <nav><a id="issues" href="/issues">Issues</a><span>Agents</span></nav>
    <main>
      <h1>Dashboard</h1>
      <button id="new-agent" title="New Agent" aria-label="New Agent">New Agent</button>
      <label>Model</label>
      <input id="agent-name" placeholder="Agent name" value="Agent" />
      <div role="dialog"><p>This action cannot be undone.</p><button>Cancel</button></div>
      <p id="unknown">My agent runs through the night</p>
    </main>
  `);
  const root = dom.window.document.querySelector("#root");
  assert.ok(translateSubtree(root) > 0);
  assert.equal(dom.window.document.querySelector("#issues").textContent, "任务");
  assert.equal(dom.window.document.querySelector("nav span").textContent, "智能体");
  assert.equal(dom.window.document.querySelector("h1").textContent, "仪表盘");
  assert.equal(dom.window.document.querySelector("#new-agent").textContent, "新建智能体");
  assert.equal(dom.window.document.querySelector("#new-agent").title, "新建智能体");
  assert.equal(dom.window.document.querySelector("#new-agent").getAttribute("aria-label"), "新建智能体");
  assert.equal(dom.window.document.querySelector("label").textContent, "模型");
  assert.equal(dom.window.document.querySelector("#agent-name").placeholder, "智能体名称");
  assert.equal(dom.window.document.querySelector("#agent-name").value, "Agent");
  assert.equal(dom.window.document.querySelector('[role="dialog"] p').textContent, "此操作无法撤销。");
  assert.equal(dom.window.document.querySelector("#unknown").textContent, "My agent runs through the night");
});

test("never changes user-authored descriptions, chat bubbles, code, or editable values", () => {
  const dom = page(`
    <div class="paperclip-markdown"><p id="description">Agent</p></div>
    <div data-testid="task-chat-agent-bubble"><span id="chat">Agent</span></div>
    <pre><code id="code">Agent</code></pre>
    <div id="editable" contenteditable="true">Agent</div>
    <textarea id="notes">Agent</textarea>
    <button id="ui">Agent</button>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  for (const id of ["description", "chat", "code", "editable", "notes"]) {
    assert.equal(dom.window.document.querySelector(`#${id}`).textContent, "Agent", id);
  }
  assert.equal(dom.window.document.querySelector("#ui").textContent, "智能体");
});

test("translates task chat controls but not human or agent message bodies", () => {
  const dom = page(`
    <main data-testid="task-chat-thread">
      <div data-testid="task-chat-human-bubble">New</div>
      <div data-testid="task-chat-agent-bubble">Agent</div>
      <div data-testid="task-chat-blocker-links"><span>Blocked by</span></div>
      <button data-testid="task-chat-composer-mode">Auto mode</button>
      <button>Try again</button>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector('[data-testid="task-chat-human-bubble"]').textContent, "New");
  assert.equal(dom.window.document.querySelector('[data-testid="task-chat-agent-bubble"]').textContent, "Agent");
  assert.equal(dom.window.document.querySelector('[data-testid="task-chat-blocker-links"]').textContent, "被以下任务阻塞");
  assert.equal(dom.window.document.querySelector('[data-testid="task-chat-composer-mode"]').textContent, "自动模式");
  assert.equal(dom.window.document.querySelector("main > button:last-child").textContent, "重试");
});

test("translates skills navigation and controls without changing a skill name", () => {
  const dom = page(`
    <div data-slot="contextual-sidebar-nav"><a>Installed</a><a>Discover</a><div>AUTHOR</div><p>Skills you create, edit, and test.</p><a>My Skills</a></div>
    <div class="page-title">SKILLS</div><main><h1>Installed skills</h1><input placeholder="Search installed skills…" aria-label="Search installed skills"><button>Most agents</button><button>Create new skill</button><p class="paperclip-markdown">My Skills</p></main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("[data-slot='contextual-sidebar-nav'] > *")].map((el) => el.textContent), ["已安装", "发现", "创作", "创建、编辑和测试你自己的技能。", "我的技能"]);
  assert.equal(dom.window.document.querySelector(".page-title").textContent, "技能");
  assert.equal(dom.window.document.querySelector("input").placeholder, "搜索已安装的技能…");
  assert.equal(dom.window.document.querySelector("input").getAttribute("aria-label"), "搜索已安装的技能");
  assert.equal(dom.window.document.querySelector("main button").textContent, "智能体最多");
  assert.equal(dom.window.document.querySelector(".paperclip-markdown").textContent, "My Skills");
});

test("translates new-task dropdown labels and explanations", () => {
  const dom = page(`
    <div role="dialog"><span>Backlog</span><span>Parked - assignee will not be woken</span><span>Executable - assignee will be woken</span><button data-issue-work-mode="plan">Plan mode</button><button>Ask mode</button><button>Reviewer</button><button>Approver</button><button>Watchdog</button><button>Start date</button><button>Due date</button><input value="Plan mode"></div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("span, button")].map((el) => el.textContent), ["待规划", "暂存任务，不会唤醒负责人", "可执行任务，会唤醒负责人", "规划模式", "提问模式", "审阅者", "审批者", "监督者", "开始日期", "截止日期"]);
  assert.equal(dom.window.document.querySelector("input").value, "Plan mode");
});

test("translates inbox chrome and generated notification prefix but preserves error and task data", () => {
  const dom = page(`
    <div class="page-title">INBOX</div><main><nav><button>Mine</button><button>Recent</button><button>Unread</button></nav><input placeholder="Search inbox…"><a><span>Failed run — CEO</span><span class="truncate max-w-(--sz-300px)">Bundled skill release v0 does not match its seeded snapshot.</span></a><a><span data-slot="task-row-title">My Skills</span></a></main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector(".page-title").textContent, "收件箱");
  assert.deepEqual([...dom.window.document.querySelectorAll("nav button")].map((el) => el.textContent), ["我的", "最近", "未读"]);
  assert.equal(dom.window.document.querySelector("input").placeholder, "搜索收件箱…");
  assert.equal(dom.window.document.querySelector("main a:first-of-type span:first-child").textContent, "运行失败 — CEO");
  assert.equal(dom.window.document.querySelector("main a:first-of-type span:last-child").textContent, "Bundled skill release v0 does not match its seeded snapshot.");
  assert.equal(dom.window.document.querySelector("[data-slot='task-row-title']").textContent, "My Skills");
});

test("translates React-split generated run notification without translating the agent name", () => {
  const dom = page('<main><a href="/YOU/agents/ceo/runs/123"><span class="line-clamp-2" id="notification"></span></a></main>');
  const label = dom.window.document.querySelector("#notification");
  label.append(dom.window.document.createTextNode("Failed run"));
  label.append(dom.window.document.createTextNode(" — CEO"));
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(label.textContent, "运行失败 — CEO");
});

test("translates agent sidebar and run detail labels while preserving names, output, and JSON", () => {
  const dom = page(`
    <aside data-slot="contextual-sidebar-nav"><div data-slot="contextual-sidebar-section-label">RUNTIME</div><a>Secrets & variables</a><div data-slot="contextual-sidebar-section-label">GOVERNANCE</div><a>Permissions / Trust</a><a>API Keys</a><a>Revisions</a></aside>
    <main><h1>CEO</h1><span>On-demand</span><span>Trace incomplete</span><button>Inspect run</button><button>Re-run with provider trace</button><div data-testid="run-detail-on-behalf-of">On behalf of <span>Board</span></div><summary>GitHub identity history</summary><span>Duration: 0s</span><span>Transcript (0)</span><button>Nice</button><button>Raw</button><p>No persisted transcript for this run.</p><div>Failure details</div><div>Error: <span class="run-error">Bundled skill release v0 does not match its seeded snapshot.</span></div><div class="text-xs text-red-600">Agent</div><div>adapter result JSON</div><pre>{"stopReason":"adapter_failed"}</pre><div>Events (1)</div><div class="paperclip-markdown">Agent</div></main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.deepEqual([...doc.querySelectorAll("[data-slot='contextual-sidebar-section-label']")].map((el) => el.textContent), ["运行环境", "治理"]);
  assert.deepEqual([...doc.querySelectorAll("aside a")].map((el) => el.textContent), ["密钥与变量", "权限与信任", "API 密钥", "修订记录"]);
  assert.equal(doc.querySelector("h1").textContent, "CEO");
  assert.equal(doc.querySelector("[data-testid='run-detail-on-behalf-of']").textContent, "代表 Board");
  assert.equal(doc.querySelector(".run-error").textContent, "Bundled skill release v0 does not match its seeded snapshot.");
  assert.equal(doc.querySelector("div.text-xs.text-red-600").textContent, "Agent");
  assert.equal(doc.querySelector("pre").textContent, '{"stopReason":"adapter_failed"}');
  assert.equal(doc.querySelector(".paperclip-markdown").textContent, "Agent");
  assert.deepEqual([...doc.querySelectorAll("main > span")].map((el) => el.textContent), ["按需触发", "跟踪信息不完整", "耗时：0 秒", "对话记录（0）"]);
});

test("translates fixed tool explanation around a React-split agent name", () => {
  const dom = page('<main><p id="tools"></p><div class="paperclip-markdown">Installed apps load tools into CEO\'s context on every run.</div></main>');
  const label = dom.window.document.querySelector("#tools");
  for (const part of ["Installed apps load tools into ", "CEO", "'s context on every run. Permitted-only apps do not add context cost."]) {
    label.append(dom.window.document.createTextNode(part));
  }
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(label.textContent, "已安装的应用会在每次运行时将工具加入 CEO 的上下文。仅获准使用、未安装的应用不会增加上下文开销。");
  assert.equal(dom.window.document.querySelector(".paperclip-markdown").textContent, "Installed apps load tools into CEO's context on every run.");
});

test("translates account menu actions without changing the signed-in person's name", () => {
  const dom = page(`
    <button aria-label="Open account menu"><span class="min-w-0 flex-1 truncate">Agent</span></button>
    <div data-radix-popper-content-wrapper><h2 class="truncate">Agent</h2><p class="truncate">demo@example.invalid</p>
      <a>Settings</a><a>View profile</a><a>Edit profile</a><a>Documentation</a>
      <button title="Switch to light mode" aria-label="Switch to light mode">Switch to light mode</button>
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("h2").textContent, "Agent");
  assert.equal(doc.querySelector("button[aria-label='打开账户菜单'] span").textContent, "Agent");
  assert.equal(doc.querySelector("p.truncate").textContent, "demo@example.invalid");
  assert.deepEqual([...doc.querySelectorAll("a")].map((el) => el.textContent), ["设置", "查看个人资料", "编辑个人资料", "文档"]);
  assert.equal(doc.querySelector("button[title]").textContent, "切换到浅色模式");
  assert.equal(doc.querySelector("button[title]").title, "切换到浅色模式");
});

test("translates task-list column and grouping menus", () => {
  const dom = page(`
    <input placeholder="Search tasks..." value="Agent">
    <div data-radix-popper-content-wrapper><div>Desktop task rows</div><div>Choose which task columns stay visible</div>
      <span>Responsible</span><span>Responsible agent or board user.</span><span>Kicked off by</span>
      <span>Task state icon on the leading edge.</span><span>Task identifier like PAP-1009 on the trailing edge.</span>
      <span>Parent task</span><span>Parent task identifier and title.</span><span>Date group separators</span>
      <span>Show Today, Yesterday, and Earlier rules on newest-first task lists.</span><button>Reset defaults</button>
      <span>status, id, updated</span><button>Workspace</button><button>Parent Task</button><button>None</button>
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("input").placeholder, "搜索任务…");
  assert.equal(doc.querySelector("input").value, "Agent");
  assert.deepEqual([...doc.querySelectorAll("[data-radix-popper-content-wrapper] > div")].map((el) => el.textContent), ["桌面端任务行", "选择要显示的任务列"]);
  assert.deepEqual([...doc.querySelectorAll("[data-radix-popper-content-wrapper] > button")].map((el) => el.textContent), ["恢复默认设置", "工作区", "父任务", "无"]);
  assert.equal(doc.querySelector("[data-radix-popper-content-wrapper] > span").textContent, "负责人");
});

test("translates task filters while keeping agent, creator, and project names", () => {
  const dom = page(`
    <div data-radix-popper-content-wrapper><h2>Filters</h2><span>Quick filters</span><span>Responsible</span><span>Visibility</span>
      <div data-filter-options="responsible"><label><span class="text-sm">No responsible</span></label><label><svg class="lucide-user"></svg><span class="text-sm">Me</span></label><label><span class="text-sm">Agent</span></label></div>
      <div data-filter-options="creators"><button><span class="truncate">Board</span></button></div>
      <div data-filter-options="projects"><label><span class="text-sm">Project</span></label></div>
      <label><span>Live runs only</span></label><label><span>Hide routine runs</span></label>
      <input placeholder="Search creators...">
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("h2").textContent, "筛选" );
  assert.deepEqual([...doc.querySelectorAll("[data-filter-options='responsible'] span")].map((el) => el.textContent), ["无负责人", "我", "Agent"]);
  assert.equal(doc.querySelector("[data-filter-options='creators'] span").textContent, "Board");
  assert.equal(doc.querySelector("[data-filter-options='projects'] span").textContent, "Project");
  assert.equal(doc.querySelector("input").placeholder, "搜索创建者…");
  assert.deepEqual([...doc.querySelectorAll("div[data-radix-popper-content-wrapper] > span")].map((el) => el.textContent), ["快捷筛选", "负责人", "可见范围"]);
});

test("uses task title rather than agent title in the task sort menu", () => {
  const dom = page('<button title="Filter"></button><div data-radix-popper-content-wrapper><button><span>Title</span></button></div><main><span>Title</span></main>');
  dom.window.history.replaceState(null, "", "/YOU/issues");
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("[data-radix-popper-content-wrapper] span").textContent, "标题");
  assert.equal(dom.window.document.querySelector("main span").textContent, "头衔");
  assert.equal(dom.window.document.querySelector("button[title]").title, "筛选");
});

test("translates the generated recovery badge but preserves the adjacent task title", () => {
  const dom = page(`
    <span data-slot="task-row-title-cluster">
      <span data-slot="task-row-title">Agent</span>
      <span data-testid="issue-row-recovery-indicator" class="inline-flex" title="Recovery needed — open the source task to act." aria-label="Recovery needed">
        <svg aria-hidden="true"></svg>Recovery needed
      </span>
    </span>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("[data-slot='task-row-title']").textContent, "Agent");
  const badge = doc.querySelector("[data-testid='issue-row-recovery-indicator']");
  assert.equal(badge.textContent.trim(), "需要恢复");
  assert.equal(badge.getAttribute("aria-label"), "需要恢复");
  assert.equal(badge.title, "需要恢复 — 打开源任务以处理。");
});

test("translates the generated recovery badge's exhausted-retry tooltip", () => {
  const dom = page('<span data-testid="issue-row-recovery-indicator" class="inline-flex" aria-label="Recovery needed — retries used up" title="Recovery needed — retries used up. Open the source task to act.">Recovery needed</span>');
  translateSubtree(dom.window.document.querySelector("#root"));
  const badge = dom.window.document.querySelector("[data-testid='issue-row-recovery-indicator']");
  assert.equal(badge.getAttribute("aria-label"), "需要恢复 — 重试次数已用尽");
  assert.equal(badge.title, "需要恢复 — 重试次数已用尽。打开源任务以处理。");
});

test("translates new-agent wizard chrome while preserving names and adapter brands", () => {
  const dom = page(`
    <div role="dialog" aria-label="New agent progress">
      <span>1. Name</span><span>2. Adapter</span><h2>Meet your next agent</h2>
      <p>Start with a name. Make them your own.</p><input value="gemini" placeholder="e.g. Darnold">
      <button>Invite an external agent</button><button>Choose adapter</button>
      <h2>Choose an adapter</h2><p>How should gemini work?</p>
      <label><span class="text-sm font-medium">Gemini CLI</span></label><button>Configure agent</button>
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("input").value, "gemini");
  assert.equal(doc.querySelector("input").placeholder, "例如：Darnold");
  assert.equal(doc.querySelector("label span").textContent, "Gemini CLI");
  assert.equal(doc.querySelector("p:last-of-type").textContent, "gemini 应如何工作？");
  assert.equal(doc.querySelector("[role='dialog']").getAttribute("aria-label"), "新建智能体进度");
});

test("translates the new-agent environment selector without changing custom environment names", () => {
  const dom = page(`
    <h3>Environment</h3>
    <select aria-label="Environment">
      <option value="">Default: <!-- React split -->Local</option>
      <option value="local-id">Local</option>
      <option value="custom-id">GPU Lab</option>
    </select>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("h3").textContent, "环境");
  assert.equal(doc.querySelector("select").getAttribute("aria-label"), "环境");
  assert.deepEqual([...doc.querySelectorAll("option")].map((el) => el.textContent), ["默认：本机", "本机", "GPU Lab"]);
});

test("keeps task titles and breadcrumb titles even when they match UI phrases", () => {
  const dom = page(`
    <nav class="flex-wrap"><a href="/issues/PAP-1" title="Agent">Agent</a><span>Settings</span></nav>
    <div data-testid="issue-detail-header">
      <div data-slot="task-detail-title"><h2>Agent</h2></div>
      <button>Cancel</button>
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("nav a").textContent, "Agent");
  assert.equal(dom.window.document.querySelector("nav a").title, "Agent");
  assert.equal(dom.window.document.querySelector("nav span").textContent, "Settings");
  assert.equal(dom.window.document.querySelector("h2").textContent, "Agent");
  assert.equal(dom.window.document.querySelector("button").textContent, "取消");
});

test("translates fixed top-left page heading but preserves a truncating agent name", () => {
  const dom = page('<div><h1 class="text-sm font-semibold uppercase tracking-wider truncate">Inbox</h1></div><main><h1 class="truncate">Agent</h1></main>');
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("h1")].map((el) => el.textContent), ["收件箱", "Agent"]);
});

test("translates dashboard metrics and chart legends rendered in plain elements", () => {
  const dom = page(`
    <main>
      <div class="metric"><p>Month Spend</p><div>Unlimited budget</div></div>
      <div class="chart"><h3>Run Activity</h3><span>Last 14 days</span><span>Succeeded</span></div>
      <div class="chart"><h3>Tasks by Status</h3><span>In Review</span></div>
      <div class="chart"><h3>Success Rate</h3></div>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual(
    [...dom.window.document.querySelectorAll(".metric p, .metric div, .chart h3, .chart span")].map((el) => el.textContent),
    ["本月支出", "预算不限", "运行活动", "最近 14 天", "成功", "按状态统计任务", "审核中", "成功率"],
  );
});

test("translates split metric words produced by React text nodes", () => {
  const dom = page('<main><div class="text-xs text-muted-foreground/70 mt-1.5"><span id="metric"></span></div></main>');
  const span = dom.window.document.querySelector("#metric");
  for (const part of ["0 ", "running", ", 0 ", "paused", ", 1 ", "errors"]) {
    span.append(dom.window.document.createTextNode(part));
  }
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(span.textContent, "0 运行中, 0 已暂停, 1 错误");
});

test("translates React-split project and routine counts without leaving an English plural suffix", () => {
  const dom = page('<main><span id="projects" title="2 projects"></span><p id="routines"></p></main>');
  for (const [id, parts] of [["projects", ["2 ", "project", "s"]], ["routines", ["0 ", "routine", "s"]]]) {
    const element = dom.window.document.querySelector(`#${id}`);
    for (const part of parts) element.append(dom.window.document.createTextNode(part));
  }
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("#projects").textContent, "2 个项目");
  assert.equal(dom.window.document.querySelector("#projects").title, "2 个项目");
  assert.equal(dom.window.document.querySelector("#routines").textContent, "0 个例行任务");
});

test("translates React-split agent skill, revision, and tool counts", () => {
  const dom = page('<main><span id="skills"></span><span id="revisions"></span><span id="tools"></span></main>');
  for (const [id, parts] of [["skills", ["0", " of ", "0", " enabled"]], ["revisions", ["0", " total"]], ["tools", ["0", " tools"]]]) {
    const element = dom.window.document.querySelector(`#${id}`);
    for (const part of parts) element.append(dom.window.document.createTextNode(part));
  }
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("main span")].map((el) => el.textContent), ["已启用 0 / 0", "共 0 条", "0 个工具"]);
});

test("translates lowercase task and agent status chips", () => {
  const dom = page('<main><span class="rounded-full">in progress</span><span class="rounded-full">planned</span><span class="status-chip">error</span><span class="rounded-full">failed</span></main>');
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("main span")].map((el) => el.textContent), ["进行中", "已规划", "错误", "失败"]);
});

test("translates lowercase agent detail links without changing nearby content", () => {
  const dom = page('<main><a class="capitalize" href="/activity">activity</a><a class="capitalize" href="/runs">runs</a><a class="capitalize" href="/costs">costs</a><a class="capitalize" href="/budgets">budgets</a><p>activity</p></main>');
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("a")].map((el) => el.textContent), ["活动", "运行记录", "费用", "预算"]);
  assert.equal(dom.window.document.querySelector("p").textContent, "activity");
});

test("translates run origin and status badges without replacing run identifiers", () => {
  const dom = page('<main><span class="capitalize">automation</span><span class="capitalize">assignment</span><span class="capitalize">on demand</span><span class="rounded-full">succeeded</span><span class="rounded-full">cancelled</span><span>3173e27e</span></main>');
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual([...dom.window.document.querySelectorAll("main span")].map((el) => el.textContent), ["自动触发", "任务分配", "按需", "成功", "已取消", "3173e27e"]);
});

test("translates a task dialog portaled outside the app root", async () => {
  const dom = page("<main>Dashboard</main>");
  const doc = dom.window.document;
  const stop = observePaperclip(doc);
  const portal = doc.createElement("div");
  portal.setAttribute("role", "dialog");
  portal.innerHTML = '<input placeholder="Task title"><button>Create Task</button><span>For</span>';
  doc.body.append(portal);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(portal.querySelector("input").placeholder, "任务标题");
  assert.equal(portal.querySelector("button").textContent, "创建任务");
  assert.equal(portal.querySelector("span").textContent, "分配给");
  stop();
});

test("translates new-task help and editor accessibility text without changing a draft", () => {
  const dom = page(`
    <div role="dialog">
      <button title="Add reviewer, approver, or watchdog">More</button>
      <div contenteditable="true" role="textbox" aria-label="editable markdown">My draft says Agent</div>
    </div>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const button = dom.window.document.querySelector("button");
  const editor = dom.window.document.querySelector("[contenteditable]");
  assert.equal(button.title, "添加审阅者、审批者或监督者");
  assert.equal(editor.getAttribute("aria-label"), "可编辑的 Markdown 内容");
  assert.equal(editor.textContent, "My draft says Agent");
});

test("translates search landing controls and help while preserving query syntax", () => {
  const dom = page(`
    <header>SEARCH</header>
    <main data-page="search">
      <input placeholder="Search tasks, comments, documents, artifacts, agents, projects…" aria-label="Search query" value="Agents" />
      <button class="rounded-full" aria-label="Insert operator status:todo"><span>status:todo</span><span>Filter by task status</span></button>
      <button class="rounded-full"><span>assignee:me</span><span>Use your current board user</span></button>
      <button>Comments</button>
      <button id="search-status-filter" aria-label="Filter by Status">Status</button>
      <h2>Type to search organization memory.</h2>
      <p>Tasks, comments, plan documents, artifacts, agents, projects — same surface, ranked by relevance.</p>
      <ul>
        <li><span>Identifier lookup:</span> type <code>PAP-123</code> to jump straight to a task.</li>
        <li><span>Quoted phrases:</span> wrap a phrase in quotes to match the exact sequence.</li>
        <li><span>⌘K:</span> reopens the command palette pre-seeded with your current query.</li>
      </ul>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("header").textContent, "搜索");
  assert.equal(doc.querySelector("input").placeholder, "搜索任务、评论、文档、产出物、智能体和项目…");
  assert.equal(doc.querySelector("input").value, "Agents");
  assert.equal(doc.querySelector("button").getAttribute("aria-label"), "插入搜索条件 status:todo");
  assert.equal(doc.querySelector("button span:first-child").textContent, "status:todo");
  assert.equal(doc.querySelector("button span:last-child").textContent, "按任务状态筛选");
  assert.equal(doc.querySelector("main > button:nth-of-type(3)").textContent, "评论");
  assert.equal(doc.querySelector("#search-status-filter").getAttribute("aria-label"), "按状态筛选");
  assert.equal(doc.querySelector("#search-status-filter").textContent, "状态");
  assert.equal(doc.querySelector("h2").textContent, "输入关键词，搜索组织中的内容。");
  assert.equal(doc.querySelector("p").textContent, "任务、评论、计划文档、产出物、智能体和项目统一搜索，并按相关性排序。");
  assert.equal(doc.querySelector("li:first-child").textContent, "按编号查找： 输入 PAP-123 可直达任务。");
  assert.equal(doc.querySelector("li:nth-child(2)").textContent, "精确短语： 将短语放入引号中，以匹配完全相同的内容。");
  assert.equal(doc.querySelector("li:last-child").textContent, "⌘K： 重新打开命令面板，并预填当前搜索词。");
});

test("translates search result labels and summary without altering matched content", () => {
  const dom = page(`
    <main data-page="search">
      <span>8 of 17 results<!-- React boundary --> · sorted by Relevance</span>
      <a data-result-type="issue"><span class="text-sm font-medium">Agents</span><span class="text-xs uppercase tracking-wide">Comment</span><span class="line-clamp-2">Project</span><span class="tabular-nums">2h</span><span class="tabular-nums">2y</span></a>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("main > span").textContent, "显示 17 条结果中的 8 条 · 按相关性排序");
  assert.deepEqual([...doc.querySelectorAll("a span")].map((el) => el.textContent), ["Agents", "评论", "Project", "2 小时前", "2 年前"]);
});

test("translates a no-results message without changing the user's search term", () => {
  const dom = page(`
    <main data-page="search">
      <div class="text-base font-semibold">No results for “<!-- React boundary -->Agents<!-- React boundary -->”</div>
      <p class="text-sm text-muted-foreground">We couldn’t find a match in <!-- React boundary -->all scopes<!-- React boundary -->. Try widening the scope or rephrasing your query.</p>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("main > div").textContent, "未找到“Agents”的结果");
  assert.equal(doc.querySelector("p").textContent, "在所有范围内都没有匹配结果。请扩大搜索范围或换个说法。");
});

test("translates search filter menus portaled outside the page", () => {
  const dom = page('<main data-page="search"><input value="Agents"></main>');
  const portal = dom.window.document.createElement("div");
  portal.setAttribute("data-radix-popper-content-wrapper", "");
  portal.innerHTML = '<button>Backlog</button><button>In Progress</button><button>Cancelled</button><button>Me</button><button>Unassigned</button><button>Last 24 hours</button><button>Last 7 days</button>';
  dom.window.document.body.append(portal);
  translateSubtree(dom.window.document.body);
  assert.deepEqual([...portal.querySelectorAll("button")].map((el) => el.textContent), ["待规划", "进行中", "已取消", "我", "未分配", "最近 24 小时", "最近 7 天"]);
  assert.equal(dom.window.document.querySelector("input").value, "Agents");
});

test("keeps typed searches unchanged in loading and recent-search UI", () => {
  const dom = page(`
    <main data-page="search">
      <div data-testid="search-loading">Searching for “<!-- React boundary -->Agents<!-- React boundary -->”…</div>
      <ul class="flex flex-col"><li><button><span class="flex-1 truncate">Projects</span></button></li></ul>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("[data-testid='search-loading']").textContent, "正在搜索“Agents”…");
  assert.equal(doc.querySelector("ul button span").textContent, "Projects");
});

test("translates activity verbs and time without changing actor or task names", () => {
  const dom = page(`
    <main><a class="dashboard-list-row" href="/issues/DEMO-1">
      <span class="truncate" title="Agent commented on"><span>Agent</span><span class="text-muted-foreground">commented on</span></span>
      <span title="Agent">Agent</span><span>33m ago</span>
    </a></main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  const row = dom.window.document.querySelector(".dashboard-list-row");
  assert.equal(row.querySelector("span[title] > span:first-child").textContent, "Agent");
  assert.equal(row.querySelector(".text-muted-foreground").textContent, "评论了");
  assert.equal(row.querySelector("span[title='Agent']").textContent, "Agent");
  assert.equal(row.lastElementChild.textContent, "33 分钟前");
});

test("translates an audit verb while preserving the actor name", () => {
  const dom = page('<main><div class="text-foreground"><span class="inline-flex" title="Agent"><span>Agent</span></span><span class="text-muted-foreground">updated</span></div><p>updated</p></main>');
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("span[title]").textContent, "Agent");
  assert.equal(dom.window.document.querySelector("span.text-muted-foreground").textContent, "更新了");
  assert.equal(dom.window.document.querySelector("main p").textContent, "updated");
});

test("keeps recent task and agent names that happen to match UI labels", () => {
  const dom = page(`
    <aside><a href="/issues/DEMO-7" title="Agent">Agent</a><a href="/routines">Routines</a></aside>
    <main><span title="Agent" class="inline-flex"><span class="truncate">Agent</span></span></main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("aside a:first-child").textContent, "Agent");
  assert.equal(dom.window.document.querySelector("aside a:first-child").title, "Agent");
  assert.equal(dom.window.document.querySelector("aside a:last-child").textContent, "例行任务");
  assert.equal(dom.window.document.querySelector("main .truncate").textContent, "Agent");
});

test("keeps names and titles in project, agent, and task detail surfaces", () => {
  const dom = page(`
    <main>
      <span class="truncate" title="New">New</span>
      <h2 class="cursor-pointer">New</h2>
      <h1 class="truncate">Agent</h1>
      <span data-slot="task-row-title">Agent</span>
      <button>Create Task</button>
    </main>
  `);
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.deepEqual(
    [...dom.window.document.querySelectorAll("main > :not(button)")].map((el) => el.textContent),
    ["New", "New", "Agent", "Agent"],
  );
  assert.equal(dom.window.document.querySelector("span[title]").title, "New");
  assert.equal(dom.window.document.querySelector("button").textContent, "创建任务");
});

test("a repeat pass does not translate again", () => {
  const dom = page("<button>New Agent</button>");
  const root = dom.window.document.querySelector("#root");
  assert.equal(translateSubtree(root), 1);
  assert.equal(translateSubtree(root), 0);
  assert.equal(root.querySelector("button").textContent, "新建智能体");
});

test("translates user profile statistics but preserves identity and numeric values", () => {
  const dom = new JSDOM(`<!doctype html><div id="root"><nav><a>Users</a></nav><main>
    <h1>示例用户</h1><p id="identity">demo@example.invalid · owner · active · joined Sep 27, 2026</p>
    <div>1.3M</div><span>ALL-TIME TOKENS</span><small>$0.00 spent</small>
    <span>OPEN ASSIGNED</span><span>7-DAY ACTIONS</span><span>67% rate</span>
    <h2>LAST 7 DAYS</h2><h2>LAST 30 DAYS</h2><h2>ALL TIME</h2>
    <span>Touched</span><span>Comments</span><span>Actions</span><span>Tokens</span><span>Spend</span>
    <span>TOKENS / DAY</span><span>COMPLETIONS</span><h2>Recent tasks</h2><h2>Recent activity</h2>
  </main></div>`, { url: "http://localhost:3100/YOU/u/local" });
  translateSubtree(dom.window.document.querySelector("#root"));
  const text = dom.window.document.querySelector("#root").textContent;
  for (const expected of ["用户", "累计 Token 用量", "已分配的未完成任务", "近 7 天操作", "过去 7 天", "过去 30 天", "全部时间", "触及任务", "评论", "操作", "Token", "支出", "每日 Token 用量", "完成任务数", "最近任务", "最近活动"]) assert.ok(text.includes(expected), expected);
  assert.equal(dom.window.document.querySelector("#identity").textContent, "demo@example.invalid · 所有者 · 活跃 · 2026 年 9 月 27 日加入");
  assert.ok(text.includes("1.3M"));
  assert.ok(text.includes("$0.00"));
  assert.equal(dom.window.document.querySelector("h1").textContent, "示例用户");
});

test("keeps a user display name that matches an interface label", () => {
  const dom = new JSDOM(`<!doctype html><div id="root"><nav><a>Users</a></nav><main><h1>Agent</h1><span>ALL-TIME TOKENS</span></main></div>`, { url: "http://localhost:3100/YOU/u/local" });
  translateSubtree(dom.window.document.querySelector("#root"));
  assert.equal(dom.window.document.querySelector("main h1").textContent, "Agent");
  assert.equal(dom.window.document.querySelector("main span").textContent, "累计 Token 用量");
});

test("translates settings navigation and profile controls without changing account data", () => {
  const dom = page(`<aside><a>Back to app</a><a>Environments</a><a>Access</a><a>Export</a><a>Import</a><a>Experimental</a><a>Plugins</a><a>Adapters</a></aside>
    <main><h1>Profile</h1><p>Control how your account appears in the sidebar and other board surfaces.</p>
    <button>Change photo</button><p>Click the avatar to upload a new image. Stored in Paperclip file storage for 示例组织.</p>
    <label>Display name</label><input value="示例用户"><label>Email</label><input value="demo@example.invalid">
    <p>Shown in the sidebar account footer and comment author surfaces.</p>
    <p>Email is managed by your auth session and is read-only here.</p><button>Save profile</button>
    <h2>Keyboard shortcuts</h2><p>Enable app keyboard shortcuts, including inbox navigation and global shortcuts like creating tasks or toggling panels. This applies only to your account, across all organizations and devices. Off by default.</p>
    <h2>Let agents tidy my inbox</h2><p>Choose whether the agents you manage may archive tasks out of your inbox on your behalf. You can undo any archive, and every agent archive is attributed in the task's properties.</p>
    <button>Any of my agents</button><small>Let any agent you manage archive tasks out of your inbox.</small><button>Only chosen agents</button>
    <small>Restrict inbox tidying to the agents you pick below.</small><button>Off</button><small>Agents can never archive tasks from your inbox.</small>
    <span>Loading inbox agent policy…</span><span>Agents allowed to tidy my inbox</span><span>Saved</span>
    </main>`);
  translateSubtree(dom.window.document.querySelector("#root"));
  const text = dom.window.document.querySelector("#root").textContent;
  for (const expected of ["返回应用", "环境", "访问控制", "导出", "导入", "实验性功能", "插件", "适配器", "更换头像", "显示名称", "电子邮箱", "保存个人资料", "键盘快捷键", "让智能体整理我的收件箱", "我管理的所有智能体", "仅指定智能体"]) assert.ok(text.includes(expected), expected);
  assert.ok(text.includes("示例组织"));
  assert.equal(dom.window.document.querySelectorAll("input")[0].value, "示例用户");
  assert.equal(dom.window.document.querySelectorAll("input")[1].value, "demo@example.invalid");
  for (const expected of ["仅允许下方选定的智能体整理收件箱。", "关闭", "智能体无法归档收件箱中的任务。", "正在加载收件箱智能体策略…", "允许整理收件箱的智能体", "已保存"]) assert.ok(text.includes(expected), expected);
});

test("translates experimental and access settings without rewriting identifiers", () => {
  const dom = page(`<main><h1>Experimental</h1><p>Opt into features that are still being evaluated before they become default behavior.</p>
    <strong>Experimental features may break at any time.</strong>
    <p>These features are opt-in and come with no compatibility guarantees. They may change, break, or be removed without notice. Avoid relying on them for critical or production workflows.</p>
    <h2>Experimental features</h2><p>Optional product features that are still being evaluated.</p>
    <div><h3>Agent Chat</h3><p>Talk to each agent in one ongoing conversation. Clarify goals and create tasks for execution.</p></div>
    <div><h3>Beta skills</h3><p>Allow agents to pin beta releases of the Paperclip core skill. Disabling this returns every agent to the default live skill without removing saved pins.</p></div>
    <h2>Instance Access</h2><p>Search users, manage instance-admin status, and control which organizations they can access.</p>
    <input placeholder="Search by name or email"><h3>Organization access</h3><p>Toggle organization membership for this user. New access defaults to an active operator membership.</p>
    <span>Current memberships</span><span>Select a user to inspect instance access.</span><code>GEMINI_API_KEY</code>
  </main>`);
  translateSubtree(dom.window.document.querySelector("#root"));
  const text = dom.window.document.querySelector("#root").textContent;
  for (const expected of ["实验性功能", "这些实验性功能可能随时失效。", "智能体聊天", "测试版技能", "实例访问控制", "组织访问权限", "当前成员关系"]) assert.ok(text.includes(expected), expected);
  assert.equal(dom.window.document.querySelector("input").placeholder, "按姓名或邮箱搜索");
  assert.ok(text.includes("GEMINI_API_KEY"));
});

test("translates general, members, secrets, import, plugin, and adapter settings", () => {
  const dom = page(`<main>
    <section><h2>Deployment and auth</h2><span>Auth readiness</span><span>Backup retention</span>
      <p>Configure how long automatic database backups are retained. Backups run roughly every hour and are compressed with gzip. Within the daily window all backups are kept; beyond that, one backup per week and one per month are preserved.</p>
      <h3>AI feedback sharing</h3><span>Always allow</span><span>Don't allow</span><span>Organization name</span>
      <p>Renaming can change this company's task ID prefix. Existing task IDs are renumbered and old task links stop resolving.</p>
      <span>Hiring</span><label>Require board approval for new hires</label><h3>Danger Zone</h3></section>
    <section><h2>Organization Members</h2><span>Invites</span><span>Pending human joins</span><span>Invite a person</span>
      <p>Generate a human invite link and choose the default access it should request.</p><span>Invite history</span></section>
    <section><h2>All secrets</h2><span>My secrets</span><span>Provider vaults</span><input placeholder="Search by name, key, ref">
      <span>Import from AWS Secrets Manager</span><p>Bring AWS-managed secrets into Paperclip as external references.</p></section>
    <section><h2>Import source</h2><p>Choose a GitHub repo or upload a local Paperclip zip package.</p>
      <span>Local zip</span><button>Choose zip</button><span>Collision strategy</span><span>Rename on conflict</span><span>Skip on conflict</span><span>Replace existing</span></section>
    <section><h2>External Adapters</h2><p>No external adapters installed</p><button>Install External Adapter</button>
      <span>Built-in Adapters</span><p>External adapters are alpha.</p><span>Package Name</span><span>Version (optional)</span></section>
    <section><h2>Plugin ID</h2><span>Plugin Key</span><span>NPM Package</span><span>Local folders</span>
      <p>This plugin does not require any settings.</p><button>Open Environments</button></section>
    <code>GH_TOKEN</code><code>arn:aws:secretsmanager:example</code>
  </main>`);
  translateSubtree(dom.window.document.querySelector("#root"));
  const text = dom.window.document.querySelector("#root").textContent;
  for (const expected of ["部署与身份验证", "备份保留期", "AI 反馈共享", "组织名称", "招聘", "危险操作", "组织成员", "邀请记录", "全部密钥", "我的密钥", "提供商密钥库", "导入来源", "冲突处理方式", "外部适配器", "插件 ID", "本地文件夹"]) assert.ok(text.includes(expected), expected);
  assert.equal(dom.window.document.querySelector("input").placeholder, "按名称、键名或引用搜索");
  assert.ok(text.includes("GH_TOKEN"));
  assert.ok(text.includes("arn:aws:secretsmanager:example"));
});

test("translates create-task dropdown chrome while preserving agent and project names", () => {
  const dom = page(`<div role="dialog"><input placeholder="Search assignees..."><button>No assignee</button><button>Me</button>
    <button><span class="truncate" title="CEO">CEO</span></button><button><span class="truncate" title="示例智能体">示例智能体</span></button>
    <input placeholder="Search projects..."><button>No project</button><button><span class="truncate" title="Onboarding">Onboarding</span></button>
    <button><span class="truncate" title="示例组织">示例组织</span></button></div>`);
  translateSubtree(dom.window.document.querySelector("#root"));
  const dialog = dom.window.document.querySelector("[role='dialog']");
  assert.equal(dialog.querySelector("input:first-child").placeholder, "搜索负责人…");
  assert.equal(dialog.querySelectorAll("input")[1].placeholder, "搜索项目…");
  assert.ok(dialog.textContent.includes("未指定负责人"));
  assert.ok(dialog.textContent.includes("无项目"));
  assert.deepEqual([...dialog.querySelectorAll("span.truncate")].map((el) => el.textContent), ["CEO", "示例智能体", "Onboarding", "示例组织"]);
});

test("observer translates new dialogs and React-style rerenders", async () => {
  const dom = page("<button id='button'>New Agent</button>");
  const doc = dom.window.document;
  const stop = observePaperclip(doc);
  assert.equal(doc.querySelector("#button").textContent, "新建智能体");

  const dialog = doc.createElement("div");
  dialog.setAttribute("role", "dialog");
  dialog.innerHTML = "<button>Cancel</button>";
  doc.querySelector("#root").append(dialog);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(dialog.querySelector("button").textContent, "取消");

  doc.querySelector("#button").textContent = "New Agent";
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(doc.querySelector("#button").textContent, "新建智能体");
  stop();
});
