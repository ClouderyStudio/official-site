/**
 * Central icon registry.
 *
 * System/UI icons come from Google's Material Symbols (the MD3 icon set); brand
 * marks come from Simple Icons. unplugin-icons compiles each import to a
 * tree-shaken inline SVG component at build time, so nothing is fetched at runtime.
 */
import IconApi from '~icons/material-symbols/api'
import IconApps from '~icons/material-symbols/apps'
import IconArrowBack from '~icons/material-symbols/arrow-back'
import IconArrowForward from '~icons/material-symbols/arrow-forward'
import IconArrowOutward from '~icons/material-symbols/arrow-outward'
import IconArrowUpward from '~icons/material-symbols/arrow-upward'
import IconAutoAwesome from '~icons/material-symbols/auto-awesome'
import IconBolt from '~icons/material-symbols/bolt'
import IconBook from '~icons/material-symbols/book'
import IconCheck from '~icons/material-symbols/check'
import IconChevronRight from '~icons/material-symbols/chevron-right'
import IconClose from '~icons/material-symbols/close'
import IconCloud from '~icons/material-symbols/cloud'
import IconCode from '~icons/material-symbols/code'
import IconContentCopy from '~icons/material-symbols/content-copy'
import IconDarkMode from '~icons/material-symbols/dark-mode'
import IconDeployedCode from '~icons/material-symbols/deployed-code'
import IconDescription from '~icons/material-symbols/description'
import IconDesignServices from '~icons/material-symbols/design-services'
import IconDevices from '~icons/material-symbols/devices'
import IconDiversity3 from '~icons/material-symbols/diversity-3'
import IconDomain from '~icons/material-symbols/domain'
import IconDownload from '~icons/material-symbols/download'
import IconEco from '~icons/material-symbols/eco'
import IconEmojiObjects from '~icons/material-symbols/emoji-objects'
import IconEncrypted from '~icons/material-symbols/encrypted'
import IconExpandLess from '~icons/material-symbols/expand-less'
import IconExpandMore from '~icons/material-symbols/expand-more'
import IconFavorite from '~icons/material-symbols/favorite'
import IconForkRight from '~icons/material-symbols/fork-right'
import IconForum from '~icons/material-symbols/forum'
import IconGridView from '~icons/material-symbols/grid-view'
import IconGroup from '~icons/material-symbols/group'
import IconGroups from '~icons/material-symbols/groups'
import IconHandshake from '~icons/material-symbols/handshake'
import IconHub from '~icons/material-symbols/hub'
import IconInsights from '~icons/material-symbols/insights'
import IconIntegrationInstructions from '~icons/material-symbols/integration-instructions'
import IconKey from '~icons/material-symbols/key'
import IconLanguage from '~icons/material-symbols/language'
import IconLightMode from '~icons/material-symbols/light-mode'
import IconLink from '~icons/material-symbols/link'
import IconLock from '~icons/material-symbols/lock'
import IconMail from '~icons/material-symbols/mail'
import IconMemory from '~icons/material-symbols/memory'
import IconMenu from '~icons/material-symbols/menu'
import IconMonitorHeart from '~icons/material-symbols/monitor-heart'
import IconMoreVert from '~icons/material-symbols/more-vert'
import IconNorthEast from '~icons/material-symbols/north-east'
import IconOpenInNew from '~icons/material-symbols/open-in-new'
import IconPalette from '~icons/material-symbols/palette'
import IconPerson from '~icons/material-symbols/person'
import IconPlayArrow from '~icons/material-symbols/play-arrow'
import IconPsychology from '~icons/material-symbols/psychology'
import IconPublic from '~icons/material-symbols/public'
import IconRocketLaunch from '~icons/material-symbols/rocket-launch'
import IconSchool from '~icons/material-symbols/school'
import IconScience from '~icons/material-symbols/science'
import IconSentimentSatisfied from '~icons/material-symbols/sentiment-satisfied'
import IconShare from '~icons/material-symbols/share'
import IconShield from '~icons/material-symbols/shield'
import IconSpa from '~icons/material-symbols/spa'
import IconSportsEsports from '~icons/material-symbols/sports-esports'
import IconStar from '~icons/material-symbols/star'
import IconStorage from '~icons/material-symbols/storage'
import IconSupportAgent from '~icons/material-symbols/support-agent'
import IconTerminal from '~icons/material-symbols/terminal'
import IconTouchApp from '~icons/material-symbols/touch-app'
import IconTranslate from '~icons/material-symbols/translate'
import IconUpdate from '~icons/material-symbols/update'
import IconVerified from '~icons/material-symbols/verified'
import IconViewAgenda from '~icons/material-symbols/view-agenda'
import IconViewInAr from '~icons/material-symbols/view-in-ar'
import IconVisibility from '~icons/material-symbols/visibility'
import IconWorkspacePremium from '~icons/material-symbols/workspace-premium'
import IconBilibili from '~icons/simple-icons/bilibili'
import IconGithub from '~icons/simple-icons/github'
import IconQq from '~icons/simple-icons/qq'
import IconYoutube from '~icons/simple-icons/youtube'
import IconSparkle from '~icons/material-symbols/star-shine-rounded'
import IconNaturePeopleRounded from '~icons/material-symbols/nature-people-rounded'

export {
  IconApi, IconApps, IconArrowBack, IconArrowForward, IconArrowOutward, IconArrowUpward,
  IconAutoAwesome, IconBilibili, IconBolt, IconBook, IconCheck, IconChevronRight, IconClose,
  IconCloud, IconCode, IconContentCopy, IconDarkMode, IconDeployedCode, IconDescription,
  IconDesignServices, IconDevices, IconDiversity3, IconDomain, IconDownload, IconEco,
  IconEmojiObjects, IconEncrypted, IconExpandLess, IconExpandMore, IconFavorite, IconForkRight,
  IconForum, IconGithub, IconGridView, IconGroup, IconGroups, IconHandshake, IconHub, IconInsights,
  IconIntegrationInstructions, IconKey, IconLanguage, IconLightMode, IconLink, IconLock, IconMail,
  IconMemory, IconMenu, IconMonitorHeart, IconMoreVert, IconNorthEast, IconOpenInNew, IconPalette,
  IconPerson, IconPlayArrow, IconPsychology, IconPublic, IconQq, IconRocketLaunch, IconSchool,
  IconScience, IconSentimentSatisfied, IconShare, IconShield, IconSpa, IconSportsEsports, IconStar,
  IconStorage, IconSupportAgent, IconTerminal, IconTouchApp, IconTranslate, IconUpdate, IconVerified,
  IconViewAgenda, IconViewInAr, IconVisibility, IconWorkspacePremium, IconYoutube, IconSparkle, IconNaturePeopleRounded
}

/** Shape of an unplugin-icons SVG component, used for icon-typed props. */
export type IconComponent = (typeof IconCode)
