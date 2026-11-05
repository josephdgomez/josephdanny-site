
/* ------------------------------------------------------------------
   HOME PAGE CONTENT (defaults). Anything saved from /admin replaces these.
   Header, about, stats, services, banner and footer all live here.
------------------------------------------------------------------- */
const STAT_ICONS = ["users", "cal", "mic", "funnel", "chart", "heart", "globe", "star"];
const BANNER_ICONS = ["search", "video", "target", "trophy", "star", "check", "chart"];
const HOME_DEFAULT = {
  header: {
    eyebrow: "Marketing and communications leader",
    nameFirst: "Joseph Daniel",
    nameMark: "Gomez de la Mora",
    lede: "Hi, I'm Joseph. A marketing and communications leader with 5+ years of experience supporting population health and health equity initiatives across Pierce County.",
    es: "Campañas, video y diseño en inglés y español.",
    btnPortfolio: "View portfolio",
    btnResume: "Download resume",
    based: "Tacoma, Washington\nPierce County",
    languages: "English\nSpanish"
  },
  about: {
    statement: "Campaigns that connect people to health services, in the languages they speak.",
    paragraph: "I specialize in digital marketing, including creative strategy and paid media buying on Meta, Google, LinkedIn and TikTok. I pair that with content creation, cross-sector collaboration and multilingual community engagement to drive measurable service utilization for public benefit and private organizations.",
    headshot: "/headshot.jpg",
    pill1: "/rainier.jpg",
    pill2: "/team.jpg"
  },
  stats: [
    { value: "10,000+", label: "Pierce County residents engaged through programming", icon: "users" },
    { value: "100+", label: "Pierce County events planned and managed", icon: "cal" },
    { value: "50+", label: "live keynotes and presentations delivered", icon: "mic" },
    { value: "1,000s", label: "of leads generated through paid ad strategy", icon: "funnel" }
  ],
  services: [
    { title: "Paid media", text: "Campaigns on Meta, Google, LinkedIn and TikTok, built around measurable service utilization and reported on a steady cadence." },
    { title: "Creative strategy and content", text: "Concepts, video, graphics and print materials that carry a campaign from idea to finished asset." },
    { title: "Multilingual community engagement", text: "Outreach that meets people in their language, including a transit campaign across five languages." },
    { title: "Reporting and automation", text: "Tracking dashboards, intake workflows and marketing automation that guide budget and staffing decisions." }
  ],
  /* Awards and certifications in the scrolling banner. Leave the Drive id empty for a badge with no link. */
  banner: [
    { top: "Google Ads", main: "Search Certification", icon: "search", type: "p", id: "" },
    { top: "Google Ads", main: "Video Certification", icon: "video", type: "p", id: "1SoUQ_lkaOC24alWBHCUgAtRh8PASW8G4" },
    { top: "Meta", main: "Certified Media Buying Professional", icon: "target", type: "p", id: "1rBZQz9ED8cthxfq0f7KhdVKdv_a5J1lE" },
    { top: "South Sound Business", main: "40 Under 40 Honoree, 2025", icon: "trophy", type: "i", id: "1o50VhUOpHNvDtcc1aFs02Hse_CBb2BMn" }
  ],
  footer: {
    heading: "Let's work together.",
    tagline: "Campaigns, video, and design in English and Spanish.",
    email: "hello@josephdanny.co",
    linkedin: "https://linkedin.com/josephdgomez",
    website: "",
    owner: "Joseph Danny LLC",
    note: "Every file opens from Google Drive"
  }
};
