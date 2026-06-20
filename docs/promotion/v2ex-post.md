# V2EX 推广帖子 — 终稿

> 发帖标题：我花了个把小时写了个脚本，真把一条数据发到了区块链上

---

我们每天在各种平台发的帖子、写的评论、点的赞——这些数据到底属于谁？

答案挺残酷的：属于平台的数据库，不属于你。换个平台，一切归零。

后来我遇到了 [MetaWeb](https://metaid.io)——一个基于区块链的数据层方案。核心思路很简单：你的内容以 **Pin** 的形式存在链上，私钥签名，永远属于你。不需要 API Key，不需要平台审批，协议公开，任何人都能读写。

听起来挺酷，但对开发者来说，能亲手摸一把代码才是真的。

所以我花了个把小时写了个极简脚本，核心只做一件事：

```
git clone → npm install → node index.js → 数据上链 ✅
```

**真的上链了。** 429 satoshis，一笔真实的链上交易：

Pin ID: [`b7f2cd367debacaa3a30fdb8d4b4ea6da08537adbbe8aa4f890b1e4861e79caai0`](https://show.now/pin/b7f2cd367debacaa3a30fdb8d4b4ea6da08537adbbe8aa4f890b1e4861e79caai0) — [在链上查看](https://show.now/pin/b7f2cd367debacaa3a30fdb8d4b4ea6da08537adbbe8aa4f890b1e4861e79caai0)

![demo](https://raw.githubusercontent.com/newfish/metaweb-bot-quickstart/main/assets/demo.gif)

### 脚本做了什么

三种模式：

| 命令 | 说明 |
|---|---|
| `node index.js` | 检查环境 → 查链上身份 → 发一条 Buzz 上链 |
| `node index.js --demo` | 演示模式，展示 Pin 的完整数据结构，不真发链 |
| `node index.js --status` | 快速诊断，环境状态 JSON 一把输出 |

跑完后，脚本会自动输出 `What just happened?`，把三个核心概念串起来讲一遍：

- **Pin**：链上的每个数据单元都是一个 Pin，你发的 Buzz 就是一个 Pin
- **Protocol**：Pin 遵循的协议格式，`/protocols/simplebuzz` 表示"这是一条社交动态"
- **Proof**：Pin 由你的 MetaBot 密钥签名，证明是你发的，没人能伪造

```
Pin + Protocol + Proof = Your Data, Your Rules
```

### 仓库已开源

[https://github.com/newfish/metaweb-bot-quickstart](https://github.com/newfish/metaweb-bot-quickstart)

目前包括：
- 完整脚本（index.js，三种模式）
- 图文教程（docs/tutorial.md）
- 概念卡片（docs/concepts.md）
- 社区基建：Discussion / Issue 模板 / Contributing Guide

整个项目 MIT 协议，欢迎 fork、pr、提 issue。

### 最后

作为一个开发者，最直接的体验就是：**运行一次，看到自己的数据在链上真实存在**。这种即时正反馈比读十篇文档都有说服力。

不用读完文档再动手。`git clone` 开始，三分钟你就知道我在说什么了。
