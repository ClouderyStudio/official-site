# 云术工作室 · 官网

Vue 3 + Vite 8 + TypeScript 单页官网，界面完全按 **Material Design 3** 规范实现：组件库 `@clderystd/m3-ui` + 官方 M3 设计令牌，不依赖 Vuetify / mdui / Tailwind。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Vue 3.5 `<script setup>` + TypeScript（`vue-tsc -b` 构建期类型检查） |
| 构建 | Vite 8 |
| 设计系统 | `@clderystd/m3-ui` 组件库；配色由 `@material/material-color-utilities` 以 HCT 生成 |
| 图标 | `unplugin-icons` 内联 SVG（Material Symbols + Simple Icons），构建期按需 tree-shaking |
| 字体 | Roboto Flex 可变字体，`@fontsource-variable/roboto-flex` 自托管 |
| 粒子背景 | Canvas 手写实现（无第三方库） |

## 命令

```bash
pnpm dev        # 开发服务器
pnpm build      # 类型检查 + 生产构建（输出 dist/）
pnpm preview    # 预览已构建产物
pnpm theme      # 重新生成配色令牌 src/styles/m3-color-tokens.css
pnpm shots      # 无头 Edge/Chrome 截图到 .review/（需本机安装浏览器）
```

参数写成 `--flag=value`：`--url=<url>`（默认 `http://127.0.0.1:4173/`）、`--out=<dir>`（默认 `.review`）、
`--theme=light|dark|both`、`--only=<name>` 只跑名称匹配的视口（如 `--only=desktop-light`）。
不传参数时按桌面 1440×1000 / 平板 834×1112 / 移动 390×844 × 浅色/深色全量输出，每个视口除整页大图外
还会按 `main > *` 与 `footer` 逐块分节截图，并额外抓取展开的云术超级菜单（`menu-desktop-open`）与
移动端抽屉（`drawer-mobile-open`）。脚本需要先起好预览服务器（`pnpm preview`）。

## 配色与令牌

- 种子色 `#2563EB`，配色方案 **SchemeVibrant**（浅色 primary `#0053db`，深色 primary `#b4c5ff`）。
- `scripts/generate-m3-theme.mjs` 生成浅色/深色两套完整令牌 → `src/styles/m3-color-tokens.css`；
  `src/styles/m3-foundations.css` 提供 typescale / shape / elevation / motion / state / layout 令牌，
  以及 `.md-typescale-*` 工具类。
- 主题状态存在 `localStorage["cloudery-theme"]`（`light | dark | system`），`index.html` 内联脚本
  在首屏绘制前打好 `.dark` 类，避免闪烁；切换时 `useTheme` 会短暂挂上 `.md-theme-transition` 做整页
  颜色交叉淡入。

## 目录结构

```
src/
  components/site/   页面区块
  components/site/   页面区块：SiteHeader / HeroSection / ParticlesBackground / LineCursor /
                     SectionHeading / AboutSection / ServicesSection / TeamSection /
                     ProjectsSection / CtaSection / PartnersSection / SiteFooter
  composables/       useTheme / useScrolled / useHitokoto / useModal
  directives/        v-ripple、v-reveal（滚动揭示，支持 blur 变体）、v-count-up（数字滚动）
  data/site.ts       站点全部文案与数据结构
  icons.ts           图标中央注册表（命名导出 Icon*，类型 IconComponent）
  styles/            m3-color-tokens.css / m3-foundations.css / base.css / motion.css / index.css
scripts/             配色生成、无头浏览器截图
```

## M3 组件库

组件来自独立仓库 [m3-ui](https://github.com/ClouderyStudio/m3-ui)，以 `@clderystd/m3-ui` 发布在 npm：

- 本仓库不再保有组件副本；改组件去 m3-ui 仓库改，升级用 `pnpm update @clderystd/m3-ui`
- **配色留在本仓库**（`src/styles/m3-color-tokens.css`），组件库只带结构令牌
- 样式入口 `src/styles/index.css` 先引入 `@clderystd/m3-ui/style.css`，再引入本站配色

`M3Icon`、`M3Button`、`M3IconButton`、`M3Fab`、`M3Card`、`M3Chip`、`M3SegmentedButton`、
`M3Divider`、`M3TopAppBar`、`M3Menu`、`M3MenuItem`、`M3Sheet`、`M3Dialog`、`M3List`、
`M3ListItem`、`M3Switch`、`M3Tooltip`、`M3Avatar`。

约定：状态层（hover 8% / focus 10% / pressed 10%）统一由 `.md-state-layer` 的 `::after` 承担；
海拔用 `--md-sys-elevation-level0~5`；圆角、字阶、时长与缓动全部走令牌，不写魔法数字。
个别组件（M3Chip / M3Dialog / M3MenuItem）当前页面未使用，保留以保证库的完整性。

## 动效

`src/styles/motion.css` 定义全局平滑滚动、主题交叉淡入与关键帧（md-fade-up / md-fade-in /
md-sheen / md-gradient-pan）。区块入场统一由 `v-reveal` 完成，网格按 `index * 60~100ms` 逐项错峰；
标题用 `v-reveal="{ blur: true }"` 以「模糊 → 清晰」渐显，统计数字用 `v-count-up` 从 0 滚到目标值，
Hero 叠加磁性粒子（跟随鼠标的引力场）并随滚动轻微位移淡出，全站跟随鼠标的弹簧线光标
（`LineCursor`，仅在精确指针设备上启用），头像在解码完成后淡入。项目筛选走 `<TransitionGroup>`
（进入/离开/位移三套过渡），抽屉分组展开用 `max-height` 过渡，导航链接用 `::after` 下划线 scaleX 展开，
卡片 hover 抬起并让图标轻微缩放旋转。

无障碍：`prefers-reduced-motion: reduce` 只做「削减」，不清零——最长的几档时长压到 300ms，Hero 位移
削弱到 30%，标题模糊改用 6px，光标轨迹减到 8 条，粒子减半；只关闭纯装饰的持续循环（箭头浮动、
标题渐变扫光）与平滑滚动。把时长整体压到 0 会让所有状态反馈消失、界面看起来是坏的，而 Chromium 在
Windows「动画效果」关闭时就会报告 reduce，所以站点不再采用那种做法。

## 说明

- 站点是客户端渲染的 SPA，Hero 一言（hitokoto）与头像/Logo 为远程资源，请求失败时回退到内置文案。
- 页面锚点滚动预留了顶部 App Bar 高度（`scroll-margin-top`）。

## 许可证

本项目采用 **GNU Affero General Public License v3.0（AGPL-3.0）** 授权，完整许可证文本见仓库根目录的 [LICENSE](LICENSE)。

AGPL-3.0 是强 copyleft 协议：可以自由使用、修改和分发本项目，但若将修改后的版本作为网络服务对外提供，必须以相同协议开放其源代码。