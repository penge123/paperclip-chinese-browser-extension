(() => {
  // src/site.js
  function isPaperclipDocument(doc, location2) {
    if (location2.protocol !== "http:") return false;
    if (location2.hostname !== "localhost" && location2.hostname !== "127.0.0.1") return false;
    return Boolean(
      doc.querySelector('meta[name="apple-mobile-web-app-title"][content="Paperclip"]') && doc.querySelector("#root")
    );
  }

  // src/phrases.js
  var GLOSSARY = Object.freeze({
    Agent: "\u667A\u80FD\u4F53",
    Model: "\u6A21\u578B",
    Tool: "\u5DE5\u5177",
    Skill: "\u6280\u80FD",
    Prompt: "\u63D0\u793A\u8BCD",
    Workflow: "\u5DE5\u4F5C\u6D41",
    Heartbeat: "\u5FC3\u8DF3"
  });
  var common = [
    // Navigation and shared controls
    ["Dashboard", "\u4EEA\u8868\u76D8"],
    ["DASHBOARD", "\u4EEA\u8868\u76D8"],
    ["INBOX", "\u6536\u4EF6\u7BB1"],
    ["TASKS", "\u4EFB\u52A1"],
    ["PROJECTS", "\u9879\u76EE"],
    ["ROUTINES", "\u4F8B\u884C\u4EFB\u52A1"],
    ["ARTIFACTS", "\u4EA7\u51FA\u7269"],
    ["AGENTS", "\u667A\u80FD\u4F53"],
    ["SKILLS", "\u6280\u80FD"],
    ["CONNECTORS", "\u8FDE\u63A5\u5668"],
    ["AUDIT", "\u5BA1\u8BA1"],
    ["Work", "\u5DE5\u4F5C"],
    ["Org", "\u7EC4\u7EC7"],
    ["Recent Tasks", "\u6700\u8FD1\u4EFB\u52A1"],
    ["SEARCH", "\u641C\u7D22"],
    ["Relevance", "\u76F8\u5173\u6027"],
    ["Recently updated", "\u6700\u8FD1\u66F4\u65B0"],
    ["Newest created", "\u6700\u65B0\u521B\u5EFA"],
    ["Sort by", "\u6392\u5E8F\u4F9D\u636E"],
    ["Sort results", "\u6392\u5E8F\u641C\u7D22\u7ED3\u679C"],
    ["Open account menu", "\u6253\u5F00\u8D26\u6237\u83DC\u5355"],
    ["View profile", "\u67E5\u770B\u4E2A\u4EBA\u8D44\u6599"],
    ["Edit profile", "\u7F16\u8F91\u4E2A\u4EBA\u8D44\u6599"],
    ["Documentation", "\u6587\u6863"],
    ["Switch to light mode", "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F"],
    ["Switch to dark mode", "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F"],
    ["New agent progress", "\u65B0\u5EFA\u667A\u80FD\u4F53\u8FDB\u5EA6"],
    ["1. Name", "1. \u540D\u79F0"],
    ["2. Adapter", "2. \u9002\u914D\u5668"],
    ["Meet your next agent", "\u8BA4\u8BC6\u4F60\u7684\u65B0\u667A\u80FD\u4F53"],
    ["Start with a name. Make them your own.", "\u5148\u7ED9\u5B83\u8D77\u4E2A\u540D\u5B57\uFF0C\u8BA9\u5B83\u6210\u4E3A\u4F60\u7684\u4E13\u5C5E\u667A\u80FD\u4F53\u3002"],
    ["e.g. Darnold", "\u4F8B\u5982\uFF1ADarnold"],
    ["Invite an external agent", "\u9080\u8BF7\u5916\u90E8\u667A\u80FD\u4F53"],
    ["Choose adapter", "\u9009\u62E9\u9002\u914D\u5668"],
    ["Choose an adapter", "\u9009\u62E9\u9002\u914D\u5668"],
    ["Loading adapters\u2026", "\u6B63\u5728\u52A0\u8F7D\u9002\u914D\u5668\u2026"],
    ["Configure agent", "\u914D\u7F6E\u667A\u80FD\u4F53"],
    ["Generate a one-time onboarding prompt for an external agent. An organization admin must approve its join request before it can claim an API key.", "\u4E3A\u5916\u90E8\u667A\u80FD\u4F53\u751F\u6210\u4E00\u6B21\u6027\u63A5\u5165\u63D0\u793A\u8BCD\u3002\u8BE5\u667A\u80FD\u4F53\u5FC5\u987B\u5148\u7531\u7EC4\u7EC7\u7BA1\u7406\u5458\u6279\u51C6\u52A0\u5165\u7533\u8BF7\uFF0C\u624D\u80FD\u83B7\u53D6 API Key\u3002"],
    ["Optional message for the agent", "\u7ED9\u667A\u80FD\u4F53\u7684\u53EF\u9009\u6D88\u606F"],
    ["Generate onboarding prompt", "\u751F\u6210\u63A5\u5165\u63D0\u793A\u8BCD"],
    ["Generating\u2026", "\u6B63\u5728\u751F\u6210\u2026"],
    ["Agent onboarding prompt", "\u667A\u80FD\u4F53\u63A5\u5165\u63D0\u793A\u8BCD"],
    ["Send this one-time prompt to the agent that should join your organization.", "\u5C06\u8FD9\u6BB5\u4E00\u6B21\u6027\u63D0\u793A\u8BCD\u53D1\u9001\u7ED9\u9700\u8981\u52A0\u5165\u4F60\u7EC4\u7EC7\u7684\u667A\u80FD\u4F53\u3002"],
    ["Clipboard unavailable. Copy the prompt manually from the field above.", "\u65E0\u6CD5\u4F7F\u7528\u526A\u8D34\u677F\u3002\u8BF7\u4ECE\u4E0A\u65B9\u5B57\u6BB5\u624B\u52A8\u590D\u5236\u63D0\u793A\u8BCD\u3002"],
    ["Copied prompt", "\u5DF2\u590D\u5236\u63D0\u793A\u8BCD"],
    ["Copy prompt", "\u590D\u5236\u63D0\u793A\u8BCD"],
    ["New agent", "\u65B0\u5EFA\u667A\u80FD\u4F53"],
    ["Configure your agent", "\u914D\u7F6E\u4F60\u7684\u667A\u80FD\u4F53"],
    ["Confirmation", "\u786E\u8BA4"],
    ["Use a Gemini API key, or an existing supported Gemini CLI login on the selected environment's host.", "\u4F7F\u7528 Gemini API Key\uFF0C\u6216\u4F7F\u7528\u6240\u9009\u73AF\u5883\u4E3B\u673A\u4E0A\u5DF2\u6709\u4E14\u53D7\u652F\u6301\u7684 Gemini CLI \u767B\u5F55\u3002"],
    ["Optional if already configured", "\u5982\u5DF2\u914D\u7F6E\u5219\u53EF\u7559\u7A7A"],
    ["Or use an organization secret", "\u6216\u4F7F\u7528\u7EC4\u7EC7\u5BC6\u94A5"],
    ["Select secret\u2026", "\u9009\u62E9\u5BC6\u94A5\u2026"],
    ["New keys are saved as organization secrets when you finish setup.", "\u5B8C\u6210\u8BBE\u7F6E\u540E\uFF0C\u65B0\u5BC6\u94A5\u5C06\u4FDD\u5B58\u4E3A\u7EC4\u7EC7\u5BC6\u94A5\u3002"],
    ["Environment", "\u73AF\u5883"],
    ["Default: Local", "\u9ED8\u8BA4\uFF1A\u672C\u673A"],
    ["Finish setup", "\u5B8C\u6210\u8BBE\u7F6E"],
    ["Search tasks...", "\u641C\u7D22\u4EFB\u52A1\u2026"],
    ["Recovery needed", "\u9700\u8981\u6062\u590D"],
    ["Recovery needed \u2014 open the source task to act.", "\u9700\u8981\u6062\u590D \u2014 \u6253\u5F00\u6E90\u4EFB\u52A1\u4EE5\u5904\u7406\u3002"],
    ["Recovery needed \u2014 retries used up", "\u9700\u8981\u6062\u590D \u2014 \u91CD\u8BD5\u6B21\u6570\u5DF2\u7528\u5C3D"],
    ["Recovery needed \u2014 retries used up. Open the source task to act.", "\u9700\u8981\u6062\u590D \u2014 \u91CD\u8BD5\u6B21\u6570\u5DF2\u7528\u5C3D\u3002\u6253\u5F00\u6E90\u4EFB\u52A1\u4EE5\u5904\u7406\u3002"],
    ["Desktop task rows", "\u684C\u9762\u7AEF\u4EFB\u52A1\u884C"],
    ["Choose which task columns stay visible", "\u9009\u62E9\u8981\u663E\u793A\u7684\u4EFB\u52A1\u5217"],
    ["Columns", "\u5217"],
    ["Responsible", "\u8D1F\u8D23\u4EBA"],
    ["Kicked off by", "\u53D1\u8D77\u8005"],
    ["Workspace", "\u5DE5\u4F5C\u533A"],
    ["Parent task", "\u7236\u4EFB\u52A1"],
    ["Parent Task", "\u7236\u4EFB\u52A1"],
    ["Tags", "\u6807\u7B7E"],
    ["Last updated", "\u6700\u8FD1\u66F4\u65B0"],
    ["Task state chip on the left edge.", "\u5DE6\u4FA7\u7684\u4EFB\u52A1\u72B6\u6001\u6807\u8BB0\u3002"],
    ["Task state icon on the leading edge.", "\u5DE6\u4FA7\u7684\u4EFB\u52A1\u72B6\u6001\u56FE\u6807\u3002"],
    ["Ticket identifier like PAP-1009.", "\u4EFB\u52A1\u7F16\u53F7\uFF0C\u4F8B\u5982 PAP-1009\u3002"],
    ["Task identifier like PAP-1009 on the trailing edge.", "\u53F3\u4FA7\u7684\u4EFB\u52A1\u7F16\u53F7\uFF0C\u4F8B\u5982 PAP-1009\u3002"],
    ["Responsible agent or board user.", "\u8D1F\u8D23\u6B64\u4EFB\u52A1\u7684\u667A\u80FD\u4F53\u6216\u7BA1\u7406\u8005\u3002"],
    ["Board user or agent who created the task.", "\u521B\u5EFA\u6B64\u4EFB\u52A1\u7684\u7BA1\u7406\u8005\u6216\u667A\u80FD\u4F53\u3002"],
    ["Linked project pill with its color.", "\u5173\u8054\u9879\u76EE\u53CA\u5176\u6807\u8BC6\u989C\u8272\u3002"],
    ["Execution or project workspace used for the task.", "\u6B64\u4EFB\u52A1\u4F7F\u7528\u7684\u6267\u884C\u6216\u9879\u76EE\u5DE5\u4F5C\u533A\u3002"],
    ["Parent task identifier and title.", "\u7236\u4EFB\u52A1\u7F16\u53F7\u548C\u6807\u9898\u3002"],
    ["Task labels and tags.", "\u4EFB\u52A1\u6807\u7B7E\u3002"],
    ["Latest visible activity time.", "\u6700\u8FD1\u53EF\u89C1\u7684\u6D3B\u52A8\u65F6\u95F4\u3002"],
    ["Date group separators", "\u65E5\u671F\u5206\u7EC4\u7EBF"],
    ["Show Today, Yesterday, and Earlier rules on newest-first task lists.", "\u5728\u6309\u6700\u65B0\u65F6\u95F4\u6392\u5E8F\u7684\u4EFB\u52A1\u5217\u8868\u4E2D\u663E\u793A\u201C\u4ECA\u5929\u201D\u201C\u6628\u5929\u201D\u548C\u201C\u66F4\u65E9\u201D\u7684\u5206\u7EC4\u7EBF\u3002"],
    ["Reset defaults", "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E"],
    ["status, id, updated", "\u72B6\u6001\u3001\u7F16\u53F7\u3001\u66F4\u65B0\u65F6\u95F4"],
    ["Filters", "\u7B5B\u9009"],
    ["Filter", "\u7B5B\u9009"],
    ["Quick filters", "\u5FEB\u6377\u7B5B\u9009"],
    ["Visibility", "\u53EF\u89C1\u8303\u56F4"],
    ["No responsible", "\u65E0\u8D1F\u8D23\u4EBA"],
    ["Creator", "\u521B\u5EFA\u8005"],
    ["Search creators...", "\u641C\u7D22\u521B\u5EFA\u8005\u2026"],
    ["No creators match.", "\u6CA1\u6709\u5339\u914D\u7684\u521B\u5EFA\u8005\u3002"],
    ["Live runs only", "\u4EC5\u663E\u793A\u6B63\u5728\u8FD0\u884C\u7684\u4EFB\u52A1"],
    ["Hide routine runs", "\u9690\u85CF\u4F8B\u884C\u4EFB\u52A1\u7684\u8FD0\u884C"],
    ["List view", "\u5217\u8868\u89C6\u56FE"],
    ["Board view", "\u770B\u677F\u89C6\u56FE"],
    ["Enable parent-child nesting", "\u542F\u7528\u7236\u5B50\u4EFB\u52A1\u5D4C\u5957"],
    ["Disable parent-child nesting", "\u5173\u95ED\u7236\u5B50\u4EFB\u52A1\u5D4C\u5957"],
    ["Cancelled", "\u5DF2\u53D6\u6D88"],
    ["Label", "\u6807\u7B7E"],
    ["Comment", "\u8BC4\u8BBA"],
    ["Doc", "\u6587\u6863"],
    ["Artifact", "\u4EA7\u51FA\u7269"],
    ["No options", "\u6CA1\u6709\u53EF\u9009\u9879"],
    ["Open items", "\u672A\u5173\u95ED\u7684\u4EFB\u52A1"],
    ["Clear all filters", "\u6E05\u9664\u6240\u6709\u7B5B\u9009\u6761\u4EF6"],
    ["Search assignees\u2026", "\u641C\u7D22\u8D1F\u8D23\u4EBA\u2026"],
    ["Search assignees...", "\u641C\u7D22\u8D1F\u8D23\u4EBA\u2026"],
    ["Search projects\u2026", "\u641C\u7D22\u9879\u76EE\u2026"],
    ["Search projects...", "\u641C\u7D22\u9879\u76EE\u2026"],
    ["Search labels\u2026", "\u641C\u7D22\u6807\u7B7E\u2026"],
    ["No assignees", "\u6CA1\u6709\u8D1F\u8D23\u4EBA"],
    ["No assignee", "\u672A\u6307\u5B9A\u8D1F\u8D23\u4EBA"],
    ["No projects", "\u6CA1\u6709\u9879\u76EE"],
    ["No project", "\u65E0\u9879\u76EE"],
    ["No labels", "\u6CA1\u6709\u6807\u7B7E"],
    ["Add reviewer, approver, or watchdog", "\u6DFB\u52A0\u5BA1\u9605\u8005\u3001\u5BA1\u6279\u8005\u6216\u76D1\u7763\u8005"],
    ["editable markdown", "\u53EF\u7F16\u8F91\u7684 Markdown \u5185\u5BB9"],
    ["Recent Activity", "\u6700\u8FD1\u6D3B\u52A8"],
    ["Routines", "\u4F8B\u884C\u4EFB\u52A1"],
    ["Artifacts", "\u4EA7\u51FA\u7269"],
    ["Search artifacts...", "\u641C\u7D22\u4EA7\u51FA\u7269\u2026"],
    ["Installed", "\u5DF2\u5B89\u88C5"],
    ["Discover", "\u53D1\u73B0"],
    ["AUTHOR", "\u521B\u4F5C"],
    ["Author", "\u521B\u4F5C"],
    ["Skills you create, edit, and test.", "\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u6D4B\u8BD5\u4F60\u81EA\u5DF1\u7684\u6280\u80FD\u3002"],
    ["My Skills", "\u6211\u7684\u6280\u80FD"],
    ["Search installed skills", "\u641C\u7D22\u5DF2\u5B89\u88C5\u7684\u6280\u80FD"],
    ["Search installed skills\u2026", "\u641C\u7D22\u5DF2\u5B89\u88C5\u7684\u6280\u80FD\u2026"],
    ["Search discoverable skills", "\u641C\u7D22\u53EF\u53D1\u73B0\u7684\u6280\u80FD"],
    ["Search discoverable skills\u2026", "\u641C\u7D22\u53EF\u53D1\u73B0\u7684\u6280\u80FD\u2026"],
    ["Discover skills", "\u53D1\u73B0\u6280\u80FD"],
    ["Browse skills from every available source.", "\u6D4F\u89C8\u6240\u6709\u53EF\u7528\u6765\u6E90\u7684\u6280\u80FD\u3002"],
    ["Most agents", "\u667A\u80FD\u4F53\u6700\u591A"],
    ["Most stars", "\u661F\u6807\u6700\u591A"],
    ["Most forks", "\u590D\u523B\u6700\u591A"],
    ["Alphabetical", "\u6309\u5B57\u6BCD\u987A\u5E8F"],
    ["Create new skill", "\u65B0\u5EFA\u6280\u80FD"],
    ["Import from path or URL", "\u4ECE\u8DEF\u5F84\u6216\u7F51\u5740\u5BFC\u5165"],
    ["Import skills from project", "\u4ECE\u9879\u76EE\u5BFC\u5165\u6280\u80FD"],
    ["Scan project workspaces for skills", "\u626B\u63CF\u9879\u76EE\u5DE5\u4F5C\u533A\u4E2D\u7684\u6280\u80FD"],
    ["All sources", "\u6240\u6709\u6765\u6E90"],
    ["Source", "\u6765\u6E90"],
    ["Select skill", "\u9009\u62E9\u6280\u80FD"],
    ["Loading skills...", "\u6B63\u5728\u52A0\u8F7D\u6280\u80FD\u2026"],
    ["Create a new skill", "\u65B0\u5EFA\u6280\u80FD"],
    ["No installed skills yet. Discover a skill or create one.", "\u5C1A\u672A\u5B89\u88C5\u6280\u80FD\u3002\u53EF\u4EE5\u53D1\u73B0\u6216\u521B\u5EFA\u6280\u80FD\u3002"],
    ["No skills are available to discover yet.", "\u76EE\u524D\u6CA1\u6709\u53EF\u53D1\u73B0\u7684\u6280\u80FD\u3002"],
    ["No skills match your filters.", "\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u6761\u4EF6\u7684\u6280\u80FD\u3002"],
    ["No skills in this view yet.", "\u6B64\u89C6\u56FE\u4E2D\u6682\u65E0\u6280\u80FD\u3002"],
    ["Audit", "\u5BA1\u8BA1"],
    ["New", "\u65B0\u5EFA"],
    ["Loading task\u2026", "\u6B63\u5728\u52A0\u8F7D\u4EFB\u52A1\u2026"],
    ["Blocked by", "\u88AB\u4EE5\u4E0B\u4EFB\u52A1\u963B\u585E"],
    ["Still blocked by", "\u4ECD\u88AB\u4EE5\u4E0B\u4EFB\u52A1\u963B\u585E"],
    ["Stopped", "\u5DF2\u505C\u6B62"],
    ["Worked", "\u5DF2\u6267\u884C"],
    ["Run failed", "\u8FD0\u884C\u5931\u8D25"],
    ["Trace incomplete", "\u8DDF\u8E2A\u4FE1\u606F\u4E0D\u5B8C\u6574"],
    ["Inspect run", "\u68C0\u67E5\u8FD0\u884C"],
    ["Re-run with provider trace", "\u91CD\u65B0\u8FD0\u884C\u5E76\u8BB0\u5F55\u63D0\u4F9B\u65B9\u8DDF\u8E2A\u4FE1\u606F"],
    ["On behalf of", "\u4EE3\u8868"],
    ["GitHub identity history", "GitHub \u8EAB\u4EFD\u5386\u53F2"],
    ["No persisted transcript for this run.", "\u6B64\u6B21\u8FD0\u884C\u6CA1\u6709\u4FDD\u5B58\u5BF9\u8BDD\u8BB0\u5F55\u3002"],
    ["Waiting for transcript...", "\u6B63\u5728\u7B49\u5F85\u5BF9\u8BDD\u8BB0\u5F55\u2026"],
    ["Failure details", "\u5931\u8D25\u8BE6\u60C5"],
    ["Error:", "\u9519\u8BEF\uFF1A"],
    ["adapter result JSON", "\u9002\u914D\u5668\u7ED3\u679C JSON"],
    ["stderr excerpt", "\u6807\u51C6\u9519\u8BEF\u8F93\u51FA\u6458\u5F55"],
    ["stdout excerpt", "\u6807\u51C6\u8F93\u51FA\u6458\u5F55"],
    ["Nice", "\u6613\u8BFB"],
    ["Raw", "\u539F\u59CB"],
    ["On-demand", "\u6309\u9700\u89E6\u53D1"],
    ["Automation", "\u81EA\u52A8\u89E6\u53D1"],
    ["Assignment", "\u4EFB\u52A1\u5206\u914D"],
    ["RUNTIME", "\u8FD0\u884C\u73AF\u5883"],
    ["Runtime", "\u8FD0\u884C\u73AF\u5883"],
    ["GOVERNANCE", "\u6CBB\u7406"],
    ["Governance", "\u6CBB\u7406"],
    ["Secrets & variables", "\u5BC6\u94A5\u4E0E\u53D8\u91CF"],
    ["Permissions / Trust", "\u6743\u9650\u4E0E\u4FE1\u4EFB"],
    ["API Keys", "API \u5BC6\u94A5"],
    ["Revisions", "\u4FEE\u8BA2\u8BB0\u5F55"],
    ["ENTRY", "\u5165\u53E3"],
    ["markdown file", "Markdown \u6587\u4EF6"],
    ["Saved", "\u5DF2\u4FDD\u5B58"],
    ["Browse skills store", "\u6D4F\u89C8\u6280\u80FD\u5E93"],
    ["Agent identity", "\u667A\u80FD\u4F53\u8EAB\u4EFD"],
    ["AI connection", "AI \u8FDE\u63A5"],
    ["Responsible user\u2019s connection", "\u8D1F\u8D23\u4EBA\u7684\u8FDE\u63A5"],
    ["Other users\u2019 tasks use their own OpenAI connection.", "\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u4F7F\u7528\u5176\u5404\u81EA\u7684 OpenAI \u8FDE\u63A5\u3002"],
    ["For you:", "\u5BF9\u4F60\u800C\u8A00\uFF1A"],
    ["Other users\u2019 tasks use their own", "\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u4F7F\u7528\u5404\u81EA\u7684"],
    ["connection.", "\u8FDE\u63A5\u3002"],
    ["Connect another account", "\u8FDE\u63A5\u5176\u4ED6\u8D26\u6237"],
    ["Default", "\u9ED8\u8BA4"],
    ["Thinking effort", "\u601D\u8003\u5F3A\u5EA6"],
    ["Auto", "\u81EA\u52A8"],
    ["Execution engine", "\u6267\u884C\u5F15\u64CE"],
    ["Default (ACP)", "\u9ED8\u8BA4\uFF08ACP\uFF09"],
    ["Bypass sandbox", "\u7ED5\u8FC7\u6C99\u76D2"],
    ["Enable search", "\u542F\u7528\u641C\u7D22"],
    ["Fast mode", "\u5FEB\u901F\u6A21\u5F0F"],
    ["Environment variables", "\u73AF\u5883\u53D8\u91CF"],
    ["No environment variables", "\u6CA1\u6709\u73AF\u5883\u53D8\u91CF"],
    ["Add variable", "\u6DFB\u52A0\u53D8\u91CF"],
    ["Set the KEY to the env var name the process expects, for example GH_TOKEN. Choose a secret to resolve a stored value at run start. PAPERCLIP_* variables are injected automatically.", "\u5C06 KEY \u8BBE\u4E3A\u8FDB\u7A0B\u9700\u8981\u7684\u73AF\u5883\u53D8\u91CF\u540D\uFF0C\u4F8B\u5982 GH_TOKEN\u3002\u53EF\u9009\u62E9\u4E00\u4E2A\u5BC6\u94A5\uFF0C\u4EE5\u4FBF\u5728\u8FD0\u884C\u5F00\u59CB\u65F6\u89E3\u6790\u5B58\u50A8\u503C\u3002PAPERCLIP_* \u53D8\u91CF\u4F1A\u81EA\u52A8\u6CE8\u5165\u3002"],
    ["Run Policy", "\u8FD0\u884C\u7B56\u7565"],
    ["Heartbeat on interval", "\u6309\u95F4\u9694\u6267\u884C\u5FC3\u8DF3"],
    ["Advanced Run Policy", "\u9AD8\u7EA7\u8FD0\u884C\u7B56\u7565"],
    ["Secret access", "\u5BC6\u94A5\u8BBF\u95EE"],
    ["Secrets this agent can reach. Env-var bindings are injected at run start; API-access bindings are fetched on demand via the run-bound agent API and never written to the environment.", "\u6B64\u667A\u80FD\u4F53\u53EF\u8BBF\u95EE\u7684\u5BC6\u94A5\u3002\u73AF\u5883\u53D8\u91CF\u7ED1\u5B9A\u4F1A\u5728\u8FD0\u884C\u5F00\u59CB\u65F6\u6CE8\u5165\uFF1BAPI \u8BBF\u95EE\u7ED1\u5B9A\u4EC5\u5728\u9700\u8981\u65F6\u901A\u8FC7\u5F53\u524D\u8FD0\u884C\u7684\u667A\u80FD\u4F53 API \u83B7\u53D6\uFF0C\u4E0D\u5199\u5165\u73AF\u5883\u53D8\u91CF\u3002"],
    ["No secrets are bound to this agent yet.", "\u6B64\u667A\u80FD\u4F53\u5C1A\u672A\u7ED1\u5B9A\u5BC6\u94A5\u3002"],
    ["API ACCESS (NO ENV VAR)", "API \u8BBF\u95EE\uFF08\u4E0D\u4F7F\u7528\u73AF\u5883\u53D8\u91CF\uFF09"],
    ["API access (no env var)", "API \u8BBF\u95EE\uFF08\u4E0D\u4F7F\u7528\u73AF\u5883\u53D8\u91CF\uFF09"],
    ["Add API access", "\u6DFB\u52A0 API \u8BBF\u95EE\u6743\u9650"],
    ["Fetched on demand via the run-bound agent API. Never written to the environment. The agent reads them by alias through GET /agents/me/secrets.", "\u6309\u9700\u901A\u8FC7\u5F53\u524D\u8FD0\u884C\u7684\u667A\u80FD\u4F53 API \u83B7\u53D6\uFF0C\u4E0D\u5199\u5165\u73AF\u5883\u53D8\u91CF\u3002\u667A\u80FD\u4F53\u901A\u8FC7 GET /agents/me/secrets \u6309\u522B\u540D\u8BFB\u53D6\u3002"],
    ["Fetched on demand via the run-bound agent API. Never written to the environment. The agent reads them by alias through", "\u6309\u9700\u901A\u8FC7\u5F53\u524D\u8FD0\u884C\u7684\u667A\u80FD\u4F53 API \u83B7\u53D6\uFF0C\u4E0D\u5199\u5165\u73AF\u5883\u53D8\u91CF\u3002\u667A\u80FD\u4F53\u901A\u8FC7\u4EE5\u4E0B\u63A5\u53E3\u6309\u522B\u540D\u8BFB\u53D6\uFF1A"],
    ["Discard", "\u653E\u5F03\u66F4\u6539"],
    ["Save changes", "\u4FDD\u5B58\u66F4\u6539"],
    ["Effective access", "\u5F53\u524D\u6709\u6548\u6743\u9650"],
    ["This is exactly the tool set Paperclip will accept for", "\u8FD9\u6B63\u662F Paperclip \u5141\u8BB8\u8BE5\u667A\u80FD\u4F53\u4F7F\u7528\u7684\u5DE5\u5177\u96C6\uFF1A"],
    [". Profile and policy edits are reflected within ~5 seconds. The agent's prompt can narrow this list but", "\u3002\u914D\u7F6E\u548C\u7B56\u7565\u7684\u4FEE\u6539\u7EA6\u5728 5 \u79D2\u5185\u751F\u6548\u3002\u667A\u80FD\u4F53\u7684\u63D0\u793A\u8BCD\u53EF\u4EE5\u7F29\u5C0F\u6B64\u5217\u8868\uFF0C\u4F46"],
    ["cannot expand it", "\u4E0D\u80FD\u6269\u5927\u6743\u9650"],
    ["\u2014 everything else is blocked by default.", "\u2014\u2014\u5176\u4ED6\u5DE5\u5177\u9ED8\u8BA4\u5168\u90E8\u963B\u6B62\u3002"],
    ["GitHub identity", "GitHub \u8EAB\u4EFD"],
    ["Use responsible person's GitHub", "\u4F7F\u7528\u8D1F\u8D23\u4EBA\u7684 GitHub \u8D26\u6237"],
    ["At run start, Paperclip uses the personal GitHub connection of the person responsible for the task.", "\u8FD0\u884C\u5F00\u59CB\u65F6\uFF0CPaperclip \u4F7F\u7528\u4EFB\u52A1\u8D1F\u8D23\u4EBA\u7684\u4E2A\u4EBA GitHub \u8FDE\u63A5\u3002"],
    ["Connect my GitHub", "\u8FDE\u63A5\u6211\u7684 GitHub"],
    ["Use a dedicated account", "\u4F7F\u7528\u4E13\u7528\u8D26\u6237"],
    ["Installed apps", "\u5DF2\u5B89\u88C5\u7684\u5E94\u7528"],
    ["Has access means the app is permitted. Installed means its tools are added to this agent's runtime context.", "\u201C\u6709\u8BBF\u95EE\u6743\u9650\u201D\u8868\u793A\u5141\u8BB8\u4F7F\u7528\u8BE5\u5E94\u7528\uFF1B\u201C\u5DF2\u5B89\u88C5\u201D\u8868\u793A\u5176\u5DE5\u5177\u4F1A\u52A0\u5165\u6B64\u667A\u80FD\u4F53\u7684\u8FD0\u884C\u4E0A\u4E0B\u6587\u3002"],
    ["Installed for all", "\u5DF2\u4E3A\u6240\u6709\u667A\u80FD\u4F53\u5B89\u88C5"],
    ["Installed from the app page for every agent. Remove the all-agents install there.", "\u5DF2\u5728\u5E94\u7528\u9875\u9762\u4E3A\u6240\u6709\u667A\u80FD\u4F53\u5B89\u88C5\u3002\u8BF7\u5728\u8BE5\u9875\u9762\u79FB\u9664\u5168\u4F53\u5B89\u88C5\u3002"],
    ["Allowed tools", "\u5141\u8BB8\u4F7F\u7528\u7684\u5DE5\u5177"],
    ["No tools are allowed for this agent. Bind a tool profile to grant access.", "\u6B64\u667A\u80FD\u4F53\u76EE\u524D\u4E0D\u80FD\u4F7F\u7528\u4EFB\u4F55\u5DE5\u5177\u3002\u7ED1\u5B9A\u5DE5\u5177\u914D\u7F6E\u4EE5\u6388\u4E88\u6743\u9650\u3002"],
    ["Why these tools?", "\u4E3A\u4EC0\u4E48\u662F\u8FD9\u4E9B\u5DE5\u5177\uFF1F"],
    ["Access profiles", "\u8BBF\u95EE\u914D\u7F6E"],
    ["Check access", "\u68C0\u67E5\u6743\u9650"],
    ["No active profile applies to this agent, so it has no allowed tools.", "\u6CA1\u6709\u9002\u7528\u4E8E\u6B64\u667A\u80FD\u4F53\u7684\u6709\u6548\u914D\u7F6E\uFF0C\u56E0\u6B64\u6CA1\u6709\u83B7\u51C6\u4F7F\u7528\u7684\u5DE5\u5177\u3002"],
    ["Active policies", "\u751F\u6548\u4E2D\u7684\u7B56\u7565"],
    ["No enabled policy currently mutates this agent's allow list.", "\u76EE\u524D\u6CA1\u6709\u5DF2\u542F\u7528\u7684\u7B56\u7565\u66F4\u6539\u6B64\u667A\u80FD\u4F53\u7684\u5141\u8BB8\u5217\u8868\u3002"],
    ["Unavailable tools", "\u4E0D\u53EF\u7528\u7684\u5DE5\u5177"],
    ["Every known tool this agent could name is allowed.", "\u6B64\u667A\u80FD\u4F53\u53EF\u8C03\u7528\u7684\u6240\u6709\u5DF2\u77E5\u5DE5\u5177\u5747\u83B7\u51C6\u4F7F\u7528\u3002"],
    ["Tools the agent could name but Paperclip would block:", "\u667A\u80FD\u4F53\u53EF\u80FD\u8C03\u7528\u3001\u4F46\u4F1A\u88AB Paperclip \u963B\u6B62\u7684\u5DE5\u5177\uFF1A"],
    ["Debugging", "\u8C03\u8BD5"],
    ["Capture raw provider traces", "\u8BB0\u5F55\u63D0\u4F9B\u65B9\u539F\u59CB\u8DDF\u8E2A\u4FE1\u606F"],
    ["Test your agent", "\u6D4B\u8BD5\u667A\u80FD\u4F53"],
    ["Check that your runtime and model can respond.", "\u68C0\u67E5\u8FD0\u884C\u73AF\u5883\u548C\u6A21\u578B\u662F\u5426\u80FD\u591F\u54CD\u5E94\u3002"],
    ["Run test", "\u8FD0\u884C\u6D4B\u8BD5"],
    ["Permitted-only apps do not add context cost.", "\u4EC5\u83B7\u51C6\u4F7F\u7528\u3001\u672A\u5B89\u88C5\u7684\u5E94\u7528\u4E0D\u4F1A\u589E\u52A0\u4E0A\u4E0B\u6587\u5F00\u9500\u3002"],
    ["Trust", "\u4FE1\u4EFB"],
    ["Trust preset", "\u4FE1\u4EFB\u9884\u8BBE"],
    ["Standard", "\u6807\u51C6"],
    ["Low-trust review", "\u4F4E\u4FE1\u4EFB\u5EA6\u5BA1\u6838"],
    ["Organization-visible collaboration. This is the default for normal work.", "\u5728\u7EC4\u7EC7\u5185\u53EF\u89C1\u7684\u534F\u4F5C\u3002\u8FD9\u662F\u666E\u901A\u5DE5\u4F5C\u7684\u9ED8\u8BA4\u8BBE\u7F6E\u3002"],
    ["Advanced permissions remain editable through the EE permissions extension when installed.", "\u5B89\u88C5 EE \u6743\u9650\u6269\u5C55\u540E\uFF0C\u4ECD\u53EF\u7F16\u8F91\u9AD8\u7EA7\u6743\u9650\u3002"],
    ["Can create new agents", "\u53EF\u521B\u5EFA\u65B0\u667A\u80FD\u4F53"],
    ["Lets this agent create or hire agents. This also grants task assignment authority.", "\u5141\u8BB8\u6B64\u667A\u80FD\u4F53\u521B\u5EFA\u6216\u62DB\u8058\u667A\u80FD\u4F53\uFF0C\u5E76\u6388\u4E88\u4EFB\u52A1\u5206\u914D\u6743\u9650\u3002"],
    ["Can create/import skills", "\u53EF\u521B\u5EFA\u6216\u5BFC\u5165\u6280\u80FD"],
    ["Lets this agent install, import, create, and scan organization skills without creating agents.", "\u5141\u8BB8\u6B64\u667A\u80FD\u4F53\u5B89\u88C5\u3001\u5BFC\u5165\u3001\u521B\u5EFA\u548C\u626B\u63CF\u7EC4\u7EC7\u6280\u80FD\uFF0C\u65E0\u9700\u521B\u5EFA\u667A\u80FD\u4F53\u3002"],
    ["Can assign tasks", "\u53EF\u5206\u914D\u4EFB\u52A1"],
    ["Enabled automatically while this agent can create new agents.", "\u5F53\u6B64\u667A\u80FD\u4F53\u83B7\u51C6\u521B\u5EFA\u65B0\u667A\u80FD\u4F53\u65F6\u81EA\u52A8\u542F\u7528\u3002"],
    ["Create API Key", "\u521B\u5EFA API \u5BC6\u94A5"],
    ["API keys allow this agent to authenticate calls to the Paperclip server.", "API \u5BC6\u94A5\u53EF\u7528\u4E8E\u6B64\u667A\u80FD\u4F53\u5411 Paperclip \u670D\u52A1\u5668\u53D1\u8D77\u8EAB\u4EFD\u9A8C\u8BC1\u8C03\u7528\u3002"],
    ["No active API keys.", "\u6CA1\u6709\u6709\u6548\u7684 API \u5BC6\u94A5\u3002"],
    ["Configuration Revisions", "\u914D\u7F6E\u4FEE\u8BA2\u8BB0\u5F55"],
    ["No configuration revisions yet.", "\u6682\u65E0\u914D\u7F6E\u4FEE\u8BA2\u8BB0\u5F55\u3002"],
    ["Search inbox\u2026", "\u641C\u7D22\u6536\u4EF6\u7BB1\u2026"],
    ["Archive", "\u5F52\u6863"],
    ["Backlog", "\u5F85\u89C4\u5212"],
    ["In Progress", "\u8FDB\u884C\u4E2D"],
    ["Mine", "\u6211\u7684"],
    ["Unread", "\u672A\u8BFB"],
    ["Recent", "\u6700\u8FD1"],
    ["Retrying\u2026", "\u6B63\u5728\u91CD\u8BD5\u2026"],
    ["Plan mode", "\u89C4\u5212\u6A21\u5F0F"],
    ["Ask mode", "\u63D0\u95EE\u6A21\u5F0F"],
    ["Reviewer", "\u5BA1\u9605\u8005"],
    ["Approver", "\u5BA1\u6279\u8005"],
    ["Watchdog", "\u76D1\u7763\u8005"],
    ["Start date", "\u5F00\u59CB\u65E5\u671F"],
    ["Parked - assignee will not be woken", "\u6682\u5B58\u4EFB\u52A1\uFF0C\u4E0D\u4F1A\u5524\u9192\u8D1F\u8D23\u4EBA"],
    ["Executable - assignee will be woken", "\u53EF\u6267\u884C\u4EFB\u52A1\uFF0C\u4F1A\u5524\u9192\u8D1F\u8D23\u4EBA"],
    ["Try again", "\u91CD\u8BD5"],
    ["Configuration", "\u914D\u7F6E"],
    ["Assign Task", "\u5206\u914D\u4EFB\u52A1"],
    ["Run now", "\u7ACB\u5373\u8FD0\u884C"],
    ["Run with provider trace", "\u8FD0\u884C\u5E76\u8BB0\u5F55\u63D0\u4F9B\u65B9\u8DDF\u8E2A\u4FE1\u606F"],
    ["Clear error", "\u6E05\u9664\u9519\u8BEF"],
    ["Latest Run", "\u6700\u8FD1\u4E00\u6B21\u8FD0\u884C"],
    ["Identity", "\u8EAB\u4EFD"],
    ["Role", "\u89D2\u8272"],
    ["Title", "\u5934\u8854"],
    ["Not set", "\u672A\u8BBE\u7F6E"],
    ["Direct reports", "\u76F4\u63A5\u4E0B\u5C5E"],
    ["Harness / Runtime", "\u6267\u884C\u5668 / \u8FD0\u884C\u73AF\u5883"],
    ["Configure", "\u914D\u7F6E"],
    ["Adapter", "\u9002\u914D\u5668"],
    ["Adapter default", "\u9002\u914D\u5668\u9ED8\u8BA4\u503C"],
    ["Session", "\u4F1A\u8BDD"],
    ["Last run", "\u4E0A\u6B21\u8FD0\u884C"],
    ["Capabilities", "\u80FD\u529B"],
    ["No capability summary has been added.", "\u5C1A\u672A\u6DFB\u52A0\u80FD\u529B\u6458\u8981\u3002"],
    ["Manage", "\u7BA1\u7406"],
    ["No skills enabled.", "\u672A\u542F\u7528\u6280\u80FD\u3002"],
    ["See All \u2192", "\u67E5\u770B\u5168\u90E8 \u2192"],
    ["Logo", "\u6807\u5FD7"],
    ["Hiring", "\u62DB\u8058"],
    ["Require board approval for new hires", "\u65B0\u8058\u667A\u80FD\u4F53\u987B\u7ECF\u7BA1\u7406\u8005\u5BA1\u6279"],
    ["Interaction governance", "\u4EA4\u4E92\u6CBB\u7406"],
    ["Thread interactions are open by default:", "\u4EFB\u52A1\u5BF9\u8BDD\u4EA4\u4E92\u9ED8\u8BA4\u5F00\u653E\uFF1A"],
    ["Anyone", "\u4EFB\u4F55\u4EBA"],
    ["Default policy", "\u9ED8\u8BA4\u7B56\u7565"],
    ["Human only", "\u4EC5\u9650\u4EBA\u5DE5"],
    ["Suggested tasks", "\u5EFA\u8BAE\u7684\u4EFB\u52A1"],
    ["Anyone (default)", "\u4EFB\u4F55\u4EBA\uFF08\u9ED8\u8BA4\uFF09"],
    ["No cap", "\u65E0\u4E0A\u9650"],
    ["Ask user questions", "\u5411\u7528\u6237\u63D0\u95EE"],
    ["Checkbox confirmations", "\u52FE\u9009\u786E\u8BA4"],
    ["Item verdicts", "\u9010\u9879\u88C1\u51B3"],
    ["Connection requests", "\u8FDE\u63A5\u8BF7\u6C42"],
    ["Deployment and auth", "\u90E8\u7F72\u4E0E\u8EAB\u4EFD\u9A8C\u8BC1"],
    ["Local trusted", "\u672C\u5730\u53EF\u4FE1"],
    ["Auth readiness", "\u8BA4\u8BC1\u5C31\u7EEA\u72B6\u6001"],
    ["Bootstrap invite", "\u521D\u59CB\u5316\u9080\u8BF7"],
    ["Censor username in logs", "\u5728\u65E5\u5FD7\u4E2D\u9690\u85CF\u7528\u6237\u540D"],
    ["Backup retention", "\u5907\u4EFD\u4FDD\u7559\u671F"],
    ["AI feedback sharing", "AI \u53CD\u9988\u5171\u4EAB"],
    ["Danger Zone", "\u5371\u9669\u64CD\u4F5C"],
    ["Archive organization", "\u5F52\u6863\u7EC4\u7EC7"],
    ["Inference spend, platform fees, credits, and live quota windows.", "\u63A8\u7406\u8D39\u7528\u3001\u5E73\u53F0\u6536\u8D39\u3001\u62B5\u6263\u989D\u548C\u5B9E\u65F6\u914D\u989D\u7A97\u53E3\u3002"],
    ["Month to Date", "\u672C\u6708\u81F3\u4ECA"],
    ["Last 7 Days", "\u6700\u8FD1 7 \u5929"],
    ["Last 30 Days", "\u6700\u8FD1 30 \u5929"],
    ["Year to Date", "\u4ECA\u5E74\u81F3\u4ECA"],
    ["All Time", "\u5168\u90E8\u65F6\u95F4"],
    ["No monthly cap configured", "\u672A\u8BBE\u7F6E\u6BCF\u6708\u4E0A\u9650"],
    ["Finance net", "\u8D22\u52A1\u51C0\u989D"],
    ["Finance events", "\u8D22\u52A1\u4E8B\u4EF6"],
    ["Providers", "\u63D0\u4F9B\u5546"],
    ["Billers", "\u8D26\u5355\u65B9"],
    ["Finance", "\u8D22\u52A1"],
    ["Inference ledger", "\u63A8\u7406\u6D41\u6C34"],
    ["Finance ledger", "\u8D22\u52A1\u6D41\u6C34"],
    ["Debits", "\u652F\u51FA"],
    ["Credits", "\u62B5\u6263"],
    ["Net", "\u51C0\u989D"],
    ["Estimated", "\u4F30\u7B97"],
    ["By agent", "\u6309\u667A\u80FD\u4F53"],
    ["By project", "\u6309\u9879\u76EE"],
    ["Recent financial events", "\u6700\u8FD1\u8D22\u52A1\u4E8B\u4EF6"],
    ["Budget control plane", "\u9884\u7B97\u63A7\u5236\u9762\u677F"],
    ["Active incidents", "\u5F53\u524D\u8D85\u989D\u4E8B\u4EF6"],
    ["Pending approvals", "\u5F85\u5BA1\u6279"],
    ["Paused agents", "\u5DF2\u6682\u505C\u7684\u667A\u80FD\u4F53"],
    ["Paused projects", "\u5DF2\u6682\u505C\u7684\u9879\u76EE"],
    ["in the organization \u2014 the board or any agent, including the one that asked \u2014 can respond. Narrow a kind only when you need to.", "\u7EC4\u7EC7\u4E2D\u7684\u7BA1\u7406\u8005\u6216\u4EFB\u4F55\u667A\u80FD\u4F53\uFF08\u5305\u62EC\u53D1\u8D77\u8BF7\u6C42\u7684\u667A\u80FD\u4F53\uFF09\u90FD\u53EF\u4EE5\u54CD\u5E94\u3002\u4EC5\u5728\u5FC5\u8981\u65F6\u9650\u5236\u67D0\u7C7B\u4EA4\u4E92\u3002"],
    ["is the audience new cards get when the requester does not ask for one;", "\u662F\u8BF7\u6C42\u8005\u672A\u6307\u5B9A\u65F6\uFF0C\u65B0\u5361\u7247\u9ED8\u8BA4\u91C7\u7528\u7684\u54CD\u5E94\u5BF9\u8C61\uFF1B"],
    ["Cap", "\u4E0A\u9650"],
    ["Kind", "\u7C7B\u578B"],
    ["Confirmations", "\u786E\u8BA4"],
    ["Local trusted mode is optimized for a local operator. Browser requests run as local board context and no sign-in is required.", "\u672C\u5730\u53EF\u4FE1\u6A21\u5F0F\u9762\u5411\u672C\u673A\u64CD\u4F5C\u8005\u3002\u6D4F\u89C8\u5668\u8BF7\u6C42\u4EE5\u672C\u5730\u7BA1\u7406\u8005\u8EAB\u4EFD\u8FD0\u884C\uFF0C\u65E0\u9700\u767B\u5F55\u3002"],
    ["Ready", "\u5DF2\u5C31\u7EEA"],
    ["Bootstrap status", "\u521D\u59CB\u5316\u72B6\u6001"],
    ["None", "\u65E0"],
    ["Daily", "\u6BCF\u5929"],
    ["Weekly", "\u6BCF\u5468"],
    ["Monthly", "\u6BCF\u6708"],
    ["days", "\u5929"],
    ["1 week", "1 \u5468"],
    ["2 weeks", "2 \u5468"],
    ["4 weeks", "4 \u5468"],
    ["1 month", "1 \u4E2A\u6708"],
    ["3 months", "3 \u4E2A\u6708"],
    ["6 months", "6 \u4E2A\u6708"],
    ["Always allow", "\u59CB\u7EC8\u5141\u8BB8"],
    ["Don't allow", "\u4E0D\u5141\u8BB8"],
    ["Read our terms of service", "\u9605\u8BFB\u670D\u52A1\u6761\u6B3E"],
    ["Share voted AI outputs automatically.", "\u81EA\u52A8\u5171\u4EAB\u5DF2\u8BC4\u4EF7\u7684 AI \u8F93\u51FA\u3002"],
    ["Keep voted AI outputs local only.", "\u5DF2\u8BC4\u4EF7\u7684 AI \u8F93\u51FA\u4EC5\u4FDD\u5B58\u5728\u672C\u5730\u3002"],
    ["Archive this organization to hide it from the sidebar. This persists in the database.", "\u5F52\u6863\u6B64\u7EC4\u7EC7\u5E76\u5728\u4FA7\u680F\u4E2D\u9690\u85CF\uFF1B\u5F52\u6863\u72B6\u6001\u4F1A\u4FDD\u5B58\u5728\u6570\u636E\u5E93\u4E2D\u3002"],
    ["Recent agent executions across the organization. Open a run to inspect its transcript, output, and task context.", "\u7EC4\u7EC7\u5185\u6700\u8FD1\u7684\u667A\u80FD\u4F53\u8FD0\u884C\u8BB0\u5F55\u3002\u6253\u5F00\u4E00\u6761\u8BB0\u5F55\u53EF\u67E5\u770B\u8F6C\u5F55\u3001\u8F93\u51FA\u548C\u4EFB\u52A1\u4E0A\u4E0B\u6587\u3002"],
    ["All statuses", "\u6240\u6709\u72B6\u6001"],
    ["automation run", "\u81EA\u52A8\u8FD0\u884C"],
    ["assignment run", "\u4EFB\u52A1\u5206\u914D\u8FD0\u884C"],
    ["on demand run", "\u6309\u9700\u8FD0\u884C"],
    ["Showing the", "\u663E\u793A"],
    ["most recent runs.", "\u6761\u6700\u8FD1\u7684\u8FD0\u884C\u8BB0\u5F55\u3002"],
    ["Request-scoped inference spend for the selected period.", "\u6240\u9009\u65F6\u6BB5\u5185\u6309\u8BF7\u6C42\u7EDF\u8BA1\u7684\u63A8\u7406\u8D39\u7528\u3002"],
    ["Account-level charges that do not map to a single inference request.", "\u65E0\u6CD5\u5F52\u5165\u5355\u6B21\u63A8\u7406\u8BF7\u6C42\u7684\u8D26\u6237\u7EA7\u8D39\u7528\u3002"],
    ["Refunds, offsets, and credit returns", "\u9000\u6B3E\u3001\u62B5\u6263\u548C\u989D\u5EA6\u8FD4\u8FD8"],
    ["Debit minus credit for the selected period", "\u6240\u9009\u65F6\u6BB5\u7684\u652F\u51FA\u51CF\u53BB\u62B5\u6263"],
    ["Estimated debits that are not yet invoice-authoritative", "\u5C1A\u672A\u7ECF\u6B63\u5F0F\u8D26\u5355\u786E\u8BA4\u7684\u4F30\u7B97\u652F\u51FA"],
    ["What each agent consumed in the selected period.", "\u5404\u667A\u80FD\u4F53\u5728\u6240\u9009\u65F6\u6BB5\u7684\u6D88\u8017\u3002"],
    ["Run costs attributed through project-linked tasks.", "\u901A\u8FC7\u5173\u8054\u9879\u76EE\u7684\u4EFB\u52A1\u5F52\u96C6\u7684\u8FD0\u884C\u8D39\u7528\u3002"],
    ["Top-ups, fees, credits, commitments, and other non-request charges.", "\u5145\u503C\u3001\u6536\u8D39\u3001\u62B5\u6263\u3001\u627F\u8BFA\u652F\u51FA\u53CA\u5176\u4ED6\u975E\u8BF7\u6C42\u7EA7\u8D39\u7528\u3002"],
    ["Hard-stop spend limits for agents and projects. Provider subscription quota stays separate and appears under Providers.", "\u667A\u80FD\u4F53\u548C\u9879\u76EE\u7684\u786C\u6027\u8D39\u7528\u4E0A\u9650\u3002\u63D0\u4F9B\u5546\u8BA2\u9605\u914D\u989D\u5355\u72EC\u8BA1\u7B97\uFF0C\u663E\u793A\u5728\u201C\u63D0\u4F9B\u5546\u201D\u4E0B\u3002"],
    ["Open soft or hard threshold crossings", "\u5C1A\u672A\u5904\u7406\u7684\u8F6F\u6027\u6216\u786C\u6027\u9608\u503C\u8D85\u9650"],
    ["Budget override approvals awaiting board action", "\u7B49\u5F85\u7BA1\u7406\u8005\u5904\u7406\u7684\u9884\u7B97\u8D85\u989D\u5BA1\u6279"],
    ["Agent heartbeats blocked by budget", "\u56E0\u9884\u7B97\u9650\u5236\u800C\u963B\u6B62\u7684\u667A\u80FD\u4F53\u5FC3\u8DF3"],
    ["Project execution blocked by budget", "\u56E0\u9884\u7B97\u9650\u5236\u800C\u963B\u6B62\u7684\u9879\u76EE\u6267\u884C"],
    ["Add account", "\u6DFB\u52A0\u8D26\u6237"],
    ["Connect", "\u8FDE\u63A5"],
    ["narrows every request of that kind and can never widen one. Tool-approval confirmations always stay", "\u4F1A\u9650\u5236\u8BE5\u7C7B\u578B\u7684\u6240\u6709\u8BF7\u6C42\uFF0C\u4E14\u4E0D\u80FD\u653E\u5BBD\u8303\u56F4\u3002\u5DE5\u5177\u5BA1\u6279\u786E\u8BA4\u59CB\u7EC8\u4E3A"],
    ["Hide the username segment in home-directory paths and similar operator-visible log output. Standalone username mentions outside of paths are not yet masked in the live transcript view. This is off by default.", "\u5728\u4E3B\u76EE\u5F55\u8DEF\u5F84\u53CA\u7C7B\u4F3C\u7684\u64CD\u4F5C\u8005\u53EF\u89C1\u65E5\u5FD7\u4E2D\u9690\u85CF\u7528\u6237\u540D\u3002\u5B9E\u65F6\u8F6C\u5F55\u4E2D\u8DEF\u5F84\u4E4B\u5916\u5355\u72EC\u51FA\u73B0\u7684\u7528\u6237\u540D\u5C1A\u4E0D\u4F1A\u88AB\u906E\u853D\u3002\u6B64\u529F\u80FD\u9ED8\u8BA4\u5173\u95ED\u3002"],
    ["Configure how long automatic database backups are retained. Backups run roughly every hour and are compressed with gzip. Within the daily window all backups are kept; beyond that, one backup per week and one per month are preserved.", "\u8BBE\u7F6E\u81EA\u52A8\u6570\u636E\u5E93\u5907\u4EFD\u7684\u4FDD\u7559\u65F6\u957F\u3002\u5907\u4EFD\u7EA6\u6BCF\u5C0F\u65F6\u8FD0\u884C\u4E00\u6B21\uFF0C\u5E76\u4F7F\u7528 gzip \u538B\u7F29\u3002\u6BCF\u65E5\u4FDD\u7559\u7A97\u53E3\u5185\u4FDD\u5B58\u5168\u90E8\u5907\u4EFD\uFF1B\u8D85\u8FC7\u8BE5\u7A97\u53E3\u540E\uFF0C\u6BCF\u5468\u548C\u6BCF\u6708\u5404\u4FDD\u7559\u4E00\u4EFD\u3002"],
    ["Control whether thumbs up and thumbs down votes can send the voted AI output to Paperclip Labs. Votes are always saved locally.", "\u63A7\u5236\u70B9\u8D5E\u6216\u70B9\u8E29\u65F6\u662F\u5426\u53EF\u5C06\u88AB\u8BC4\u4EF7\u7684 AI \u8F93\u51FA\u53D1\u9001\u7ED9 Paperclip Labs\u3002\u8BC4\u4EF7\u59CB\u7EC8\u4F1A\u4FDD\u5B58\u5728\u672C\u5730\u3002"],
    ["No default is saved yet. The next thumbs up or thumbs down choice will ask once and then save the answer here.", "\u5C1A\u672A\u4FDD\u5B58\u9ED8\u8BA4\u9009\u9879\u3002\u4E0B\u6B21\u70B9\u8D5E\u6216\u70B9\u8E29\u65F6\u4F1A\u8BE2\u95EE\u4E00\u6B21\uFF0C\u5E76\u5728\u6B64\u4FDD\u5B58\u4F60\u7684\u9009\u62E9\u3002"],
    ["Sign out of this Paperclip instance. You will be redirected to the login page.", "\u9000\u51FA\u6B64 Paperclip \u5B9E\u4F8B\uFF0C\u5E76\u8DF3\u8F6C\u5230\u767B\u5F55\u9875\u9762\u3002"],
    ["Custom", "\u81EA\u5B9A\u4E49"],
    ["Inference spend", "\u63A8\u7406\u8D39\u7528"],
    ["usage", "\u7528\u91CF"],
    ["No finance events yet. Add account-level charges once biller invoices or credits land.", "\u8FD8\u6CA1\u6709\u8D22\u52A1\u4E8B\u4EF6\u3002\u6536\u5230\u8D26\u5355\u65B9\u53D1\u7968\u6216\u62B5\u6263\u989D\u5EA6\u540E\uFF0C\u53EF\u6DFB\u52A0\u8D26\u6237\u7EA7\u8D39\u7528\u3002"],
    ["No budget policies yet. Set agent and project budgets from their detail pages, or use the existing organization monthly budget control.", "\u8FD8\u6CA1\u6709\u9884\u7B97\u7B56\u7565\u3002\u53EF\u5728\u667A\u80FD\u4F53\u548C\u9879\u76EE\u8BE6\u60C5\u9875\u8BBE\u7F6E\u9884\u7B97\uFF0C\u6216\u4F7F\u7528\u73B0\u6709\u7684\u7EC4\u7EC7\u6BCF\u6708\u9884\u7B97\u63A7\u5236\u3002"],
    ["To retest the first-use prompt in local dev, remove the", "\u8981\u5728\u672C\u5730\u5F00\u53D1\u73AF\u5883\u91CD\u65B0\u6D4B\u8BD5\u9996\u6B21\u4F7F\u7528\u63D0\u793A\uFF0C\u8BF7\u79FB\u9664"],
    ["key from the", "\u952E\uFF0C\u4F4D\u7F6E\u5728"],
    ["JSON row for this instance, or set it back to", "\u6B64\u5B9E\u4F8B\u7684 JSON \u8BB0\u5F55\u4E2D\uFF1B\u4E5F\u53EF\u5C06\u5176\u8BBE\u56DE"],
    [". Unset and", "\u3002\u672A\u8BBE\u7F6E\u4EE5\u53CA"],
    ["both mean no default has been chosen yet.", "\u90FD\u8868\u793A\u5C1A\u672A\u9009\u62E9\u9ED8\u8BA4\u9009\u9879\u3002"],
    ["\xB7 out", "\xB7 \u8F93\u51FA"],
    ["Connected", "\u5DF2\u8FDE\u63A5"],
    ["Connected by", "\u8FDE\u63A5\u8005"],
    ["My OpenAI subscription", "\u6211\u7684 OpenAI \u8BA2\u9605"],
    ["ChatGPT subscription", "ChatGPT \u8BA2\u9605"],
    ["Personal", "\u4E2A\u4EBA"],
    ["Today", "\u4ECA\u5929"],
    ["just now", "\u521A\u521A"],
    ["Sort:", "\u6392\u5E8F\uFF1A"],
    ["Sort", "\u6392\u5E8F"],
    ["Group", "\u5206\u7EC4"],
    ["New folder", "\u65B0\u5EFA\u6587\u4EF6\u5939"],
    ["Leave", "\u9000\u51FA"],
    ["Images", "\u56FE\u7247"],
    ["Videos", "\u89C6\u9891"],
    ["Documents", "\u6587\u6863"],
    ["Text", "\u6587\u672C"],
    ["Files", "\u6587\u4EF6"],
    ["Overview", "\u6982\u89C8"],
    ["Inbox", "\u6536\u4EF6\u7BB1"],
    ["Tasks", "\u4EFB\u52A1"],
    ["Task", "\u4EFB\u52A1"],
    ["Projects", "\u9879\u76EE"],
    ["Project", "\u9879\u76EE"],
    ["Goals", "\u76EE\u6807"],
    ["Goal", "\u76EE\u6807"],
    ["Agents", "\u667A\u80FD\u4F53"],
    ["Agent", "\u667A\u80FD\u4F53"],
    ["Models", "\u6A21\u578B"],
    ["Model", "\u6A21\u578B"],
    ["Tools", "\u5DE5\u5177"],
    ["Tool", "\u5DE5\u5177"],
    ["Skills", "\u6280\u80FD"],
    ["Skill", "\u6280\u80FD"],
    ["Prompts", "\u63D0\u793A\u8BCD"],
    ["Prompt", "\u63D0\u793A\u8BCD"],
    ["Workflows", "\u5DE5\u4F5C\u6D41"],
    ["Workflow", "\u5DE5\u4F5C\u6D41"],
    ["Heartbeat", "\u5FC3\u8DF3"],
    ["Heartbeats", "\u5FC3\u8DF3"],
    ["Activity", "\u6D3B\u52A8"],
    ["Timeline", "\u65F6\u95F4\u7EBF"],
    ["Approvals", "\u5BA1\u6279"],
    ["Approval", "\u5BA1\u6279"],
    ["Costs", "\u8D39\u7528"],
    ["Budget", "\u9884\u7B97"],
    ["Settings", "\u8BBE\u7F6E"],
    ["Company", "\u516C\u53F8"],
    ["Companies", "\u516C\u53F8"],
    ["Organization", "\u7EC4\u7EC7"],
    ["Organizations", "\u7EC4\u7EC7"],
    ["Search", "\u641C\u7D22"],
    ["Notifications", "\u901A\u77E5"],
    ["Plugins", "\u63D2\u4EF6"],
    ["Adapters", "\u9002\u914D\u5668"],
    ["Connectors", "\u8FDE\u63A5\u5668"],
    ["Secrets", "\u5BC6\u94A5"],
    ["Usage", "\u7528\u91CF"],
    ["Help", "\u5E2E\u52A9"],
    ["Profile", "\u4E2A\u4EBA\u8D44\u6599"],
    ["Users", "\u7528\u6237"],
    ["Back to app", "\u8FD4\u56DE\u5E94\u7528"],
    ["Environments", "\u73AF\u5883"],
    ["Access", "\u8BBF\u95EE\u63A7\u5236"],
    ["Export", "\u5BFC\u51FA"],
    ["Import", "\u5BFC\u5165"],
    ["Experimental features", "\u5B9E\u9A8C\u6027\u529F\u80FD"],
    ["Experimental Features", "\u5B9E\u9A8C\u6027\u529F\u80FD"],
    ["ALL-TIME TOKENS", "\u7D2F\u8BA1 Token \u7528\u91CF"],
    ["OPEN ASSIGNED", "\u5DF2\u5206\u914D\u7684\u672A\u5B8C\u6210\u4EFB\u52A1"],
    ["7-DAY ACTIONS", "\u8FD1 7 \u5929\u64CD\u4F5C"],
    ["LAST 7 DAYS", "\u8FC7\u53BB 7 \u5929"],
    ["LAST 30 DAYS", "\u8FC7\u53BB 30 \u5929"],
    ["ALL TIME", "\u5168\u90E8\u65F6\u95F4"],
    ["Touched", "\u89E6\u53CA\u4EFB\u52A1"],
    ["Comments", "\u8BC4\u8BBA"],
    ["Actions", "\u64CD\u4F5C"],
    ["Tokens", "Token"],
    ["Spend", "\u652F\u51FA"],
    ["TOKENS / DAY", "\u6BCF\u65E5 Token \u7528\u91CF"],
    ["COMPLETIONS", "\u5B8C\u6210\u4EFB\u52A1\u6570"],
    ["Recent tasks", "\u6700\u8FD1\u4EFB\u52A1"],
    ["Recent activity", "\u6700\u8FD1\u6D3B\u52A8"],
    ["Control how your account appears in the sidebar and other board surfaces.", "\u7BA1\u7406\u4F60\u7684\u8D26\u6237\u5728\u4FA7\u8FB9\u680F\u548C\u7BA1\u7406\u754C\u9762\u4E2D\u7684\u663E\u793A\u65B9\u5F0F\u3002"],
    ["Change photo", "\u66F4\u6362\u5934\u50CF"],
    ["Display name", "\u663E\u793A\u540D\u79F0"],
    ["Email", "\u7535\u5B50\u90AE\u7BB1"],
    ["Shown in the sidebar account footer and comment author surfaces.", "\u663E\u793A\u5728\u4FA7\u8FB9\u680F\u8D26\u6237\u533A\u57DF\u548C\u8BC4\u8BBA\u4F5C\u8005\u4FE1\u606F\u4E2D\u3002"],
    ["Email is managed by your auth session and is read-only here.", "\u7535\u5B50\u90AE\u7BB1\u7531\u767B\u5F55\u4F1A\u8BDD\u7BA1\u7406\uFF0C\u6B64\u5904\u4EC5\u53EF\u67E5\u770B\u3002"],
    ["Save profile", "\u4FDD\u5B58\u4E2A\u4EBA\u8D44\u6599"],
    ["Keyboard shortcuts", "\u952E\u76D8\u5FEB\u6377\u952E"],
    ["Enable app keyboard shortcuts, including inbox navigation and global shortcuts like creating tasks or toggling panels. This applies only to your account, across all organizations and devices. Off by default.", "\u542F\u7528\u5E94\u7528\u5185\u952E\u76D8\u5FEB\u6377\u952E\uFF0C\u5305\u62EC\u6536\u4EF6\u7BB1\u5BFC\u822A\u3001\u521B\u5EFA\u4EFB\u52A1\u53CA\u5207\u6362\u9762\u677F\u3002\u6B64\u8BBE\u7F6E\u4EC5\u9002\u7528\u4E8E\u4F60\u7684\u8D26\u6237\uFF0C\u5E76\u5728\u6240\u6709\u7EC4\u7EC7\u548C\u8BBE\u5907\u95F4\u751F\u6548\uFF1B\u9ED8\u8BA4\u5173\u95ED\u3002"],
    ["Let agents tidy my inbox", "\u8BA9\u667A\u80FD\u4F53\u6574\u7406\u6211\u7684\u6536\u4EF6\u7BB1"],
    ["Choose whether the agents you manage may archive tasks out of your inbox on your behalf. You can undo any archive, and every agent archive is attributed in the task's properties.", "\u9009\u62E9\u662F\u5426\u5141\u8BB8\u4F60\u7BA1\u7406\u7684\u667A\u80FD\u4F53\u4EE3\u4F60\u5F52\u6863\u6536\u4EF6\u7BB1\u4E2D\u7684\u4EFB\u52A1\u3002\u5F52\u6863\u53EF\u64A4\u9500\uFF0C\u6BCF\u6B21\u64CD\u4F5C\u90FD\u4F1A\u5728\u4EFB\u52A1\u5C5E\u6027\u4E2D\u6CE8\u660E\u5BF9\u5E94\u667A\u80FD\u4F53\u3002"],
    ["Any of my agents", "\u6211\u7BA1\u7406\u7684\u6240\u6709\u667A\u80FD\u4F53"],
    ["Let any agent you manage archive tasks out of your inbox.", "\u5141\u8BB8\u4F60\u7BA1\u7406\u7684\u4EFB\u610F\u667A\u80FD\u4F53\u5F52\u6863\u6536\u4EF6\u7BB1\u4E2D\u7684\u4EFB\u52A1\u3002"],
    ["Only chosen agents", "\u4EC5\u6307\u5B9A\u667A\u80FD\u4F53"],
    ["Restrict inbox tidying to the agents you pick below.", "\u4EC5\u5141\u8BB8\u4E0B\u65B9\u9009\u5B9A\u7684\u667A\u80FD\u4F53\u6574\u7406\u6536\u4EF6\u7BB1\u3002"],
    ["Off", "\u5173\u95ED"],
    ["Agents can never archive tasks from your inbox.", "\u667A\u80FD\u4F53\u65E0\u6CD5\u5F52\u6863\u6536\u4EF6\u7BB1\u4E2D\u7684\u4EFB\u52A1\u3002"],
    ["Loading inbox agent policy\u2026", "\u6B63\u5728\u52A0\u8F7D\u6536\u4EF6\u7BB1\u667A\u80FD\u4F53\u7B56\u7565\u2026"],
    ["Inbox agent archiving policy", "\u6536\u4EF6\u7BB1\u667A\u80FD\u4F53\u5F52\u6863\u7B56\u7565"],
    ["Agents allowed to tidy my inbox", "\u5141\u8BB8\u6574\u7406\u6536\u4EF6\u7BB1\u7684\u667A\u80FD\u4F53"],
    ["Loading profile...", "\u6B63\u5728\u52A0\u8F7D\u4E2A\u4EBA\u8D44\u6599\u2026"],
    ["Opt into features that are still being evaluated before they become default behavior.", "\u9009\u62E9\u542F\u7528\u5C1A\u5728\u8BC4\u4F30\u3001\u672A\u6210\u4E3A\u9ED8\u8BA4\u884C\u4E3A\u7684\u529F\u80FD\u3002"],
    ["Experimental features may break at any time.", "\u8FD9\u4E9B\u5B9E\u9A8C\u6027\u529F\u80FD\u53EF\u80FD\u968F\u65F6\u5931\u6548\u3002"],
    ["These features are opt-in and come with no compatibility guarantees. They may change, break, or be removed without notice. Avoid relying on them for critical or production workflows.", "\u8FD9\u4E9B\u529F\u80FD\u9700\u4E3B\u52A8\u542F\u7528\uFF0C\u4E14\u4E0D\u4FDD\u8BC1\u517C\u5BB9\u6027\uFF1B\u53EF\u80FD\u968F\u65F6\u66F4\u6539\u3001\u5931\u6548\u6216\u79FB\u9664\u3002\u8BF7\u52FF\u5728\u5173\u952E\u6216\u751F\u4EA7\u5DE5\u4F5C\u6D41\u4E2D\u4F9D\u8D56\u5B83\u4EEC\u3002"],
    ["Optional product features that are still being evaluated.", "\u4ECD\u5728\u8BC4\u4F30\u4E2D\u7684\u53EF\u9009\u4EA7\u54C1\u529F\u80FD\u3002"],
    ["Agent Chat", "\u667A\u80FD\u4F53\u804A\u5929"],
    ["Talk to each agent in one ongoing conversation. Clarify goals and create tasks for execution.", "\u5728\u6301\u7EED\u7684\u4F1A\u8BDD\u4E2D\u4E0E\u667A\u80FD\u4F53\u6C9F\u901A\uFF0C\u660E\u786E\u76EE\u6807\u5E76\u521B\u5EFA\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u3002"],
    ["Beta skills", "\u6D4B\u8BD5\u7248\u6280\u80FD"],
    ["Allow agents to pin beta releases of the Paperclip core skill. Disabling this returns every agent to the default live skill without removing saved pins.", "\u5141\u8BB8\u667A\u80FD\u4F53\u56FA\u5B9A\u4F7F\u7528 Paperclip \u6838\u5FC3\u6280\u80FD\u7684\u6D4B\u8BD5\u7248\u3002\u5173\u95ED\u540E\uFF0C\u6240\u6709\u667A\u80FD\u4F53\u6062\u590D\u4F7F\u7528\u9ED8\u8BA4\u6B63\u5F0F\u7248\uFF0C\u4F46\u4E0D\u4F1A\u5220\u9664\u5DF2\u4FDD\u5B58\u7684\u7248\u672C\u9009\u62E9\u3002"],
    ["Instance Access", "\u5B9E\u4F8B\u8BBF\u95EE\u63A7\u5236"],
    ["Search users, manage instance-admin status, and control which organizations they can access.", "\u641C\u7D22\u7528\u6237\u3001\u7BA1\u7406\u5B9E\u4F8B\u7BA1\u7406\u5458\u8EAB\u4EFD\uFF0C\u5E76\u63A7\u5236\u4ED6\u4EEC\u53EF\u8BBF\u95EE\u7684\u7EC4\u7EC7\u3002"],
    ["Search by name or email", "\u6309\u59D3\u540D\u6216\u90AE\u7BB1\u641C\u7D22"],
    ["Organization access", "\u7EC4\u7EC7\u8BBF\u95EE\u6743\u9650"],
    ["Toggle organization membership for this user. New access defaults to an active operator membership.", "\u8BBE\u7F6E\u6B64\u7528\u6237\u7684\u7EC4\u7EC7\u6210\u5458\u8D44\u683C\u3002\u65B0\u589E\u8BBF\u95EE\u6743\u9650\u9ED8\u8BA4\u91C7\u7528\u6D3B\u8DC3\u64CD\u4F5C\u5458\u8EAB\u4EFD\u3002"],
    ["Current memberships", "\u5F53\u524D\u6210\u5458\u5173\u7CFB"],
    ["Select a user to inspect instance access.", "\u9009\u62E9\u7528\u6237\u4EE5\u67E5\u770B\u5176\u5B9E\u4F8B\u8BBF\u95EE\u6743\u9650\u3002"],
    // Settings: general, membership, secrets, import/export, plugins, adapters
    ["Loading general settings...", "\u6B63\u5728\u52A0\u8F7D\u5E38\u89C4\u8BBE\u7F6E\u2026"],
    ["Renaming can change this company's task ID prefix. Existing task IDs are renumbered and old task links stop resolving.", "\u91CD\u547D\u540D\u53EF\u80FD\u66F4\u6539\u8BE5\u7EC4\u7EC7\u7684\u4EFB\u52A1\u7F16\u53F7\u524D\u7F00\u3002\u73B0\u6709\u4EFB\u52A1\u7F16\u53F7\u5C06\u91CD\u65B0\u7F16\u6392\uFF0C\u65E7\u4EFB\u52A1\u94FE\u63A5\u5C06\u5931\u6548\u3002"],
    ["Optional organization description", "\u53EF\u9009\u7684\u7EC4\u7EC7\u7B80\u4ECB"],
    ["Uploading logo...", "\u6B63\u5728\u4E0A\u4F20\u6807\u5FD7\u2026"],
    ["Organization Members", "\u7EC4\u7EC7\u6210\u5458"],
    ["Invites", "\u9080\u8BF7"],
    ["Pending human joins", "\u5F85\u5BA1\u6838\u7684\u6210\u5458\u52A0\u5165\u7533\u8BF7"],
    ["Invite a person", "\u9080\u8BF7\u6210\u5458"],
    ["Generate a human invite link and choose the default access it should request.", "\u751F\u6210\u6210\u5458\u9080\u8BF7\u94FE\u63A5\uFF0C\u5E76\u9009\u62E9\u5176\u9ED8\u8BA4\u7533\u8BF7\u7684\u8BBF\u95EE\u6743\u9650\u3002"],
    ["Choose a role", "\u9009\u62E9\u89D2\u8272"],
    ["Invite history", "\u9080\u8BF7\u8BB0\u5F55"],
    ["Review invite status, audience, inviter, and any linked join request.", "\u67E5\u770B\u9080\u8BF7\u72B6\u6001\u3001\u53D7\u9080\u5BF9\u8C61\u3001\u9080\u8BF7\u4EBA\u53CA\u5173\u8054\u7684\u52A0\u5165\u7533\u8BF7\u3002"],
    ["No invites have been created for this organization yet.", "\u8BE5\u7EC4\u7EC7\u5C1A\u672A\u521B\u5EFA\u9080\u8BF7\u3002"],
    ["No user memberships found for this organization yet.", "\u8BE5\u7EC4\u7EC7\u5C1A\u65E0\u7528\u6237\u6210\u5458\u3002"],
    ["All secrets", "\u5168\u90E8\u5BC6\u94A5"],
    ["My secrets", "\u6211\u7684\u5BC6\u94A5"],
    ["Provider vaults", "\u63D0\u4F9B\u5546\u5BC6\u94A5\u5E93"],
    ["Search by name, key, ref", "\u6309\u540D\u79F0\u3001\u952E\u540D\u6216\u5F15\u7528\u641C\u7D22"],
    ["Import from AWS Secrets Manager", "\u4ECE AWS Secrets Manager \u5BFC\u5165"],
    ["Bring AWS-managed secrets into Paperclip as external references.", "\u5C06 AWS \u7BA1\u7406\u7684\u5BC6\u94A5\u4F5C\u4E3A\u5916\u90E8\u5F15\u7528\u5BFC\u5165 Paperclip\u3002"],
    ["Import source", "\u5BFC\u5165\u6765\u6E90"],
    ["Choose a GitHub repo or upload a local Paperclip zip package.", "\u9009\u62E9 GitHub \u4ED3\u5E93\u6216\u4E0A\u4F20\u672C\u5730 Paperclip ZIP \u5305\u3002"],
    ["GitHub repo", "GitHub \u4ED3\u5E93"],
    ["Local zip", "\u672C\u5730 ZIP \u6587\u4EF6"],
    ["Choose zip", "\u9009\u62E9 ZIP \u6587\u4EF6"],
    ["GitHub URL", "GitHub \u5730\u5740"],
    ["Target", "\u76EE\u6807\u4F4D\u7F6E"],
    ["Create new organization", "\u65B0\u5EFA\u7EC4\u7EC7"],
    ["New organization name", "\u65B0\u7EC4\u7EC7\u540D\u79F0"],
    ["Collision strategy", "\u51B2\u7A81\u5904\u7406\u65B9\u5F0F"],
    ["Rename on conflict", "\u51B2\u7A81\u65F6\u91CD\u547D\u540D"],
    ["Skip on conflict", "\u51B2\u7A81\u65F6\u8DF3\u8FC7"],
    ["Replace existing", "\u66FF\u6362\u73B0\u6709\u5185\u5BB9"],
    ["Import preview", "\u5BFC\u5165\u9884\u89C8"],
    ["Package files", "\u5305\u5185\u6587\u4EF6"],
    ["External Adapters", "\u5916\u90E8\u9002\u914D\u5668"],
    ["No external adapters installed", "\u5C1A\u672A\u5B89\u88C5\u5916\u90E8\u9002\u914D\u5668"],
    ["Install External Adapter", "\u5B89\u88C5\u5916\u90E8\u9002\u914D\u5668"],
    ["Built-in Adapters", "\u5185\u7F6E\u9002\u914D\u5668"],
    ["External adapters are alpha.", "\u5916\u90E8\u9002\u914D\u5668\u4ECD\u5904\u4E8E\u65E9\u671F\u6D4B\u8BD5\u9636\u6BB5\u3002"],
    ["Package Name", "\u5305\u540D\u79F0"],
    ["Version (optional)", "\u7248\u672C\uFF08\u53EF\u9009\uFF09"],
    ["Plugin ID", "\u63D2\u4EF6 ID"],
    ["Plugin Key", "\u63D2\u4EF6\u952E\u540D"],
    ["NPM Package", "NPM \u5305"],
    ["Local folders", "\u672C\u5730\u6587\u4EF6\u5939"],
    ["This plugin does not require any settings.", "\u6B64\u63D2\u4EF6\u65E0\u9700\u989D\u5916\u8BBE\u7F6E\u3002"],
    ["Open Environments", "\u6253\u5F00\u73AF\u5883\u8BBE\u7F6E"],
    ["Account", "\u8D26\u6237"],
    ["Log out", "\u9000\u51FA\u767B\u5F55"],
    ["Sign out", "\u9000\u51FA\u767B\u5F55"],
    ["Sign in", "\u767B\u5F55"],
    ["Refresh", "\u5237\u65B0"],
    ["Loading\u2026", "\u52A0\u8F7D\u4E2D\u2026"],
    ["Loading...", "\u52A0\u8F7D\u4E2D..."],
    ["Load more", "\u52A0\u8F7D\u66F4\u591A"],
    ["View more", "\u67E5\u770B\u66F4\u591A"],
    ["Show more", "\u663E\u793A\u66F4\u591A"],
    ["Show less", "\u6536\u8D77"],
    ["Back", "\u4E0A\u4E00\u6B65"],
    ["Next", "\u4E0B\u4E00\u6B65"],
    ["Continue", "\u7EE7\u7EED"],
    ["Done", "\u5B8C\u6210"],
    ["Finish", "\u5B8C\u6210"],
    ["Close", "\u5173\u95ED"],
    ["Open", "\u6253\u5F00"],
    ["Cancel", "\u53D6\u6D88"],
    ["Save", "\u4FDD\u5B58"],
    ["Saving\u2026", "\u6B63\u5728\u4FDD\u5B58\u2026"],
    ["Edit", "\u7F16\u8F91"],
    ["Delete", "\u5220\u9664"],
    ["Remove", "\u79FB\u9664"],
    ["Create", "\u521B\u5EFA"],
    ["Add", "\u6DFB\u52A0"],
    ["Update", "\u66F4\u65B0"],
    ["Confirm", "\u786E\u8BA4"],
    ["Apply", "\u5E94\u7528"],
    ["Retry", "\u91CD\u8BD5"],
    ["Copy", "\u590D\u5236"],
    ["Copied", "\u5DF2\u590D\u5236"],
    ["View all", "\u67E5\u770B\u5168\u90E8"],
    ["All", "\u5168\u90E8"],
    ["Active", "\u6D3B\u8DC3"],
    ["Paused", "\u5DF2\u6682\u505C"],
    ["Running", "\u8FD0\u884C\u4E2D"],
    ["Pending", "\u5F85\u5904\u7406"],
    ["Completed", "\u5DF2\u5B8C\u6210"],
    ["Failed", "\u5931\u8D25"],
    ["Enabled", "\u5DF2\u542F\u7528"],
    ["Disabled", "\u5DF2\u505C\u7528"],
    ["Status", "\u72B6\u6001"],
    ["Name", "\u540D\u79F0"],
    ["Description", "\u63CF\u8FF0"],
    ["Type", "\u7C7B\u578B"],
    ["Created", "\u521B\u5EFA\u65F6\u95F4"],
    ["Updated", "\u66F4\u65B0\u65F6\u95F4"],
    // Onboarding
    ["Create your first company", "\u521B\u5EFA\u4F60\u7684\u7B2C\u4E00\u5BB6\u516C\u53F8"],
    ["Start by creating a company.", "\u5148\u521B\u5EFA\u4E00\u5BB6\u516C\u53F8\u3002"],
    ["New company", "\u65B0\u5EFA\u516C\u53F8"],
    ["Create your first agent", "\u521B\u5EFA\u4F60\u7684\u7B2C\u4E00\u4E2A\u667A\u80FD\u4F53"],
    ["Select how this agent will run tasks.", "\u9009\u62E9\u8FD9\u4E2A\u667A\u80FD\u4F53\u6267\u884C\u4EFB\u52A1\u7684\u65B9\u5F0F\u3002"],
    ["Company name", "\u516C\u53F8\u540D\u79F0"],
    ["Organization name", "\u7EC4\u7EC7\u540D\u79F0"],
    ["Agent name", "\u667A\u80FD\u4F53\u540D\u79F0"],
    ["Adapter type", "\u9002\u914D\u5668\u7C7B\u578B"],
    ["Connect a model", "\u8FDE\u63A5\u6A21\u578B"],
    ["Review", "\u68C0\u67E5"],
    ["Create company", "\u521B\u5EFA\u516C\u53F8"],
    ["Create organization", "\u521B\u5EFA\u7EC4\u7EC7"],
    ["Create agent", "\u521B\u5EFA\u667A\u80FD\u4F53"],
    ["Choose manager\u2026", "\u9009\u62E9\u7BA1\u7406\u8005\u2026"],
    ["Choose", "\u9009\u62E9"],
    ["Local Codex agent", "\u672C\u5730 Codex \u667A\u80FD\u4F53"],
    ["Local Claude agent", "\u672C\u5730 Claude \u667A\u80FD\u4F53"],
    ["More adapter types", "\u66F4\u591A\u9002\u914D\u5668\u7C7B\u578B"],
    // Dashboard
    ["Agents Enabled", "\u5DF2\u542F\u7528\u7684\u667A\u80FD\u4F53"],
    ["Error", "\u9519\u8BEF"],
    ["idle", "\u7A7A\u95F2"],
    ["Tasks In Progress", "\u8FDB\u884C\u4E2D\u7684\u4EFB\u52A1"],
    ["Month Spend", "\u672C\u6708\u652F\u51FA"],
    ["Pending Approvals", "\u5F85\u5BA1\u6279"],
    ["Unlimited budget", "\u9884\u7B97\u4E0D\u9650"],
    ["Awaiting board review", "\u7B49\u5F85\u7BA1\u7406\u5458\u5BA1\u6838"],
    ["Run Activity", "\u8FD0\u884C\u6D3B\u52A8"],
    ["Tasks by Status", "\u6309\u72B6\u6001\u7EDF\u8BA1\u4EFB\u52A1"],
    ["Success Rate", "\u6210\u529F\u7387"],
    ["Last 14 days", "\u6700\u8FD1 14 \u5929"],
    ["Succeeded", "\u6210\u529F"],
    ["Recovered", "\u5DF2\u6062\u590D"],
    ["Other", "\u5176\u4ED6"],
    ["In Review", "\u5BA1\u6838\u4E2D"],
    ["View all runs", "\u67E5\u770B\u5168\u90E8\u8FD0\u884C\u8BB0\u5F55"],
    ["No tasks yet.", "\u8FD8\u6CA1\u6709\u4EFB\u52A1\u3002"],
    ["You have no agents.", "\u4F60\u8FD8\u6CA1\u6709\u667A\u80FD\u4F53\u3002"],
    ["Review agents", "\u67E5\u770B\u667A\u80FD\u4F53"],
    ["Resume all", "\u5168\u90E8\u6062\u590D"],
    ["Resuming\u2026", "\u6B63\u5728\u6062\u590D\u2026"],
    ["All agents in this organization are paused \u2014 nothing will run.", "\u6B64\u7EC4\u7EC7\u7684\u6240\u6709\u667A\u80FD\u4F53\u90FD\u5DF2\u6682\u505C\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u6267\u884C\u4EFB\u4F55\u4EFB\u52A1\u3002"],
    // Agents
    ["New Agent", "\u65B0\u5EFA\u667A\u80FD\u4F53"],
    ["Create your first agent to get started.", "\u521B\u5EFA\u4F60\u7684\u7B2C\u4E00\u4E2A\u667A\u80FD\u4F53\u4EE5\u5F00\u59CB\u4F7F\u7528\u3002"],
    ["Select an organization to view agents.", "\u9009\u62E9\u4E00\u4E2A\u7EC4\u7EC7\u4EE5\u67E5\u770B\u667A\u80FD\u4F53\u3002"],
    ["No agents match the selected status.", "\u6CA1\u6709\u7B26\u5408\u6240\u9009\u72B6\u6001\u7684\u667A\u80FD\u4F53\u3002"],
    ["All agents", "\u5168\u90E8\u667A\u80FD\u4F53"],
    ["Built-in agents", "\u5185\u7F6E\u667A\u80FD\u4F53"],
    ["Agent configuration", "\u667A\u80FD\u4F53\u914D\u7F6E"],
    ["Agent instructions", "\u667A\u80FD\u4F53\u6307\u4EE4"],
    ["Instructions", "\u6307\u4EE4"],
    ["Manager", "\u7BA1\u7406\u8005"],
    ["Reports to", "\u6C47\u62A5\u5BF9\u8C61"],
    ["Run history", "\u8FD0\u884C\u8BB0\u5F55"],
    ["Back to runs", "\u8FD4\u56DE\u8FD0\u884C\u8BB0\u5F55"],
    ["Last heartbeat", "\u4E0A\u6B21\u5FC3\u8DF3"],
    ["Heartbeat interval", "\u5FC3\u8DF3\u95F4\u9694"],
    ["Pause agent", "\u6682\u505C\u667A\u80FD\u4F53"],
    ["Resume agent", "\u6062\u590D\u667A\u80FD\u4F53"],
    // Tasks and projects
    ["New Task", "\u65B0\u5EFA\u4EFB\u52A1"],
    ["New task", "\u65B0\u5EFA\u4EFB\u52A1"],
    ["Task title", "\u4EFB\u52A1\u6807\u9898"],
    ["Add description...", "\u6DFB\u52A0\u63CF\u8FF0\u2026"],
    ["For", "\u5206\u914D\u7ED9"],
    ["in", "\u6240\u5C5E"],
    ["Todo", "\u5F85\u529E"],
    ["Upload", "\u4E0A\u4F20"],
    ["Auto mode", "\u81EA\u52A8\u6A21\u5F0F"],
    ["Discard Draft", "\u4E22\u5F03\u8349\u7A3F"],
    ["Create Task", "\u521B\u5EFA\u4EFB\u52A1"],
    ["Creating...", "\u6B63\u5728\u521B\u5EFA\u2026"],
    ["Create task", "\u521B\u5EFA\u4EFB\u52A1"],
    ["Task details", "\u4EFB\u52A1\u8BE6\u60C5"],
    ["Assignee", "\u8D1F\u8D23\u4EBA"],
    ["Assign to", "\u5206\u914D\u7ED9"],
    ["Priority", "\u4F18\u5148\u7EA7"],
    ["Due date", "\u622A\u6B62\u65E5\u671F"],
    ["In progress", "\u8FDB\u884C\u4E2D"],
    ["To do", "\u5F85\u529E"],
    ["Blocked", "\u5DF2\u963B\u585E"],
    ["No tasks found", "\u672A\u627E\u5230\u4EFB\u52A1"],
    ["New Project", "\u65B0\u5EFA\u9879\u76EE"],
    ["Add Project", "\u6DFB\u52A0\u9879\u76EE"],
    ["My Projects", "\u6211\u7684\u9879\u76EE"],
    ["Create project", "\u521B\u5EFA\u9879\u76EE"],
    ["Project details", "\u9879\u76EE\u8BE6\u60C5"],
    ["No projects yet", "\u8FD8\u6CA1\u6709\u9879\u76EE"],
    ["Recurring work definitions that materialize into auditable execution tasks.", "\u5C06\u5B9A\u671F\u5DE5\u4F5C\u5B9A\u4E49\u4E3A\u53EF\u5BA1\u8BA1\u7684\u6267\u884C\u4EFB\u52A1\u3002"],
    ["Create routine", "\u521B\u5EFA\u4F8B\u884C\u4EFB\u52A1"],
    ["All routines", "\u5168\u90E8\u4F8B\u884C\u4EFB\u52A1"],
    ["No active routines. Use Create routine to define the first recurring workflow.", "\u8FD8\u6CA1\u6709\u542F\u7528\u7684\u4F8B\u884C\u4EFB\u52A1\u3002\u70B9\u51FB\u201C\u521B\u5EFA\u4F8B\u884C\u4EFB\u52A1\u201D\u6765\u5B9A\u4E49\u7B2C\u4E00\u4E2A\u5B9A\u671F\u5DE5\u4F5C\u6D41\u3002"],
    ["No artifact stacks yet.", "\u8FD8\u6CA1\u6709\u4EA7\u51FA\u7269\u96C6\u5408\u3002"],
    ["Installed skills", "\u5DF2\u5B89\u88C5\u7684\u6280\u80FD"],
    ["Skills available to this organization.", "\u6B64\u7EC4\u7EC7\u53EF\u7528\u7684\u6280\u80FD\u3002"],
    ["Review what happened, inspect agent runs, and understand the costs and budget controls behind your organization.", "\u67E5\u770B\u53D1\u751F\u7684\u4E8B\u4EF6\u3001\u68C0\u67E5\u667A\u80FD\u4F53\u8FD0\u884C\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u4E86\u89E3\u7EC4\u7EC7\u7684\u8D39\u7528\u548C\u9884\u7B97\u63A7\u5236\u3002"],
    ["Runs", "\u8FD0\u884C\u8BB0\u5F55"],
    ["Budgets", "\u9884\u7B97"],
    ["Agent Actions", "\u667A\u80FD\u4F53\u64CD\u4F5C"],
    ["Responsible user", "\u8D1F\u8D23\u4EBA"],
    ["All responsible users", "\u6240\u6709\u8D1F\u8D23\u4EBA"],
    ["Action", "\u64CD\u4F5C"],
    ["All actions", "\u6240\u6709\u64CD\u4F5C"],
    ["Entity", "\u5BF9\u8C61"],
    ["All entities", "\u6240\u6709\u5BF9\u8C61"],
    ["From", "\u8D77\u59CB\u65F6\u95F4"],
    ["To", "\u7ED3\u675F\u65F6\u95F4"],
    ["Export CSV", "\u5BFC\u51FA CSV"],
    ["on behalf of", "\u4EE3\u8868"],
    ["View run", "\u67E5\u770B\u8FD0\u884C\u8BB0\u5F55"],
    ["Recorded by Paperclip \u2014 entries can't be edited. Sensitive values are never stored.", "\u7531 Paperclip \u8BB0\u5F55\uFF0C\u6761\u76EE\u65E0\u6CD5\u7F16\u8F91\uFF1B\u654F\u611F\u503C\u4E0D\u4F1A\u88AB\u4FDD\u5B58\u3002"],
    ["Read code and pull requests, comment on issues.", "\u8BFB\u53D6\u4EE3\u7801\u548C\u62C9\u53D6\u8BF7\u6C42\uFF0C\u5E76\u8BC4\u8BBA GitHub \u8BAE\u9898\u3002"],
    ["Discover and use connected apps through Composio Connect.", "\u901A\u8FC7 Composio Connect \u53D1\u73B0\u5E76\u4F7F\u7528\u5DF2\u8FDE\u63A5\u7684\u5E94\u7528\u3002"],
    ["Search meeting transcripts, read summaries and action items, and connect meeting-ready routines.", "\u641C\u7D22\u4F1A\u8BAE\u8F6C\u5F55\u3001\u9605\u8BFB\u6458\u8981\u548C\u5F85\u529E\u4E8B\u9879\uFF0C\u5E76\u8FDE\u63A5\u4F1A\u8BAE\u76F8\u5173\u7684\u4F8B\u884C\u4EFB\u52A1\u3002"],
    ["Search and read Gmail messages and create drafts without enabling mail sending.", "\u641C\u7D22\u548C\u9605\u8BFB Gmail \u90AE\u4EF6\u5E76\u521B\u5EFA\u8349\u7A3F\uFF0C\u4E0D\u542F\u7528\u90AE\u4EF6\u53D1\u9001\u3002"],
    ["Read calendars and manage Google Calendar events.", "\u8BFB\u53D6\u65E5\u5386\u5E76\u7BA1\u7406 Google Calendar \u65E5\u7A0B\u3002"],
    ["Search and read Google Chat conversations and send messages.", "\u641C\u7D22\u548C\u9605\u8BFB Google Chat \u5BF9\u8BDD\u5E76\u53D1\u9001\u6D88\u606F\u3002"],
    ["Read and update Google Docs documents.", "\u8BFB\u53D6\u548C\u66F4\u65B0 Google Docs \u6587\u6863\u3002"],
    ["Search, read, create, and copy files in Google Drive.", "\u5728 Google Drive \u4E2D\u641C\u7D22\u3001\u8BFB\u53D6\u3001\u521B\u5EFA\u548C\u590D\u5236\u6587\u4EF6\u3002"],
    ["Search contacts and directory profiles with the Google People API.", "\u901A\u8FC7 Google People API \u641C\u7D22\u8054\u7CFB\u4EBA\u548C\u901A\u8BAF\u5F55\u8D44\u6599\u3002"],
    ["Read and update Google Sheets spreadsheets.", "\u8BFB\u53D6\u548C\u66F4\u65B0 Google Sheets \u8868\u683C\u3002"],
    ["Read and update Google Slides presentations.", "\u8BFB\u53D6\u548C\u66F4\u65B0 Google Slides \u6F14\u793A\u6587\u7A3F\u3002"],
    ["Search Gmail, Drive, Calendar, and Chat through one read-only Google Workspace search tool.", "\u901A\u8FC7\u4E00\u4E2A\u53EA\u8BFB\u7684 Google Workspace \u641C\u7D22\u5DE5\u5177\u67E5\u8BE2 Gmail\u3001Drive\u3001Calendar \u548C Chat\u3002"],
    ["Create, update, and read Linear issues.", "\u521B\u5EFA\u3001\u66F4\u65B0\u548C\u8BFB\u53D6 Linear \u8BAE\u9898\u3002"],
    ["Read and update pages in your Notion workspace.", "\u8BFB\u53D6\u548C\u66F4\u65B0 Notion \u5DE5\u4F5C\u533A\u4E2D\u7684\u9875\u9762\u3002"],
    ["Analyze product usage, errors, feature flags, and experiments with PostHog's hosted MCP server.", "\u901A\u8FC7 PostHog \u6258\u7BA1\u7684 MCP \u670D\u52A1\u5668\u5206\u6790\u4EA7\u54C1\u4F7F\u7528\u60C5\u51B5\u3001\u9519\u8BEF\u3001\u529F\u80FD\u5F00\u5173\u548C\u5B9E\u9A8C\u3002"],
    ["Inspect services and logs, deploy applications, and run commands in your Railway containers.", "\u68C0\u67E5\u670D\u52A1\u548C\u65E5\u5FD7\u3001\u90E8\u7F72\u5E94\u7528\uFF0C\u5E76\u5728 Railway \u5BB9\u5668\u4E2D\u8FD0\u884C\u547D\u4EE4\u3002"],
    ["Investigate errors, releases, and production issues.", "\u6392\u67E5\u9519\u8BEF\u3001\u7248\u672C\u53D1\u5E03\u548C\u751F\u4EA7\u73AF\u5883\u95EE\u9898\u3002"],
    ["Search a store's products and policies, and manage shopping carts.", "\u641C\u7D22\u5546\u5E97\u5546\u54C1\u548C\u653F\u7B56\uFF0C\u5E76\u7BA1\u7406\u8D2D\u7269\u8F66\u3002"],
    ["Send and read messages in your team's channels.", "\u5728\u56E2\u961F\u9891\u9053\u4E2D\u53D1\u9001\u548C\u9605\u8BFB\u6D88\u606F\u3002"],
    ["Reach thousands of apps through your Zapier account.", "\u901A\u8FC7 Zapier \u8D26\u6237\u8FDE\u63A5\u6570\u5343\u4E2A\u5E94\u7528\u3002"],
    ["Connect your own tool", "\u8FDE\u63A5\u4F60\u81EA\u5DF1\u7684\u5DE5\u5177"],
    ["Add a custom MCP server or paste an existing configuration.", "\u6DFB\u52A0\u81EA\u5B9A\u4E49 MCP \u670D\u52A1\u5668\uFF0C\u6216\u7C98\u8D34\u73B0\u6709\u914D\u7F6E\u3002"],
    // Common settings and dialogs
    ["General", "\u5E38\u89C4"],
    ["Appearance", "\u5916\u89C2"],
    ["Language", "\u8BED\u8A00"],
    ["Theme", "\u4E3B\u9898"],
    ["Dark", "\u6DF1\u8272"],
    ["Light", "\u6D45\u8272"],
    ["System", "\u8DDF\u968F\u7CFB\u7EDF"],
    ["Instance settings", "\u5B9E\u4F8B\u8BBE\u7F6E"],
    ["Company settings", "\u516C\u53F8\u8BBE\u7F6E"],
    ["Members", "\u6210\u5458"],
    ["Permissions", "\u6743\u9650"],
    ["Integrations", "\u96C6\u6210"],
    ["Advanced", "\u9AD8\u7EA7"],
    ["Experimental", "\u5B9E\u9A8C\u6027\u529F\u80FD"],
    ["Are you sure?", "\u786E\u5B9A\u8981\u7EE7\u7EED\u5417\uFF1F"],
    ["This action cannot be undone.", "\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002"],
    ["commented on", "\u8BC4\u8BBA\u4E86"],
    ["read", "\u9605\u8BFB\u4E86"],
    ["environment lease released", "\u73AF\u5883\u79DF\u7EA6\u5DF2\u91CA\u653E"],
    ["environment lease acquired", "\u5DF2\u83B7\u53D6\u73AF\u5883\u79DF\u7EA6"],
    ["cancelled heartbeat for", "\u53D6\u6D88\u4E86\u5FC3\u8DF3\uFF1A"],
    ["created document for", "\u4E3A\u5176\u521B\u5EFA\u4E86\u6587\u6863\uFF1A"]
  ];
  var search = [
    ["Backlog", "\u5F85\u89C4\u5212"],
    ["In Progress", "\u8FDB\u884C\u4E2D"],
    ["Cancelled", "\u5DF2\u53D6\u6D88"],
    ["Me", "\u6211"],
    ["Unassigned", "\u672A\u5206\u914D"],
    ["Last 24 hours", "\u6700\u8FD1 24 \u5C0F\u65F6"],
    ["Last 7 days", "\u6700\u8FD1 7 \u5929"],
    ["Last 30 days", "\u6700\u8FD1 30 \u5929"],
    ["Last 90 days", "\u6700\u8FD1 90 \u5929"],
    ["Comments", "\u8BC4\u8BBA"],
    ["Search query", "\u641C\u7D22\u5173\u952E\u8BCD"],
    ["Clear search", "\u6E05\u9664\u641C\u7D22\u8BCD"],
    ["Search tasks, comments, documents, artifacts, agents, projects\u2026", "\u641C\u7D22\u4EFB\u52A1\u3001\u8BC4\u8BBA\u3001\u6587\u6863\u3001\u4EA7\u51FA\u7269\u3001\u667A\u80FD\u4F53\u548C\u9879\u76EE\u2026"],
    ["Filter by task status", "\u6309\u4EFB\u52A1\u72B6\u6001\u7B5B\u9009"],
    ["Find blocked work", "\u67E5\u627E\u53D7\u963B\u7684\u5DE5\u4F5C"],
    ["Use your current board user", "\u4F7F\u7528\u5F53\u524D\u7BA1\u7406\u8005\u8D26\u6237"],
    ["Quote multi-word project names", "\u542B\u7A7A\u683C\u7684\u9879\u76EE\u540D\u8BF7\u52A0\u5F15\u53F7"],
    ["Filter by issue label", "\u6309\u4EFB\u52A1\u6807\u7B7E\u7B5B\u9009"],
    ["Filter by priority", "\u6309\u4F18\u5148\u7EA7\u7B5B\u9009"],
    ["Updated in the last 7 days", "\u6700\u8FD1 7 \u5929\u5185\u66F4\u65B0"],
    ["Type to search organization memory.", "\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u641C\u7D22\u7EC4\u7EC7\u4E2D\u7684\u5185\u5BB9\u3002"],
    ["Tasks, comments, plan documents, artifacts, agents, projects \u2014 same surface, ranked by relevance.", "\u4EFB\u52A1\u3001\u8BC4\u8BBA\u3001\u8BA1\u5212\u6587\u6863\u3001\u4EA7\u51FA\u7269\u3001\u667A\u80FD\u4F53\u548C\u9879\u76EE\u7EDF\u4E00\u641C\u7D22\uFF0C\u5E76\u6309\u76F8\u5173\u6027\u6392\u5E8F\u3002"],
    ["Recent searches", "\u6700\u8FD1\u641C\u7D22"],
    ["Identifier lookup:", "\u6309\u7F16\u53F7\u67E5\u627E\uFF1A"],
    ["type", "\u8F93\u5165"],
    ["to jump straight to a task.", "\u53EF\u76F4\u8FBE\u4EFB\u52A1\u3002"],
    ["Quoted phrases:", "\u7CBE\u786E\u77ED\u8BED\uFF1A"],
    ["\u2318K:", "\u2318K\uFF1A"],
    ["wrap a phrase in quotes to match the exact sequence.", "\u5C06\u77ED\u8BED\u653E\u5165\u5F15\u53F7\u4E2D\uFF0C\u4EE5\u5339\u914D\u5B8C\u5168\u76F8\u540C\u7684\u5185\u5BB9\u3002"],
    ["reopens the command palette pre-seeded with your current query.", "\u91CD\u65B0\u6253\u5F00\u547D\u4EE4\u9762\u677F\uFF0C\u5E76\u9884\u586B\u5F53\u524D\u641C\u7D22\u8BCD\u3002"],
    ["Try", "\u8BD5\u8BD5"],
    ["or", "\u6216"],
    ["Couldn\u2019t run that search", "\u65E0\u6CD5\u6267\u884C\u641C\u7D22"],
    ["The request failed.", "\u8BF7\u6C42\u5931\u8D25\u3002"],
    ["Your input and filters are still here, so", "\u641C\u7D22\u8BCD\u548C\u7B5B\u9009\u6761\u4EF6\u4ECD\u5DF2\u4FDD\u7559\uFF0C\u56E0\u6B64"],
    ["you can retry or fall back to the Tasks filter.", "\u4F60\u53EF\u4EE5\u91CD\u8BD5\uFF0C\u6216\u6539\u7528\u4EFB\u52A1\u7B5B\u9009\u3002"],
    ["Open Tasks filter view", "\u6253\u5F00\u4EFB\u52A1\u7B5B\u9009\u89C6\u56FE"],
    ["Search all scopes", "\u641C\u7D22\u6240\u6709\u8303\u56F4"],
    ["Create task from this query", "\u6309\u6B64\u641C\u7D22\u8BCD\u521B\u5EFA\u4EFB\u52A1"],
    ["Try fewer tokens or a single distinctive term.", "\u51CF\u5C11\u5173\u952E\u8BCD\uFF0C\u6216\u53EA\u7528\u4E00\u4E2A\u6709\u8FA8\u8BC6\u5EA6\u7684\u8BCD\u3002"],
    ["Use an identifier shortcut like", "\u4E5F\u53EF\u76F4\u63A5\u8F93\u5165\u4EFB\u52A1\u7F16\u53F7\uFF0C\u4F8B\u5982"],
    ["Wrap multi-word phrases in quotes.", "\u591A\u8BCD\u77ED\u8BED\u8BF7\u52A0\u5F15\u53F7\u3002"],
    ["Updating\u2026", "\u6B63\u5728\u66F4\u65B0\u2026"],
    ["No results with these filters", "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u6CA1\u6709\u7ED3\u679C"],
    ["Loosen a filter", "\u653E\u5BBD\u7B5B\u9009\u6761\u4EF6"],
    ["Remove", "\u79FB\u9664"]
  ];
  var PHRASES = Object.freeze([
    ...common.map(([source, target]) => ({ source, target })),
    ...search.map(([source, target]) => ({ source, target, context: "search" })),
    { source: "Me", target: "\u6211", context: "issue-filter" },
    { source: "Title", target: "\u6807\u9898", context: "task-sort" },
    { source: "Local", target: "\u672C\u673A", context: "environment-choice" },
    { source: "Comment", target: "\u8BC4\u8BBA", context: "search-result" },
    { source: "Doc", target: "\u6587\u6863", context: "search-result" },
    { source: "Artifact", target: "\u4EA7\u51FA\u7269", context: "search-result" },
    { source: "Issues", target: "\u4EFB\u52A1", context: "navigation" },
    { source: "Issue", target: "\u4EFB\u52A1", context: "navigation" },
    { source: "Run", target: "\u8FD0\u884C", context: "agent-action" },
    { source: "Run", target: "\u8FD0\u884C\u8BB0\u5F55", context: "history" },
    { source: "running", target: "\u8FD0\u884C\u4E2D", context: "metric" },
    { source: "paused", target: "\u5DF2\u6682\u505C", context: "metric" },
    { source: "error", target: "\u9519\u8BEF", context: "metric" },
    { source: "errors", target: "\u9519\u8BEF", context: "metric" },
    { source: "open", target: "\u672A\u5B8C\u6210", context: "metric" },
    { source: "blocked", target: "\u5DF2\u963B\u585E", context: "metric" },
    { source: "in progress", target: "\u8FDB\u884C\u4E2D", context: "status" },
    { source: "planned", target: "\u5DF2\u89C4\u5212", context: "status" },
    { source: "error", target: "\u9519\u8BEF", context: "status" },
    { source: "failed", target: "\u5931\u8D25", context: "status" },
    { source: "succeeded", target: "\u6210\u529F", context: "status" },
    { source: "cancelled", target: "\u5DF2\u53D6\u6D88", context: "status" },
    { source: "updated", target: "\u66F4\u65B0\u4E86", context: "activity" },
    { source: "automation", target: "\u81EA\u52A8\u89E6\u53D1", context: "run-origin" },
    { source: "assignment", target: "\u4EFB\u52A1\u5206\u914D", context: "run-origin" },
    { source: "on demand", target: "\u6309\u9700", context: "run-origin" },
    { source: "activity", target: "\u6D3B\u52A8", context: "detail-link" },
    { source: "runs", target: "\u8FD0\u884C\u8BB0\u5F55", context: "detail-link" },
    { source: "costs", target: "\u8D39\u7528", context: "detail-link" },
    { source: "budgets", target: "\u9884\u7B97", context: "detail-link" }
  ]);
  var timeUnits = { m: "\u5206\u949F", h: "\u5C0F\u65F6", d: "\u5929", w: "\u5468", mo: "\u4E2A\u6708", y: "\u5E74" };
  var dashboardCounts = { running: "\u8FD0\u884C\u4E2D", paused: "\u5DF2\u6682\u505C", error: "\u9519\u8BEF", errors: "\u9519\u8BEF", open: "\u672A\u5B8C\u6210", blocked: "\u5DF2\u963B\u585E" };
  var taskStatuses = { todo: "\u5F85\u529E", "in progress": "\u8FDB\u884C\u4E2D", "in review": "\u5BA1\u6838\u4E2D", done: "\u5DF2\u5B8C\u6210", blocked: "\u5DF2\u963B\u585E", cancelled: "\u5DF2\u53D6\u6D88", backlog: "\u5F85\u89C4\u5212", idle: "\u7A7A\u95F2" };
  var searchSortLabels = { relevance: "\u76F8\u5173\u6027", "recently updated": "\u6700\u8FD1\u66F4\u65B0", "newest created": "\u6700\u65B0\u521B\u5EFA", priority: "\u4F18\u5148\u7EA7" };
  var searchScopes = { "all scopes": "\u6240\u6709\u8303\u56F4", tasks: "\u4EFB\u52A1", comments: "\u8BC4\u8BBA", documents: "\u6587\u6863", artifacts: "\u4EA7\u51FA\u7269", agents: "\u667A\u80FD\u4F53", projects: "\u9879\u76EE" };
  var searchFilterLabels = { Status: "\u72B6\u6001", Assignee: "\u8D1F\u8D23\u4EBA", Project: "\u9879\u76EE", Label: "\u6807\u7B7E", Priority: "\u4F18\u5148\u7EA7", Updated: "\u66F4\u65B0\u65F6\u95F4" };
  var TEMPLATES = Object.freeze([
    { context: "user-profile", pattern: /^(\S+@\S+) · (owner|member) · (active|inactive) · joined (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4})$/, render: (match) => `${match[1]} \xB7 ${{ owner: "\u6240\u6709\u8005", member: "\u6210\u5458" }[match[2]]} \xB7 ${{ active: "\u6D3B\u8DC3", inactive: "\u505C\u7528" }[match[3]]} \xB7 ${match[6]} \u5E74 ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(match[4]) + 1} \u6708 ${match[5]} \u65E5\u52A0\u5165` },
    { pattern: /^(\$[\d,.]+) spent$/, render: (match) => `\u5DF2\u652F\u51FA ${match[1]}` },
    { pattern: /^(\d+)% rate$/, render: (match) => `\u5B8C\u6210\u7387 ${match[1]}%` },
    { pattern: /^(\d+)% done$/, render: (match) => `\u5B8C\u6210\u7387 ${match[1]}%` },
    { pattern: /^Click the avatar to upload a new image\. Stored in Paperclip file storage for (.+)\.$/, render: (match) => `\u70B9\u51FB\u5934\u50CF\u4E0A\u4F20\u65B0\u56FE\u7247\u3002\u56FE\u7247\u5C06\u5B58\u50A8\u5728 ${match[1]} \u7684 Paperclip \u6587\u4EF6\u5B58\u50A8\u4E2D\u3002` },
    { pattern: /^How should (.+) work\?$/, render: (match) => `${match[1]} \u5E94\u5982\u4F55\u5DE5\u4F5C\uFF1F` },
    { pattern: /^Default: (.+)$/, render: (match) => `\u9ED8\u8BA4\uFF1A${match[1] === "Local" || match[1] === "Local machine" ? "\u672C\u673A" : match[1]}` },
    { pattern: /^Installed apps load tools into (.+)'s context on every run\. Permitted-only apps do not add context cost\.$/, render: (match) => `\u5DF2\u5B89\u88C5\u7684\u5E94\u7528\u4F1A\u5728\u6BCF\u6B21\u8FD0\u884C\u65F6\u5C06\u5DE5\u5177\u52A0\u5165 ${match[1]} \u7684\u4E0A\u4E0B\u6587\u3002\u4EC5\u83B7\u51C6\u4F7F\u7528\u3001\u672A\u5B89\u88C5\u7684\u5E94\u7528\u4E0D\u4F1A\u589E\u52A0\u4E0A\u4E0B\u6587\u5F00\u9500\u3002` },
    { pattern: /^(\d+) of (\d+) enabled$/, render: (match) => `\u5DF2\u542F\u7528 ${match[1]} / ${match[2]}` },
    { pattern: /^(\d+) total$/, render: (match) => `\u5171 ${match[1]} \u6761` },
    { pattern: /^(\d+) tools?$/, render: (match) => `${match[1]} \u4E2A\u5DE5\u5177` },
    { pattern: /^Failed run — (.+)$/, render: (match) => `\u8FD0\u884C\u5931\u8D25 \u2014 ${match[1]}` },
    { pattern: /^Run (\d{4,})$/, render: (match) => `\u8FD0\u884C ${match[1]}` },
    { pattern: /^Transcript \((\d+)\)$/, render: (match) => `\u5BF9\u8BDD\u8BB0\u5F55\uFF08${match[1]}\uFF09` },
    { pattern: /^Events \((\d+)\)$/, render: (match) => `\u4E8B\u4EF6\uFF08${match[1]}\uFF09` },
    { pattern: /^Duration: (\d+)s$/, render: (match) => `\u8017\u65F6\uFF1A${match[1]} \u79D2` },
    { pattern: /^Duration: (\d+)m (\d+)s$/, render: (match) => `\u8017\u65F6\uFF1A${match[1]} \u5206 ${match[2]} \u79D2` },
    { pattern: /^Searching for “(.+)”…$/, render: (match) => `\u6B63\u5728\u641C\u7D22\u201C${match[1]}\u201D\u2026` },
    { pattern: /^Filter by (Status|Assignee|Project|Label|Priority|Updated)$/, render: (match) => `\u6309${searchFilterLabels[match[1]]}\u7B5B\u9009` },
    { pattern: /^No results for “(.+)”$/, render: (match) => `\u672A\u627E\u5230\u201C${match[1]}\u201D\u7684\u7ED3\u679C` },
    { pattern: /^We couldn’t find a match in (all scopes|tasks|comments|documents|artifacts|agents|projects)\. Try widening the scope or rephrasing your query\.$/, render: (match) => `\u5728${searchScopes[match[1]]}\u5185\u90FD\u6CA1\u6709\u5339\u914D\u7ED3\u679C\u3002\u8BF7\u6269\u5927\u641C\u7D22\u8303\u56F4\u6216\u6362\u4E2A\u8BF4\u6CD5\u3002` },
    { pattern: /^Insert operator ([\w:>" -]+)$/, render: (match) => `\u63D2\u5165\u641C\u7D22\u6761\u4EF6 ${match[1]}` },
    { pattern: /^(\d+)(?: of (\d+))? results? · sorted by (Relevance|Recently updated|Newest created|Priority)(?: · (\d+) filters? active)?$/i, render: (match) => `${match[2] ? `\u663E\u793A ${match[2]} \u6761\u7ED3\u679C\u4E2D\u7684 ${match[1]} \u6761` : `${match[1]} \u6761\u7ED3\u679C`} \xB7 \u6309${searchSortLabels[match[3].toLowerCase()]}\u6392\u5E8F${match[4] ? ` \xB7 \u5DF2\u542F\u7528 ${match[4]} \u4E2A\u7B5B\u9009\u6761\u4EF6` : ""}` },
    { pattern: /^(\d+) of (\d+) results$/, render: (match) => `\u663E\u793A ${match[2]} \u6761\u7ED3\u679C\u4E2D\u7684 ${match[1]} \u6761` },
    { pattern: /^(\d+) results?$/, render: (match) => `${match[1]} \u6761\u7ED3\u679C` },
    { pattern: /^· sorted by (Relevance|Recently updated|Newest created|Priority)$/i, render: (match) => `\xB7 \u6309${searchSortLabels[match[1].toLowerCase()]}\u6392\u5E8F` },
    { pattern: /^· (\d+) filters? active$/, render: (match) => `\xB7 \u5DF2\u542F\u7528 ${match[1]} \u4E2A\u7B5B\u9009\u6761\u4EF6` },
    { pattern: /^(\d+) agents?$/i, render: (match) => `${match[1]} \u4E2A\u667A\u80FD\u4F53` },
    { pattern: /^(\d+) projects?$/i, render: (match) => `${match[1]} \u4E2A\u9879\u76EE` },
    { pattern: /^(\d+) tasks?$/i, render: (match) => `${match[1]} \u4E2A\u4EFB\u52A1` },
    { pattern: /^(\d+) routines?$/i, render: (match) => `${match[1]} \u4E2A\u4F8B\u884C\u4EFB\u52A1` },
    { pattern: /^(\d+) (running|paused|errors?|open|blocked)$/i, render: (match) => `${match[1]} \u4E2A${dashboardCounts[match[2].toLowerCase()]}` },
    { pattern: /^Finished (\d+)(mo|m|h|d|w|y) ago$/, render: (match) => `${match[1]} ${timeUnits[match[2]]}\u524D\u5B8C\u6210` },
    { pattern: /^(\d+)(mo|m|h|d|w|y) ago$/, render: (match) => `${match[1]} ${timeUnits[match[2]]}\u524D` },
    { pattern: /^updated (\d+)(mo|m|h|d|w|y) ago$/, render: (match) => `${match[1]} ${timeUnits[match[2]]}\u524D\u66F4\u65B0` },
    { pattern: /^failed · (\d+)(mo|m|h|d|w|y) ago$/, render: (match) => `\u5931\u8D25 \xB7 ${match[1]} ${timeUnits[match[2]]}\u524D` },
    { pattern: /^(\d+)m (\d+)s · (\d+) tools?$/, render: (match) => `${match[1]} \u5206 ${match[2]} \u79D2 \xB7 ${match[3]} \u4E2A\u5DE5\u5177` },
    { pattern: /^(\d+)s · (\d+) tools?$/, render: (match) => `${match[1]} \u79D2 \xB7 ${match[2]} \u4E2A\u5DE5\u5177` },
    { pattern: /^Message (.+) — describe what you want done…$/, render: (match) => `\u7ED9 ${match[1]} \u53D1\u6D88\u606F\u2014\u2014\u63CF\u8FF0\u4F60\u5E0C\u671B\u5B8C\u6210\u7684\u5DE5\u4F5C\u2026` },
    { pattern: /^The run failed \(([a-z0-9_]+)\)\. You can retry this message now\.$/, render: (match) => `\u8FD0\u884C\u5931\u8D25\uFF08${match[1]}\uFF09\u3002\u4F60\u73B0\u5728\u53EF\u4EE5\u91CD\u8BD5\u8FD9\u6761\u6D88\u606F\u3002` },
    { pattern: /^(\d+(?:\.\d+)?[kKmM]?) tokens across request-scoped events$/, render: (match) => `\u6309\u8BF7\u6C42\u7EDF\u8BA1\u7684\u4E8B\u4EF6\u5171\u4F7F\u7528 ${match[1]} \u4E2A token` },
    { pattern: /^(\$[\d,.]+) debits · (\$[\d,.]+) credits$/, render: (match) => `\u652F\u51FA ${match[1]} \xB7 \u62B5\u6263 ${match[2]}` },
    { pattern: /^(\d+) total events in range$/, render: (match) => `\u6240\u9009\u65F6\u6BB5\u5171 ${match[1]} \u4E2A\u4E8B\u4EF6` },
    { pattern: /^(\$[\d,.]+) estimated in range$/, render: (match) => `\u6240\u9009\u65F6\u6BB5\u4F30\u7B97 ${match[1]}` },
    { pattern: /^(\d+)m (\d+)s$/, render: (match) => `${match[1]} \u5206 ${match[2]} \u79D2` },
    { pattern: /^(\d+)s$/, render: (match) => `${match[1]} \u79D2` },
    { pattern: /^(\d+) api$/, render: (match) => `${match[1]} \u6B21 API \u8C03\u7528` },
    { pattern: /^(\d+) subscription$/, render: (match) => `${match[1]} \u6B21\u8BA2\u9605\u7528\u91CF` },
    { pattern: /^changed status to (todo|in progress|in review|done|blocked|cancelled|backlog|idle) on$/i, render: (match) => `\u5C06\u72B6\u6001\u6539\u4E3A${taskStatuses[match[1].toLowerCase()]}\uFF1A` },
    { pattern: /^changed status from (todo|in progress|in review|done|blocked|cancelled|backlog|idle) to (todo|in progress|in review|done|blocked|cancelled|backlog|idle) on$/i, render: (match) => `\u5C06\u72B6\u6001\u4ECE${taskStatuses[match[1].toLowerCase()]}\u6539\u4E3A${taskStatuses[match[2].toLowerCase()]}\uFF1A` },
    { pattern: /^Connect ([\w -]+) accounts for your agents\.$/, render: (match) => `\u4E3A\u667A\u80FD\u4F53\u8FDE\u63A5 ${match[1]} \u8D26\u6237\u3002` },
    { pattern: /^Connect ([\w. -]+)'s provider-hosted MCP server\.$/, render: (match) => `\u8FDE\u63A5 ${match[1]} \u6258\u7BA1\u7684 MCP \u670D\u52A1\u5668\u3002` },
    { pattern: /^Use the tools exposed by your ([\w -]+) MCP connection\.$/, render: (match) => `\u4F7F\u7528 ${match[1]} MCP \u8FDE\u63A5\u63D0\u4F9B\u7684\u5DE5\u5177\u3002` },
    { pattern: /^Use ([\w -]+) APIs with a restricted key\.$/, render: (match) => `\u901A\u8FC7\u53D7\u9650\u5BC6\u94A5\u4F7F\u7528 ${match[1]} API\u3002` },
    { pattern: /^added reviewer (.+) to$/, render: (match) => `\u6DFB\u52A0 ${match[1]} \u4E3A\u5BA1\u6838\u4EBA\uFF1A` }
  ]);

  // src/translate.js
  function createPhraseIndex(entries) {
    const index = /* @__PURE__ */ new Map();
    for (const { source, target, context = "" } of entries) {
      const key = `${context}\0${source}`;
      if (index.has(key)) throw new Error(`duplicate phrase: ${source} (${context || "default"})`);
      index.set(key, target);
    }
    return index;
  }
  var phraseIndex = createPhraseIndex(PHRASES);
  function translateUiString(raw, context = "") {
    if (typeof raw !== "string" || !raw.trim()) return null;
    const leading = raw.match(/^\s*/u)[0];
    const trailing = raw.match(/\s*$/u)[0];
    const text = raw.slice(leading.length, raw.length - trailing.length);
    const exact = phraseIndex.get(`${context}\0${text}`) ?? phraseIndex.get(`\0${text}`);
    if (exact !== void 0) return `${leading}${exact}${trailing}`;
    for (const { pattern, render, context: templateContext = "" } of TEMPLATES) {
      if (templateContext && templateContext !== context) continue;
      const match = pattern.exec(text);
      if (match) return `${leading}${render(match)}${trailing}`;
    }
    return null;
  }

  // src/dom.js
  var USER_CONTENT = ".paperclip-markdown, [data-testid='task-chat-human-bubble'], [data-testid='task-chat-agent-bubble'], [data-testid='task-chat-agent-identity'], [data-testid='task-chat-live-transcript'], [data-testid='instructions-raw-source'], [data-testid='issue-detail-header'] h2, nav.flex-wrap, aside a[href^='/issues/'], span.inline-flex[title], span.truncate[title], h2.cursor-pointer, h1.truncate, h2.truncate, button[aria-label='Open account menu'] span.truncate, [data-radix-popper-content-wrapper] p.truncate, [data-slot='task-row-title'], a[href*='/runs/'] > span.text-xs.truncate, span.truncate[class~='max-w-(--sz-300px)'], [data-filter-options='creators'] button > span.truncate, [data-filter-options='projects'] label span.text-sm, [data-filter-options='labels'] label span.text-sm, [data-filter-options='workspaces'] label span.text-sm, [contenteditable], [role='textbox'], pre, code";
  var TEXT_EXCLUDED = `${USER_CONTENT}, input, textarea, script, style`;
  var UI_ATTRIBUTES = ["placeholder", "title", "aria-label"];
  var COUNT_UNITS = { agent: "\u667A\u80FD\u4F53", project: "\u9879\u76EE", task: "\u4EFB\u52A1", routine: "\u4F8B\u884C\u4EFB\u52A1" };
  function contextFor(element) {
    if (/\/u\/[^/]+\/?$/.test(element.ownerDocument.location.pathname)) return "user-profile";
    if (element.closest("select[aria-label='Environment'], select[aria-label='\u73AF\u5883']")) return "environment-choice";
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
      node.nodeValue = "\u9ED8\u8BA4\uFF1A";
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
      const translated2 = translateUiString(parent.textContent);
      if (translated2) {
        parent.firstChild.nodeValue = translated2;
        for (const child of [...parent.childNodes].slice(1)) child.nodeValue = "";
        return 1;
      }
    }
    if (parent.matches("span.line-clamp-2") && parent.closest("a[href*='/runs/']") && parent.textContent.startsWith("Failed run \u2014 ")) {
      const translated2 = translateUiString(parent.textContent);
      if (translated2) {
        const textNodes = [...parent.childNodes].filter((child) => child.nodeType === 3);
        textNodes[0].nodeValue = translated2;
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
      parent.firstChild.nodeValue = `${count[1]} \u4E2A${COUNT_UNITS[count[2].toLowerCase()]}`;
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
        element.setAttribute("aria-label", "\u53EF\u7F16\u8F91\u7684 Markdown \u5185\u5BB9");
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
  function translateSubtree(root) {
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
  function observePaperclip(doc) {
    const root = doc.querySelector("#root");
    if (!root) return () => {
    };
    translateSubtree(doc.body);
    const pending = /* @__PURE__ */ new Set();
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
      attributeFilter: UI_ATTRIBUTES
    });
    return () => {
      observer.disconnect();
      if (timer !== null) doc.defaultView.clearTimeout(timer);
      pending.clear();
    };
  }

  // src/main.js
  if (isPaperclipDocument(document, location)) observePaperclip(document);
})();
