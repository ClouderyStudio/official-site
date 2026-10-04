/**
 * Site content.
 *
 * Ported verbatim from the legacy Nuxt site (E:\.Cloudery\Website\site\app\app.vue and
 * app/components/site-header.vue); only the icon references changed, from @iconify
 * string names to components from '@/icons'.
 */
import {
  IconBilibili,
  IconBook,
  IconCloud,
  IconCode,
  IconDeployedCode,
  IconDescription,
  IconDesignServices,
  IconDomain,
  IconEco,
  IconGithub,
  IconGroups,
  IconHub,
  IconInsights,
  IconMail,
  IconMonitorHeart,
  IconPalette,
  IconPerson,
  IconPsychology,
  IconPublic,
  IconRocketLaunch,
  IconShield,
  IconSportsEsports,
  IconSupportAgent,
  IconTerminal,
  IconViewInAr,
  IconSparkle,
  IconNaturePeopleRounded,
  type IconComponent,
} from '@/icons'

export interface Service {
  icon: IconComponent
  title: string
  desc: string
  /** Concrete deliverables, shown as a short checklist on the service card. */
  points: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  icon: IconComponent
  /** Live site, when the project is publicly reachable. */
  view?: string
  /** Source repository, when it is open source. */
  link?: string
  category: string
}

export interface Social {
  platform: string
  icon: IconComponent
  url: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  skills: string[]
  avatar: string
  socials?: Social[]
}

export interface Partner {
  id: number
  name: string
  logo: string
  icon: IconComponent
  website: string
}

export interface MenuItem {
  name: string
  description: string
  icon: IconComponent
  href: string
}

export interface NavLink {
  label: string
  href: string
}

export const heroImage = '/images/hero-banner.webp'
export const heroLogo = '/images/logo.webp'
export const contactEmail = 'admin@cldery.com'
export const githubOrg = 'https://github.com/ClouderyStudio'
export const qqGroup = 'https://qm.qq.com/q/Fg3aqm6ccW'
export const docSite = 'https://docs.cldery.com'
export const hitokotoEndpoint = 'https://v1.hitokoto.cn'
export const hitokotoFallback = { hitokoto: '代码改变世界', from: '程序员' }

export const studioInfo = {
  name: '云术工作室',
  tagline: '创意与技术的完美结合',
  description:
    '我们是一支充满激情的团队，致力于创造卓越的数字体验。从概念到实现，我们专注于每一个细节，为您打造独一无二的作品。',
  services: [
    {
      icon: IconCode,
      title: 'Web 应用开发',
      desc: '从「辽阔域名」的域名分发到统一身份认证的单点登录，我们做能被长期维护的 Web 平台。',
      points: ['Vue 3 / Nuxt 4 前端与设计系统', '账号、权限与 SSO 单点登录', '开放 API、文档站与后台管理'],
    },
    {
      icon: IconPalette,
      title: 'UI/UX 设计',
      desc: '先定设计令牌与组件规范，再打磨每一个界面，让产品一致、可扩展，也更容易迭代。',
      points: ['设计令牌与组件规范', '响应式布局与深浅色主题', '原型评审与可用性走查'],
    },
    {
      icon: IconCloud,
      title: '全栈与运维',
      desc: '从接口、数据库到部署监控，自有服务的整条链路由我们自己托管，长期负责到底。',
      points: ['后端接口与数据库设计', 'Flutter / C# 跨平台客户端', '部署、监控与长期维护'],
    },
  ] satisfies Service[],
  stats: [
    { value: '20+', label: '完成项目' },
    { value: '9+', label: '团队成员' },
    { value: '3', label: '代表作品' },
  ] satisfies Stat[],
}

/** 我们是谁 — body copy. */
export const aboutIntro = {
  lead: '云术工作室',
  before: '是由云竹团队与魔术团队于2023年合并成立的协作组织，',
  focus: '前后端开发',
  and: '和',
  focusSecond: '游戏服务',
  after: '领域。',
  goalsLabel: '我们的目标是：',
  goals: ['构建高质量的开源项目', '促进技术交流与协作', '创造有价值的开发者工具、文档和游戏服务'],
  outro: '欢迎支持或加入我们，一起推动技术创新和社区发展！',
}

export const projects: Project[] = [
  {
    id: 1,
    title: '辽阔域名',
    description:
      '辽阔二级域名分发平台，提供免费二级域名注册、DNS解析和API接口，拥有诸如fucku.top、frp.cx等热门域名，适合个人和小型项目使用。',
    tags: ['域名服务', '免费', '开放API', 'DNS'],
    icon: IconDomain,
    view: 'https://lkdns.org',
    category: 'Web应用',
  },
  {
    id: 2,
    title: '云术生存战争服务器',
    description:
      '一个趣味生存战争服务器，提供稳定的游戏环境和丰富的玩法，拥有活跃的社区和定期的活动，适合大部分玩家加入。',
    tags: ['生存战争', '游戏服务器', '社区'],
    icon: IconViewInAr,
    view: 'https://sc.cldery.com',
    category: '游戏服务',
  },
  {
    id: 11,
    title: 'SCForge 插件模组资源平台',
    description:
      '生存战争（SurvivalCraft）的插件与模组资源平台：插件是 .dll、模组是 .netmod，支持浏览与搜索、发布与先审后发、版本管理、评论与社区评价。',
    tags: ['生存战争', '插件模组', '资源平台', '社区'],
    icon: IconDeployedCode,
    view: 'https://scforge.cldery.com',
    category: '游戏服务',
  },
  {
    id: 3,
    title: '竹像素Minecraft服务器',
    description: '一个现代化、高版本、低延迟的周目制生存服务器。',
    tags: ['Minecraft', '游戏服务器', '现代化', '社区'],
    icon: IconSportsEsports,
    view: 'https://mczxs.cn',
    category: '游戏服务',
  },
  {
    id: 4,
    title: '云术统一身份认证中心',
    description:
      '一个统一身份认证系统，提供单点登录、用户管理和权限控制，适用于各种Web应用和服务。',
    tags: ['统一认证', '身份管理', '安全性', 'Web应用'],
    icon: IconShield,
    view: 'https://auth.cldery.com',
    category: 'Web应用',
  },
  {
    id: 5,
    title: '栖所',
    description:
      '[停止维护]栖所是一个专注于心理健康与情绪陪伴的温暖社区。在这里，你可以安全地记录每日心情、分享对抗心理疾病的方法、阅读心理舒缓资源，并在匿名的互助社区中找到共鸣与力量。',
    tags: ['心理健康', '社区', '支持', '福祉'],
    icon: IconMonitorHeart,
    view: 'https://qisoul.cldery.com',
    link: 'https://github.com/ClouderyStudio/qisoul',
    category: '心理健康',
  },
  {
    id: 6,
    title: '心灵驿站',
    description:
      '一个基于 Nuxt 4 开发的专业心理健康测评平台，提供多种标准化的心理测评量表，帮助用户了解自己的心理状态。',
    tags: ['心理健康', '自助支持', '心理测评', '专业量表'],
    icon: IconDescription,
    view: 'https://pt.cldery.com',
    link: 'https://github.com/ClouderyStudio/psychology',
    category: '心理健康',
  },
  {
    id: 7,
    title: '心光',
    description:
      '一个前后端分离的、基于 Vue + C# 开发的匿名优先心理论坛平台，旨在为用户提供一个安全、私密的空间，分享心理健康相关的经验和资源，以及AI辅助的心理测评工具，帮助用户更好地了解和管理自己的心理状态。',
    tags: ['心理健康', '自助支持', '心理测评', '论坛', '社区'],
    icon: IconSparkle,
    view: 'https://mhop.cldery.com',
    link: 'https://github.com/ClouderyStudio/mhop-frontend',
    category: '心理健康',
  },
  {
    id: 8,
    title: '脑电波',
    description:
      '一款专注于治愈与陪伴的跨平台个人情绪记录软件。在隐私安全方面，moodtab 采用高性能本地数据库存储，100% 不上传云端，给你的内心世界最安全的物理保护。',
    tags: ['个人情绪记录', '纯本地存储', '跨平台', 'Flutter'],
    icon: IconPsychology,
    view: 'https://github.com/ClouderyStudio/mood-tab/releases',
    link: 'https://github.com/ClouderyStudio/mood-tab',
    category: '心理健康',
  },
  {
    id: 9,
    title: '心理树洞',
    description:
      '心理树洞是一个基于QQ群的心理交流社区，用户可以分享自己的心理困扰、情绪体验和生活感悟，获得他人的理解和支持。管理员会定期组织活动，促进群内成员的互动和交流，目前已有超过300名成员加入。',
    tags: ['庞大社区', '心理健康', '交流', '互相支持'],
    icon: IconNaturePeopleRounded,
    view: 'https://qm.qq.com/q/cTbsVDTROo',
    category: '心理健康',
  },
]

export const projectTags = ['全部', 'Web应用', '游戏服务', '心理健康']

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: '柒屹',
    role: '创始人 & 全栈开发',
    bio: '我是柒屹，柒星拱月，屹立不倒。从事互联网事业及网站开发工作，也在搞Java的一些东西。',
    skills: ['Java', 'Vue', 'Python', 'Photoshop', 'Rust', 'C#', 'Maui', "Golang", "TypeScript"],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2675256772&s=640',
    socials: [
      { platform: 'GitHub', icon: IconGithub, url: 'https://github.com/TulipQiyi' },
      { platform: '个人主页', icon: IconPerson, url: 'https://qiyi.cldery.com/' },
      { platform: '哔哩哔哩', icon: IconBilibili, url: 'https://space.bilibili.com/1762277941' },
      { platform: '邮箱', icon: IconMail, url: 'mailto:justqiyi@qq.com' },
    ],
  },
  {
    id: 2,
    name: '云竹',
    role: '创始人 & 全栈开发',
    bio: '这里是云竹，云蒸霞蔚，竹解虚心。对多彩的世界和可爱的你感到好奇，正在尝试从事互联网产品和网站开发相关工作。',
    skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js', 'Python'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2457483710&s=640',
    socials: [
      { platform: 'GitHub', icon: IconGithub, url: 'https://github.com/yunzhu666' },
      { platform: '哔哩哔哩', icon: IconBilibili, url: 'https://space.bilibili.com/526436598' },
      { platform: '邮箱', icon: IconMail, url: 'mailto:2457483710@qq.com' },
    ],
  },
  {
    id: 3,
    name: 'AnonUsAl',
    role: '算法工程师 & 全栈开发',
    bio: '对计算机技术抱有深厚热忱，始终保持主动学习和持续探索的动力。技术成长路径清晰明确，已从初期的指令跟随，进阶为具备独立研判、资源检索与系统调试能力的实践者，能够高效推动想法从概念走向可运行状态。',
    skills: ['Flutter', 'C++', 'C', 'Python', 'TypeScript'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3353739856&s=640',
    socials: [
      { platform: 'GitHub', icon: IconGithub, url: 'https://github.com/yunzhu666' },
      { platform: '个人主页', icon: IconPerson, url: 'https://anonusal.cldery.com/' },
      { platform: '邮箱', icon: IconMail, url: 'mailto:3353739856@qq.com' },
    ],
  },
  {
    id: 4,
    name: '胖头鱼不吃鱼',
    role: '全栈开发 & 移动端适配',
    bio: '我是胖头鱼，游在数字海洋的胖鱼，尝试学习怎么在应用的海洋里游泳、主要负责网站开发，管理和移动端适配。',
    skills: ['JavaScript', 'Vue.js', 'Python', 'CSS', 'C#'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3959366979&s=640',
    socials: [
      { platform: 'GitHub', icon: IconGithub, url: 'https://github.com/jmj626000' },
      { platform: '邮箱', icon: IconMail, url: 'mailto:3353739856@qq.com' },
    ],
  },
  {
    id: 5,
    name: 'Zero',
    role: '设计师 & 挂群',
    bio: '你知道吗，零是一切的开始。一个虽然没有qqvip但是专门挂群的人。',
    skills: ['Designer', 'Photoshop', 'Figma', 'Adobe XD', 'UI/UX Design'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3014786442&s=640',
  },
  {
    id: 6,
    name: '信念',
    role: '服务器管理员',
    bio: '信马由缰，念兹在兹。主管云术生存战争服务器。',
    skills: ['SurvivalCraft', 'Manager', 'Communication'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=953595252&s=640',
  },
  {
    id: 7,
    name: '屿',
    role: '正式成员 & 顾问',
    bio: '暂无介绍，心理树洞管理员。',
    skills: ['Helper', 'Manager', 'Communication'],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3801901707&s=640',
  },
  {
    id: 8,
    name: 'Mio',
    role: '正式成员',
    bio: '暂无介绍。',
    skills: [],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3539880658&s=640',
  },
  {
    id: 10,
    name: 'C8H806',
    role: '吉祥物',
    bio: '对的，这是一只比较凶的吉祥物，名字叫C8H806，维生素...C8?。负责当吉祥物，lol',
    skills: [],
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3067315092&s=640',
  },
]

export const partners: Partner[] = [
  {
    id: 1,
    name: 'PXF我的世界服务器',
    logo: '/images/partners/pxfmc.png',
    icon: IconEco,
    website: 'https://pxfmc.top',
  },
  {
    id: 2,
    name: '云创联跃团队',
    logo: '/images/partners/ycly.webp',
    icon: IconCloud,
    website: 'https://ycly.net',
  },
  {
    id: 3,
    name: '辽阔DNS',
    logo: '/images/partners/lkdns.ico',
    icon: IconPublic,
    website: 'https://lkdns.org',
  },
  {
    id: 4,
    name: '笔墨星河AI写作',
    logo: '/images/partners/bmdocs.jpg',
    icon: IconCode,
    website: 'https://docs.cldery.com/bmdocs/',
  }
]

/** 合作伙伴 section footer stats. */
export const partnerStats = [
  { value: partners.length + '+', label: '合作团队' },
  { value: '4+', label: '成功项目' },
  { value: '2+', label: '长期伙伴' },
]

/** In-page navigation. */
export const navLinks: NavLink[] = [
  { label: '关于我们', href: '#about' },
  { label: '我们的服务', href: '#services' },
  { label: '核心成员', href: '#team' },
  { label: '项目展示', href: '#projects' },
  { label: '合作伙伴', href: '#partners' },
]

/**
 * 云术 mega menu. The legacy site shipped placeholder copy here; this version lists the
 * studio's real properties and the in-page destinations, grouped by domain.
 */
export const megaMenu: { title: string; columns: { category: string; items: MenuItem[] }[] } = {
  title: '云术',
  columns: [
    {
      category: '开发',
      items: [
        {
          name: '云术统一身份认证中心',
          description: '单点登录与统一权限管理',
          icon: IconShield,
          href: 'https://auth.cldery.com',
        },
        {
          name: '辽阔域名',
          description: '免费二级域名与 DNS 解析',
          icon: IconDomain,
          href: 'https://lkdns.org',
        },
        {
          name: '文档站',
          description: '接口文档与使用指南',
          icon: IconBook,
          href: docSite,
        },
      ],
    },
    {
      category: '游戏',
      items: [
        {
          name: '云术生存战争服务器',
          description: '趣味生存战争与活跃社区',
          icon: IconViewInAr,
          href: 'https://sc.cldery.com',
        },
        {
          name: '竹像素Minecraft服务器',
          description: '现代化、低延迟周目制生存服',
          icon: IconSportsEsports,
          href: 'https://mczxs.cn',
        },
        {
          name: 'PXF我的世界服务器',
          description: '合作伙伴的模组服务器',
          icon: IconEco,
          href: 'https://pxfmc.top',
        },
      ],
    },
    {
      category: '心理健康',
      items: [
        {
          name: '心光',
          description: '匿名优先心理论坛平台',
          icon: IconMonitorHeart,
          href: 'https://mhop.cldery.com',
        },
        {
          name: '心灵驿站',
          description: '标准化心理测评平台',
          icon: IconDescription,
          href: 'https://pt.cldery.com',
        },
        {
          name: '脑电波',
          description: '纯本地的跨平台情绪记录',
          icon: IconPsychology,
          href: 'https://github.com/ClouderyStudio/mood-tab/releases',
        },
      ],
    },
  ],
}

/** Mobile drawer / footer quick links. */
export const miniLinks: NavLink[] = [
  { label: '首页', href: '#top' },
  { label: '关于我们', href: '#about' },
  { label: '我们的服务', href: '#services' },
  { label: '核心成员', href: '#team' },
  { label: '项目展示', href: '#projects' },
  { label: '合作伙伴', href: '#partners' },
  { label: '联系我们', href: '#contact' },
  { label: 'GitHub', href: githubOrg },
]

export const socialLinks = [
  { name: 'GitHub', icon: IconGithub, href: githubOrg },
  { name: '哔哩哔哩', icon: IconBilibili, href: 'https://space.bilibili.com/526436598' },
  { name: 'QQ群', icon: IconSupportAgent, href: qqGroup },
]

/** 行动号召 — primary channels. */
export const ctaChannels = [
  { label: '联系我们', icon: IconMail, href: 'mailto:' + contactEmail, variant: 'filled' as const },
  { label: 'GitHub', icon: IconGithub, href: githubOrg, variant: 'outlined' as const },
  { label: 'QQ群', icon: IconSupportAgent, href: qqGroup, variant: 'outlined' as const },
  { label: '文档站', icon: IconBook, href: docSite, variant: 'tonal' as const },
]

/** Footer columns. */
export const footerColumns = [
  {
    title: '产品',
    links: [
      { label: '辽阔域名', href: 'https://lkdns.org' },
      { label: '统一身份认证中心', href: 'https://auth.cldery.com' },
      { label: '栖所', href: 'https://qisoul.cldery.com' },
      { label: '心灵驿站', href: 'https://pt.cldery.com' },
    ],
  },
  {
    title: '社区',
    links: [
      { label: '云术生存战争服务器', href: 'https://sc.cldery.com' },
      { label: '竹像素Minecraft服务器', href: 'https://mczxs.cn' },
      { label: 'QQ群', href: qqGroup },
      { label: 'GitHub', href: githubOrg },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '文档站', href: docSite },
      { label: '脑电波', href: 'https://github.com/ClouderyStudio/mood-tab' },
      { label: '心理健康平台源码', href: 'https://github.com/ClouderyStudio/psychology' },
      { label: '联系我们', href: 'mailto:' + contactEmail },
    ],
  },
]

/** Capability highlights shown in the 我们是谁 block. */
export const capabilities = [
  { icon: IconTerminal, title: '工程实践', desc: '类型安全、可测试、可持续交付的前后端实现。' },
  { icon: IconDesignServices, title: '体验设计', desc: '以设计系统为基础的界面与交互，一致且可扩展。' },
  { icon: IconHub, title: '基础设施', desc: '域名、认证、部署与监控，自有服务全链路托管。' },
  { icon: IconGroups, title: '社区协作', desc: '开源、文档与技术支持，和伙伴一起长期维护。' },
]

/** Timeline-ish facts reused by the about block. */
export const studioFacts = [
  { icon: IconRocketLaunch, label: '成立于 2023 年', detail: '云竹团队与魔术团队合并' },
  { icon: IconDeployedCode, label: '专注两大领域', detail: '前后端开发 · 游戏服务' },
  { icon: IconInsights, label: '持续开源', detail: '工具、文档与服务长期维护' },
]
