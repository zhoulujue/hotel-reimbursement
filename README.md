# 酒店费用报销计算器

- 技术栈：React + TypeScript + Vite + TailwindCSS
- 路由：`react-router-dom`，支持 `/` 与 `/rules`
- 架构：输入表单 → 验证 → 计算器 → 结果展示与分段明细

## 使用

- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview` → 访问 `http://localhost:4173/hotel-reimbursement/`
- 检查：`npm run check`（TypeScript） / `npm run lint`
- 测试：`npm run test`

## 近期更新

- 修复百分比在总费用为 0 时的 `NaN` 问题
- 规则页返回按钮改为客户端路由 `<Link>`，避免整页刷新
- 计算器增加输入校验，防止未填或负值导致的错误
- 新增单元测试覆盖核心计算逻辑与校验

## 页面

- 计算器：`/` 输入两种模式，“已获得特殊审批”直接公司全额承担
- 政策说明：`/rules` 展示分段规则与使用指南，可返回计算器
