import test from "node:test";
import assert from "node:assert/strict";
import { translateUiString, createPhraseIndex } from "../src/translate.js";

test("uses Paperclip AI terminology for core UI labels", () => {
  const examples = [
    ["Agent", "智能体"],
    ["Agents", "智能体"],
    ["Agents Enabled", "已启用的智能体"],
    ["New Agent", "新建智能体"],
    ["Model", "模型"],
    ["Tool", "工具"],
    ["Skill", "技能"],
    ["Prompt", "提示词"],
    ["Workflow", "工作流"],
    ["Heartbeat", "心跳"],
  ];
  for (const [source, expected] of examples) {
    assert.equal(translateUiString(source), expected, source);
  }
});

test("translates common Paperclip pages and onboarding controls", () => {
  const examples = [
    ["Dashboard", "仪表盘"],
    ["Tasks", "任务"],
    ["Projects", "项目"],
    ["Settings", "设置"],
    ["Tasks In Progress", "进行中的任务"],
    ["Create your first company", "创建你的第一家公司"],
    ["Select how this agent will run tasks.", "选择这个智能体执行任务的方式。"],
    ["Select an organization to view agents.", "选择一个组织以查看智能体。"],
    ["No tasks yet.", "还没有任务。"],
    ["Save", "保存"],
    ["Cancel", "取消"],
  ];
  for (const [source, expected] of examples) {
    assert.equal(translateUiString(source), expected, source);
  }
});

test("translates every fixed label in the new-agent wizard", () => {
  const examples = [
    ["New agent progress", "新建智能体进度"],
    ["1. Name", "1. 名称"],
    ["2. Adapter", "2. 适配器"],
    ["Meet your next agent", "认识你的新智能体"],
    ["Start with a name. Make them your own.", "先给它起个名字，让它成为你的专属智能体。"],
    ["e.g. Darnold", "例如：Darnold"],
    ["Invite an external agent", "邀请外部智能体"],
    ["Choose adapter", "选择适配器"],
    ["Choose an adapter", "选择适配器"],
    ["How should gemini work?", "gemini 应如何工作？"],
    ["Configure agent", "配置智能体"],
    ["Generate a one-time onboarding prompt for an external agent. An organization admin must approve its join request before it can claim an API key.", "为外部智能体生成一次性接入提示词。该智能体必须先由组织管理员批准加入申请，才能获取 API Key。"],
    ["Optional message for the agent", "给智能体的可选消息"],
    ["Generate onboarding prompt", "生成接入提示词"],
    ["New agent", "新建智能体"],
    ["Configure your agent", "配置你的智能体"],
    ["Confirmation", "确认"],
    ["Use a Gemini API key, or an existing supported Gemini CLI login on the selected environment's host.", "使用 Gemini API Key，或使用所选环境主机上已有且受支持的 Gemini CLI 登录。"],
    ["Optional if already configured", "如已配置则可留空"],
    ["Or use an organization secret", "或使用组织密钥"],
    ["Select secret…", "选择密钥…"],
    ["New keys are saved as organization secrets when you finish setup.", "完成设置后，新密钥将保存为组织密钥。"],
    ["Default: Local", "默认：本机"],
    ["Default: GPU Lab", "默认：GPU Lab"],
    ["Finish setup", "完成设置"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("keeps ambiguous words contextual instead of replacing user prose", () => {
  assert.equal(translateUiString("Issues"), null);
  assert.equal(translateUiString("Issues", "navigation"), "任务");
  assert.equal(translateUiString("Run"), null);
  assert.equal(translateUiString("Run", "agent-action"), "运行");
  assert.equal(translateUiString("My agent runs through the night"), null);
});

test("preserves surrounding whitespace and the count in known templates", () => {
  assert.equal(translateUiString("  Agents Enabled  "), "  已启用的智能体  ");
  assert.equal(translateUiString("3 agents"), "3 个智能体");
  assert.equal(translateUiString("1 agent"), "1 个智能体");
  assert.equal(translateUiString("5 projects"), "5 个项目");
  assert.equal(translateUiString(" "), null);
});

test("translates dashboard counts and finished timestamps", () => {
  const examples = [
    ["0 running", "0 个运行中"],
    ["0 paused", "0 个已暂停"],
    ["1 errors", "1 个错误"],
    ["3 open", "3 个未完成"],
    ["2 blocked", "2 个已阻塞"],
    ["Finished 31m ago", "31 分钟前完成"],
    ["Finished 1h ago", "1 小时前完成"],
    ["just now", "刚刚"],
  ];
  for (const [source, expected] of examples) {
    assert.equal(translateUiString(source), expected, source);
  }
});

test("translates task activity status verbs without consuming a task title", () => {
  assert.equal(translateUiString("changed status to blocked on"), "将状态改为已阻塞：");
  assert.equal(translateUiString("changed status from todo to in progress on"), "将状态从待办改为进行中：");
  assert.equal(translateUiString("commented on"), "评论了");
  assert.equal(translateUiString("environment lease released"), "环境租约已释放");
  assert.equal(translateUiString("My task called blocked on"), null);
});

test("translates fixed labels on task, project, routine, and artifact pages", () => {
  const examples = [
    ["Today", "今天"],
    ["Sort:", "排序："],
    ["Add Project", "添加项目"],
    ["My Projects", "我的项目"],
    ["Leave", "退出"],
    ["Recurring work definitions that materialize into auditable execution tasks.", "将定期工作定义为可审计的执行任务。"],
    ["Create routine", "创建例行任务"],
    ["All routines", "全部例行任务"],
    ["No active routines. Use Create routine to define the first recurring workflow.", "还没有启用的例行任务。点击“创建例行任务”来定义第一个定期工作流。"],
    ["New folder", "新建文件夹"],
    ["Sort", "排序"],
    ["Group", "分组"],
    ["Images", "图片"],
    ["Videos", "视频"],
    ["Documents", "文档"],
    ["Text", "文本"],
    ["Files", "文件"],
    ["No artifact stacks yet.", "还没有产出物集合。"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates fixed labels on agent, skill, and audit pages", () => {
  const examples = [
    ["Error", "错误"],
    ["idle", "空闲"],
    ["Installed skills", "已安装的技能"],
    ["Skills available to this organization.", "此组织可用的技能。"],
    ["Most agents", "智能体最多"],
    ["New", "新建"],
    ["Loading task…", "正在加载任务…"],
    ["Review what happened, inspect agent runs, and understand the costs and budget controls behind your organization.", "查看发生的事件、检查智能体运行记录，以及了解组织的费用和预算控制。"],
    ["Runs", "运行记录"],
    ["Budgets", "预算"],
    ["Agent Actions", "智能体操作"],
    ["Responsible user", "负责人"],
    ["All responsible users", "所有负责人"],
    ["Action", "操作"],
    ["All actions", "所有操作"],
    ["Entity", "对象"],
    ["All entities", "所有对象"],
    ["From", "起始时间"],
    ["To", "结束时间"],
    ["Export CSV", "导出 CSV"],
    ["on behalf of", "代表"],
    ["View run", "查看运行记录"],
    ["Recorded by Paperclip — entries can't be edited. Sensitive values are never stored.", "由 Paperclip 记录，条目无法编辑；敏感值不会被保存。"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates agent configuration controls without altering technical identifiers", () => {
  const examples = [
    ["Agent identity", "智能体身份"],
    ["Thinking effort", "思考强度"],
    ["Environment variables", "环境变量"],
    ["Secret access", "密钥访问"],
    ["Effective access", "当前有效权限"],
    ["Trust preset", "信任预设"],
    ["Configuration Revisions", "配置修订记录"],
    ["Run 53133421", "运行 53133421"],
    ["Transcript (0)", "对话记录（0）"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
  for (const technical of ["Codex CLI", "AGENTS.md", "GET /agents/me/secrets", "GH_TOKEN", "adapter_failed"]) {
    assert.equal(translateUiString(technical), null, technical);
  }
});

test("translates connector catalog descriptions while preserving product names", () => {
  const examples = [
    ["Add account", "添加账户"],
    ["Connected", "已连接"],
    ["Connected by", "连接者"],
    ["My OpenAI subscription", "我的 OpenAI 订阅"],
    ["ChatGPT subscription", "ChatGPT 订阅"],
    ["Personal", "个人"],
    ["Connect OpenAI accounts for your agents.", "为智能体连接 OpenAI 账户。"],
    ["Connect Airtable's provider-hosted MCP server.", "连接 Airtable 托管的 MCP 服务器。"],
    ["Use the tools exposed by your Arcade MCP connection.", "使用 Arcade MCP 连接提供的工具。"],
    ["Use Anthropic APIs with a restricted key.", "通过受限密钥使用 Anthropic API。"],
    ["Read code and pull requests, comment on issues.", "读取代码和拉取请求，并评论 GitHub 议题。"],
    ["Connect You.com's provider-hosted MCP server.", "连接 You.com 托管的 MCP 服务器。"],
    ["Connect", "连接"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates remaining current connector descriptions without translating brand names", () => {
  const examples = [
    ["Discover and use connected apps through Composio Connect.", "通过 Composio Connect 发现并使用已连接的应用。"],
    ["Search meeting transcripts, read summaries and action items, and connect meeting-ready routines.", "搜索会议转录、阅读摘要和待办事项，并连接会议相关的例行任务。"],
    ["Search and read Gmail messages and create drafts without enabling mail sending.", "搜索和阅读 Gmail 邮件并创建草稿，不启用邮件发送。"],
    ["Read calendars and manage Google Calendar events.", "读取日历并管理 Google Calendar 日程。"],
    ["Search and read Google Chat conversations and send messages.", "搜索和阅读 Google Chat 对话并发送消息。"],
    ["Read and update Google Docs documents.", "读取和更新 Google Docs 文档。"],
    ["Search, read, create, and copy files in Google Drive.", "在 Google Drive 中搜索、读取、创建和复制文件。"],
    ["Search contacts and directory profiles with the Google People API.", "通过 Google People API 搜索联系人和通讯录资料。"],
    ["Read and update Google Sheets spreadsheets.", "读取和更新 Google Sheets 表格。"],
    ["Read and update Google Slides presentations.", "读取和更新 Google Slides 演示文稿。"],
    ["Search Gmail, Drive, Calendar, and Chat through one read-only Google Workspace search tool.", "通过一个只读的 Google Workspace 搜索工具查询 Gmail、Drive、Calendar 和 Chat。"],
    ["Create, update, and read Linear issues.", "创建、更新和读取 Linear 议题。"],
    ["Read and update pages in your Notion workspace.", "读取和更新 Notion 工作区中的页面。"],
    ["Analyze product usage, errors, feature flags, and experiments with PostHog's hosted MCP server.", "通过 PostHog 托管的 MCP 服务器分析产品使用情况、错误、功能开关和实验。"],
    ["Inspect services and logs, deploy applications, and run commands in your Railway containers.", "检查服务和日志、部署应用，并在 Railway 容器中运行命令。"],
    ["Investigate errors, releases, and production issues.", "排查错误、版本发布和生产环境问题。"],
    ["Search a store's products and policies, and manage shopping carts.", "搜索商店商品和政策，并管理购物车。"],
    ["Send and read messages in your team's channels.", "在团队频道中发送和阅读消息。"],
    ["Reach thousands of apps through your Zapier account.", "通过 Zapier 账户连接数千个应用。"],
    ["Connect your own tool", "连接你自己的工具"],
    ["Add a custom MCP server or paste an existing configuration.", "添加自定义 MCP 服务器，或粘贴现有配置。"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
  for (const brand of ["Google Calendar", "Hugging Face", "OpenAI"]) assert.equal(translateUiString(brand), null, brand);
});

test("translates audit activity verbs without replacing names or identifiers", () => {
  const examples = [
    ["cancelled heartbeat for", "取消了心跳："],
    ["created document for", "为其创建了文档："],
    ["added reviewer CEO to", "添加 CEO 为审核人："],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
  assert.equal(translateUiString("issue.read_marked"), null);
});

test("translates task and project detail controls and dynamic run summaries", () => {
  const examples = [
    ["Blocked by", "被以下任务阻塞"],
    ["Still blocked by", "仍被以下任务阻塞"],
    ["Stopped", "已停止"],
    ["Worked", "已执行"],
    ["Run failed", "运行失败"],
    ["Try again", "重试"],
    ["Configuration", "配置"],
    ["updated 3h ago", "3 小时前更新"],
    ["failed · 1h ago", "失败 · 1 小时前"],
    ["1m 34s · 17 tools", "1 分 34 秒 · 17 个工具"],
    ["45s · 2 tools", "45 秒 · 2 个工具"],
    ["Message CEO — describe what you want done…", "给 CEO 发消息——描述你希望完成的工作…"],
    ["The run failed (process_lost). You can retry this message now.", "运行失败（process_lost）。你现在可以重试这条消息。"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates agent detail labels while leaving provider names alone", () => {
  const examples = [
    ["Assign Task", "分配任务"],
    ["Run now", "立即运行"],
    ["Run with provider trace", "运行并记录提供方跟踪信息"],
    ["Clear error", "清除错误"],
    ["Latest Run", "最近一次运行"],
    ["Identity", "身份"],
    ["Role", "角色"],
    ["Title", "头衔"],
    ["Not set", "未设置"],
    ["Direct reports", "直接下属"],
    ["Harness / Runtime", "执行器 / 运行环境"],
    ["Configure", "配置"],
    ["Adapter", "适配器"],
    ["Adapter default", "适配器默认值"],
    ["Session", "会话"],
    ["Last run", "上次运行"],
    ["Capabilities", "能力"],
    ["No capability summary has been added.", "尚未添加能力摘要。"],
    ["Manage", "管理"],
    ["No skills enabled.", "未启用技能。"],
    ["See All →", "查看全部 →"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
  assert.equal(translateUiString("Codex"), null);
});

test("translates organization settings and safety controls", () => {
  const examples = [
    ["Logo", "标志"],
    ["Hiring", "招聘"],
    ["Require board approval for new hires", "新聘智能体须经管理者审批"],
    ["Interaction governance", "交互治理"],
    ["Thread interactions are open by default:", "任务对话交互默认开放："],
    ["Anyone", "任何人"],
    ["Default policy", "默认策略"],
    ["Human only", "仅限人工"],
    ["Suggested tasks", "建议的任务"],
    ["Anyone (default)", "任何人（默认）"],
    ["No cap", "无上限"],
    ["Ask user questions", "向用户提问"],
    ["Checkbox confirmations", "勾选确认"],
    ["Item verdicts", "逐项裁决"],
    ["Connection requests", "连接请求"],
    ["Deployment and auth", "部署与身份验证"],
    ["Local trusted", "本地可信"],
    ["Auth readiness", "认证就绪状态"],
    ["Bootstrap invite", "初始化邀请"],
    ["Censor username in logs", "在日志中隐藏用户名"],
    ["Backup retention", "备份保留期"],
    ["AI feedback sharing", "AI 反馈共享"],
    ["Danger Zone", "危险操作"],
    ["Archive organization", "归档组织"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates cost and budget audit labels", () => {
  const examples = [
    ["Inference spend, platform fees, credits, and live quota windows.", "推理费用、平台收费、抵扣额和实时配额窗口。"],
    ["Month to Date", "本月至今"],
    ["Last 7 Days", "最近 7 天"],
    ["Last 30 Days", "最近 30 天"],
    ["Year to Date", "今年至今"],
    ["All Time", "全部时间"],
    ["No monthly cap configured", "未设置每月上限"],
    ["Finance net", "财务净额"],
    ["Finance events", "财务事件"],
    ["Providers", "提供商"],
    ["Billers", "账单方"],
    ["Finance", "财务"],
    ["Inference ledger", "推理流水"],
    ["Finance ledger", "财务流水"],
    ["Debits", "支出"],
    ["Credits", "抵扣"],
    ["Net", "净额"],
    ["Estimated", "估算"],
    ["By agent", "按智能体"],
    ["By project", "按项目"],
    ["Recent financial events", "最近财务事件"],
    ["Budget control plane", "预算控制面板"],
    ["Active incidents", "当前超额事件"],
    ["Pending approvals", "待审批"],
    ["Paused agents", "已暂停的智能体"],
    ["Paused projects", "已暂停的项目"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates settings explanations and retention choices", () => {
  const examples = [
    ["in the organization — the board or any agent, including the one that asked — can respond. Narrow a kind only when you need to.", "组织中的管理者或任何智能体（包括发起请求的智能体）都可以响应。仅在必要时限制某类交互。"],
    ["is the audience new cards get when the requester does not ask for one;", "是请求者未指定时，新卡片默认采用的响应对象；"],
    ["Cap", "上限"],
    ["Kind", "类型"],
    ["Confirmations", "确认"],
    ["Local trusted mode is optimized for a local operator. Browser requests run as local board context and no sign-in is required.", "本地可信模式面向本机操作者。浏览器请求以本地管理者身份运行，无需登录。"],
    ["Ready", "已就绪"],
    ["Bootstrap status", "初始化状态"],
    ["None", "无"],
    ["Daily", "每天"],
    ["Weekly", "每周"],
    ["Monthly", "每月"],
    ["days", "天"],
    ["1 week", "1 周"],
    ["2 weeks", "2 周"],
    ["4 weeks", "4 周"],
    ["1 month", "1 个月"],
    ["3 months", "3 个月"],
    ["6 months", "6 个月"],
    ["Always allow", "始终允许"],
    ["Don't allow", "不允许"],
    ["Read our terms of service", "阅读服务条款"],
    ["Share voted AI outputs automatically.", "自动共享已评价的 AI 输出。"],
    ["Keep voted AI outputs local only.", "已评价的 AI 输出仅保存在本地。"],
    ["Archive this organization to hide it from the sidebar. This persists in the database.", "归档此组织并在侧栏中隐藏；归档状态会保存在数据库中。"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates run, cost, and budget explanations with numeric values intact", () => {
  const examples = [
    ["Recent agent executions across the organization. Open a run to inspect its transcript, output, and task context.", "组织内最近的智能体运行记录。打开一条记录可查看转录、输出和任务上下文。"],
    ["All statuses", "所有状态"],
    ["automation run", "自动运行"],
    ["assignment run", "任务分配运行"],
    ["on demand run", "按需运行"],
    ["Showing the", "显示"],
    ["most recent runs.", "条最近的运行记录。"],
    ["Request-scoped inference spend for the selected period.", "所选时段内按请求统计的推理费用。"],
    ["Account-level charges that do not map to a single inference request.", "无法归入单次推理请求的账户级费用。"],
    ["Refunds, offsets, and credit returns", "退款、抵扣和额度返还"],
    ["Debit minus credit for the selected period", "所选时段的支出减去抵扣"],
    ["Estimated debits that are not yet invoice-authoritative", "尚未经正式账单确认的估算支出"],
    ["What each agent consumed in the selected period.", "各智能体在所选时段的消耗。"],
    ["Run costs attributed through project-linked tasks.", "通过关联项目的任务归集的运行费用。"],
    ["Top-ups, fees, credits, commitments, and other non-request charges.", "充值、收费、抵扣、承诺支出及其他非请求级费用。"],
    ["Hard-stop spend limits for agents and projects. Provider subscription quota stays separate and appears under Providers.", "智能体和项目的硬性费用上限。提供商订阅配额单独计算，显示在“提供商”下。"],
    ["Open soft or hard threshold crossings", "尚未处理的软性或硬性阈值超限"],
    ["Budget override approvals awaiting board action", "等待管理者处理的预算超额审批"],
    ["Agent heartbeats blocked by budget", "因预算限制而阻止的智能体心跳"],
    ["Project execution blocked by budget", "因预算限制而阻止的项目执行"],
    ["593.9k tokens across request-scoped events", "按请求统计的事件共使用 593.9k 个 token"],
    ["$0.00 debits · $0.00 credits", "支出 $0.00 · 抵扣 $0.00"],
    ["0 total events in range", "所选时段共 0 个事件"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates remaining settings and finance explanations", () => {
  const examples = [
    ["narrows every request of that kind and can never widen one. Tool-approval confirmations always stay", "会限制该类型的所有请求，且不能放宽范围。工具审批确认始终为"],
    ["Hide the username segment in home-directory paths and similar operator-visible log output. Standalone username mentions outside of paths are not yet masked in the live transcript view. This is off by default.", "在主目录路径及类似的操作者可见日志中隐藏用户名。实时转录中路径之外单独出现的用户名尚不会被遮蔽。此功能默认关闭。"],
    ["Configure how long automatic database backups are retained. Backups run roughly every hour and are compressed with gzip. Within the daily window all backups are kept; beyond that, one backup per week and one per month are preserved.", "设置自动数据库备份的保留时长。备份约每小时运行一次，并使用 gzip 压缩。每日保留窗口内保存全部备份；超过该窗口后，每周和每月各保留一份。"],
    ["Control whether thumbs up and thumbs down votes can send the voted AI output to Paperclip Labs. Votes are always saved locally.", "控制点赞或点踩时是否可将被评价的 AI 输出发送给 Paperclip Labs。评价始终会保存在本地。"],
    ["No default is saved yet. The next thumbs up or thumbs down choice will ask once and then save the answer here.", "尚未保存默认选项。下次点赞或点踩时会询问一次，并在此保存你的选择。"],
    ["Sign out of this Paperclip instance. You will be redirected to the login page.", "退出此 Paperclip 实例，并跳转到登录页面。"],
    ["Custom", "自定义"],
    ["Inference spend", "推理费用"],
    ["usage", "用量"],
    ["No finance events yet. Add account-level charges once biller invoices or credits land.", "还没有财务事件。收到账单方发票或抵扣额度后，可添加账户级费用。"],
    ["No budget policies yet. Set agent and project budgets from their detail pages, or use the existing organization monthly budget control.", "还没有预算策略。可在智能体和项目详情页设置预算，或使用现有的组织每月预算控制。"],
    ["$0.00 estimated in range", "所选时段估算 $0.00"],
    ["13m 27s", "13 分 27 秒"],
    ["57s", "57 秒"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("translates inline developer and cost fragments while preserving code and amounts", () => {
  const examples = [
    ["To retest the first-use prompt in local dev, remove the", "要在本地开发环境重新测试首次使用提示，请移除"],
    ["key from the", "键，位置在"],
    ["JSON row for this instance, or set it back to", "此实例的 JSON 记录中；也可将其设回"],
    [". Unset and", "。未设置以及"],
    ["both mean no default has been chosen yet.", "都表示尚未选择默认选项。"],
    ["· out", "· 输出"],
    ["0 api", "0 次 API 调用"],
    ["1 subscription", "1 次订阅用量"],
  ];
  for (const [source, expected] of examples) assert.equal(translateUiString(source), expected, source);
});

test("rejects duplicate source and context combinations", () => {
  assert.throws(
    () => createPhraseIndex([
      { source: "Agent", target: "智能体" },
      { source: "Agent", target: "代理" },
    ]),
    /duplicate.*Agent/i,
  );
  assert.doesNotThrow(() => createPhraseIndex([
    { source: "Run", target: "运行", context: "agent-action" },
    { source: "Run", target: "运行记录", context: "history" },
  ]));
});
