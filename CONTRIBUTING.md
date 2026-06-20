# Contributing to MetaBot Quickstart

首先，感谢你对这个项目的兴趣！🎉

无论你是发现了 Bug、有功能建议、想改进文档，还是想贡献代码——我们都热烈欢迎。

---

## 目录

- [行为准则](#行为准则)
- [如何参与](#如何参与)
  - [🐛 报告 Bug](#-报告-bug)
  - [💡 提出功能建议](#-提出功能建议)
  - [📝 改进文档](#-改进文档)
  - [🛠 提交代码](#-提交代码)
- [开发指南](#开发指南)
  - [本地环境](#本地环境)
  - [代码风格](#代码风格)
  - [提交规范](#提交规范)
- [PR 流程](#pr-流程)
- [需要帮助？](#需要帮助)

---

## 行为准则

本项目遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。我们期望所有参与者都能营造一个开放、友好的社区氛围。

**简而言之：尊重他人，共建社区。**

---

## 如何参与

### 🐛 报告 Bug

遇到问题？请[提交 Bug Issue](https://github.com/newfish/metaweb-bot-quickstart/issues/new?template=bug_report.md) 并包含：

- 你的 **操作系统和 Node.js 版本**
- 运行的 **命令和完整输出**（特别是错误堆栈）
- **已尝试的排查步骤**
- RPC 连接状态（运行 `node index.js --status` 的输出）

### 💡 提出功能建议

有好的想法？请[提交 Feature Request](https://github.com/newfish/metaweb-bot-quickstart/issues/new?template=feature_request.md)。

一些我们特别感兴趣的方向：

- 更多 Buzz 类型支持（图片、视频、链接卡片）
- 其他链网络的适配
- Web UI 界面
- 与主流框架的集成示例（如 Vite、Next.js）

### 📝 改进文档

文档永远有改进空间！哪怕是修正一个错别字、让某个步骤更清晰，都是非常有价值的贡献。

直接在仓库里编辑并提交 PR 即可。

### 🛠 提交代码

想贡献代码？太棒了！以下是我们的开发流程。

---

## 开发指南

### 本地环境

```bash
# 克隆仓库
git clone https://github.com/newfish/metaweb-bot-quickstart.git
cd metaweb-bot-quickstart

# 安装依赖
npm install

# 创建环境配置
cp .env.example .env
# 编辑 .env 填入你的 MetaBot ID

# 验证环境
node index.js --status
```

### 代码风格

- 使用 **ESM**（`import` / `export`）而非 CommonJS
- 支持 **Node.js 18+**
- 使用 `const` / `let`，不使用 `var`
- 异步操作使用 `async/await`
- 添加有意义的注释——尤其当代码与 MetaWeb 协议概念相关时
- 保持函数短小、单一职责

### 提交规范

我们使用约定式提交（Conventional Commits）：

| 类型 | 用途 |
|---|---|
| `feat:` | 新功能 |
| `fix:` | Bug 修复 |
| `docs:` | 文档变更 |
| `style:` | 代码格式（不影响功能） |
| `refactor:` | 代码重构 |
| `test:` | 测试相关 |
| `chore:` | 构建/工具链 |

示例：

```
feat: add image attachment support for Buzz posts
docs: fix typo in tutorial step 3
fix: handle empty MetaBot ID gracefully
```

---

## PR 流程

1. **Fork 本仓库** 并创建你的分支：`git checkout -b feat/your-feature-name`
2. **修改代码**，确保 `--demo` 模式能正常运行
3. **运行 `node index.js --status`** 确认环境健康
4. **提交**：`git commit -m "feat: your concise description"`
5. **推送**：`git push origin feat/your-feature-name`
6. **创建 Pull Request** 到 `main` 分支

我们会尽快 review PR，有任何问题会在 PR 中与你讨论。

### PR 清单

提交 PR 前，请确认：

- [ ] 代码在 `--demo` 模式下通过测试
- [ ] 没有破坏现有功能
- [ ] 添加了必要的注释（特别是 MetaWeb 协议相关代码）
- [ ] 更新了相关文档（如 `README.md` 或 `docs/tutorial.md`）
- [ ] Commit 信息符合规范

---

## 需要帮助？

- 💬 在 [Discussions](https://github.com/newfish/metaweb-bot-quickstart/discussions) 提问
- 📖 阅读 [教程文档](docs/tutorial.md)
- 🔗 了解 [MetaWeb 协议](https://github.com/metaid/metaid-docs)
- 🐦 在 Twitter/X 上关注 [#MetaWeb](https://twitter.com/search?q=MetaWeb)

---

**每一份贡献，无论大小，都在帮助 MetaWeb 变得更好。感谢你的参与！** 🚀
