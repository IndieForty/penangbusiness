import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Slugs with a /blog/ equivalent — redirect old WordPress paths to new canonical paths
const BLOG_SLUGS: Set<string> =  new Set([
    '7-inbound-marketing-tactics-that-are-working-right-now-and-3-that-arent',
    'a-complete-framework-for-scaling-b2b-sales-in-ireland',
    'an-post-ceo-pay-debate-a-window-into-semi-state-sector-challenges',
    'an-unexpected-asset-transfer-rte-returns-e60000-painting-to-dublin-gallery',
    'b-2-b-content-marketing-strategies',
    'b-2-b-conversion-rate-optimization',
    'b-2-b-customer-research',
    'b-2-b-customer-retention-strategies',
    'b-2-b-customer-segmentation',
    'b-2-b-lead-generation-strategies',
    'b-2-b-sales-pipeline',
    'best-time-to-send-cold-emails',
    'big-tech-in-ireland-hqs-jobs-impact-on-dublins-tech-ecosystem',
    'bootstrapping-success-in-irelands-pr-landscape-rory-godsons-powerscourt',
    'building-a-startup-sales-team',
    'bunqs-deposit-rate-hike-a-quiet-shift-in-irelands-digital-finance-landscape',
    'case-studies-that-close-deals-in-financial-services',
    'christmas-spending-surge-a-mixed-blessing-for-irish-economy-and-retail',
    'cold-calling-scripts-examples',
    'cold-email-best-practices',
    'cold-email-templates-b-2-b',
    'cold-email-templates-for-sales',
    'common-sales-objections',
    'communication-plan-template',
    'competitive-analysis-framework',
    'content-marketing-best-practices',
    'cost-of-living-for-tech-workers-in-dublin-a-comprehensive-guide-for-tech-professionals',
    'cracking-down-on-piracy-fines-for-dodgy-box-users-and-what-it-means-for-irelands-tech-and-policy-landscape',
    'creating-trust-in-cold-outreach-for-financial-services',
    'crhs-sp-500-inclusion-more-than-just-a-share-price-spike',
    'curragh-racecourse-loan-conversion-a-closer-look-at-irelands-commercial-and-investment-landscape',
    'daa-leadership-stability-kenny-jacobs-stay-signals-more-than-just-continuity',
    'daa-leadership-under-siege-what-irelands-airport-operator-turmoil-means-for-business',
    'data-breaches-in-ireland-almost-one-in-four-peoples-details-compromised',
    'digital-boarding-passes-more-than-just-a-boarding-gate-fad',
    'disinformation-and-cyber-threats-shadow-irelands-eu-presidency-ambitions',
    'dublin-tech-scene-2025-guide',
    'dublin-tech-scene-2025-guide-2',
    'dublin-vs-berlin-competing-for-european-tech-dominance-a-comparative-analysis-of-two-leading-tech-hubs',
    'elon-musks-legal-siege-on-irelands-media-regulator-more-than-just-courtroom-drama',
    'email-deliverability-best-practices',
    'email-marketing-audit-checklist',
    'email-subject-line-best-practices',
    'espionage-goes-digital-irelands-cybersecurity-crossroads',
    'european-growth-steadies-its-grip-despite-global-trade-warnings',
    'eus-ai-and-gdpr-policy-shift-what-it-means-for-irelands-tech-landscape',
    'gdpr-compliance-checklist',
    'gdpr-email-consent-examples',
    'government-hikes-health-insurance-levy-a-subtle-squeeze-on-irish-pockets',
    'government-targets-planning-judicial-reviews-to-unclog-irelands-infrastructure-pipeline',
    'heavy-reliance-on-foreign-firms-an-irish-economy-walking-a-tightrope',
    'housing-output-stalls-in-2026-irelands-development-bottleneck-persists',
    'how-gdpr-impacts-cold-outreach-in-ireland',
    'how-irish-policy-supports-innovation-tech',
    'how-procurement-works-in-mid-sized-financial-firms',
    'how-to-build-and-manage-a-remote-sdr-team-in-ireland',
    'how-to-generate-b-2-b-leads',
    'how-to-handle-sales-objections',
    'how-to-improve-sales-team-performance',
    'how-to-position-your-service-for-banks-and-fintechs',
    'how-to-qualify-sales-leads',
    'how-to-sell-effectively-to-financial-services-companies',
    'how-to-vet-saas-subscriptions-to-cut-costs',
    'ikea-irelands-profit-slide-more-than-just-furniture-troubles',
    'improve-email-open-rates',
    'inflation-peaks-again-irelands-economic-sideshow-continues',
    'intercultural-communication-in-business',
    'international-expansion-strategy',
    'international-market-entry-strategies',
    'irelands-2025-recession-a-reality-check-amid-the-cheerleading',
    'irish-authorities-explore-social-media-restrictions-following-australias-lead',
    'irish-business-etiquette',
    'irish-christmas-cost-rises-a-canary-in-the-economic-coal-mine',
    'lead-generation-for-small-business',
    'lead-generation-for-startups',
    'lead-generation-ireland',
    'lead-nurturing-examples',
    'lead-qualification-process',
    'lead-scoring-best-practices',
    'liquidators-appointed-to-athlone-investment-firm-what-it-means-for-irelands-financial-services-landscape',
    'local-talent-top-universities-feeding-dublins-tech-pipeline-a-guide-to-irelands-stem-graduates',
    'localizing-b2b-messaging-for-the-irish-market',
    'manage-remote-sales-team',
    'market-penetration-strategies',
    'media-consolidation-in-regional-ireland-celtic-media-group-acquires-the-tuam-herald',
    'michael-olearys-sharp-words-more-than-just-airline-chatter',
    'navigating-gatekeepers-in-enterprise-financial-firms',
    'nuclear-energy-an-ireland-ready-to-reassess-its-energy-ambitions',
    'olearys-fox-news-campaign-a-dublin-airport-passenger-cap-grabs-the-us-spotlight',
    'originas-expansion-a-clear-vote-of-confidence-in-dublins-tech-ecosystem',
    'orsteds-e1-4bn-cork-divestment-irish-infrastructures-quiet-pont',
    'outbound-marketing-strategies',
    'personalizing-outreach-to-cfos-and-finance-directors',
    'powerscourt-distillery-sale-a-sip-for-irelands-economy-and-investment-climate',
    'process-optimization-strategies',
    'reduce-customer-acquisition-cost',
    'rent-hikes-unveil-irelands-persistent-housing-dilemma',
    'rosie-connollys-arq-brand-taps-profit-in-irish-fashions-complex-landscape',
    'rte-pay-cap-stands-firm-amid-high-profile-departure',
    'running-national-email-campaigns-that-work-in-ireland',
    'ryanairs-comac-bet-an-irish-perspective-on-shifting-aircraft-supply-chains',
    'ryanairs-legal-setback-more-than-just-a-bump-on-the-runway-for-irish-aviation',
    'sales-account-plan-template',
    'sales-coaching-techniques',
    'sales-dashboard-examples',
    'sales-enablement-strategy',
    'sales-follow-up-email',
    'sales-follow-up-email-template',
    'sales-forecasting-methods',
    'sales-funnel-analysis',
    'sales-performance-improvement',
    'sales-playbook-examples',
    'sales-process-optimization',
    'sales-process-template',
    'sales-prospecting-methods',
    'sales-prospecting-techniques',
    'sales-territory-planning',
    'sample-email-consent-form',
    'sdr-training',
    'selling-compliance-driven-tools-to-regulated-industries',
    'september-surge-in-us-exports-what-irelands-businesses-need-to-know',
    'silvers-rollercoaster-what-the-wild-ride-means-for-irish-investors-and-market-stability',
    'small-shops-in-limerick-a-microcosm-of-irelands-retail-malaise',
    'stamp-price-hike-more-than-just-a-nuisance-for-irish-business',
    'startup-go-to-market-strategy',
    'staycitys-european-push-what-it-means-for-irish-hospitality-and-beyond',
    'stop-fighting-googles-ai-takeover-of-adwords',
    'stuart-mccauls-consolidation-play-what-it-means-for-irelands-software-scene',
    'tech-job-boards-in-ireland-worth-bookmarking-your-guide-to-finding-top-roles-in-2025',
    'the-best-coworking-spaces-for-tech-professionals-in-dublin-2025-guide',
    'the-digital-euro-irelands-take-on-the-new-frontier-of-money',
    'the-rise-of-ai-interviewing-and-its-implications-for-the-irish-labour-market',
    'the-rise-of-data-driven-growth-marketing-and-the-tools-powering-it',
    'the-top-10-ways-to-optimize-your-conversion-rate',
    'the-top-b2b-sales-conferences-in-ireland',
    'tiktok-and-linkedin-under-the-spotlight-irish-media-regulator-investigates-anonymous-reporting-of-child-sexual-abuse-mat',
    'top-10-tech-startups-to-watch-in-dublin-this-year',
    'top-marketing-channels-for-reaching-financial-decision-makers',
    'tracking-sales-performance',
    'understanding-the-decision-making-process-in-financial-firms',
    'using-data-to-drive-sales-strategy-in-ireland',
    'vodafones-roaming-fee-reprieve-a-lesson-in-irish-telecom-regulation',
    'wexford-post-office-sale-signals-shifts-beyond-a-local-landmark',
    'what-financial-executives-want-from-b2b-vendors',
    'what-is-email-deliverability',
    'what-is-lead-scoring',
    'what-is-social-selling',
    'what-the-price-drop-tells-us-about-dublins-office-market',
    'when-compliance-lapses-become-a-signal-nutribands-irish-subsidiary-on-involuntary-strike-off-list',
    'why-dublin-is-the-next-european-ai-hub-startups-research-innovation-in-2025',
    'why-irish-businesses-should-be-using-claude-right-now',
    'why-mediahuis-gender-pay-figures-matter',
    'why-this-litigation-matters-beyond-the-courtroom',
    'your-async-first-culture-is-costing-you-millions'
  ])

// Off-topic content — redirect to homepage
const OFF_TOPIC_SLUGS: Set<string> =  new Set([
    '31-sites-like-omegle-that-are-just-as-fun',
    '62-passive-income-ideas-to-help-you-retire-earlier',
    'affiliate-advertising-and-the-postback-url',
    'articleforge-review-how-articleforge-can-improve-your-seo',
    'best-screenwriting-software',
    'buzzsprout-review-can-buzzsprout-help-you-get-your-podcast-out-there',
    'canva-tricks-every-freelancer-should-know',
    'choosing-the-best-crowd-sourcing-platform',
    'clickmagick-affiliate-program-review',
    'crm-email-marketing-for-solo-creators',
    'dell-alienware-15-r4-review-a-solid-gaming-laptop',
    'email-course',
    'genyoutube-download-youtube-videos-gen-youtube-downloader',
    'growth-hacks-for-instagram-how-to-get-more-followers',
    'how-to-build-an-affiliate-marketing-website',
    'how-to-build-an-email-list-for-affiliate-marketing',
    'how-to-do-market-research-for-affiliate-marketing-campaigns',
    'how-to-make-money-on-youtube',
    'how-to-make-money-online-for-free-2020',
    'how-to-recall-an-email-in-outlook',
    'how-to-screen-record-on-iphone',
    'how-to-start-affiliate-marketing-with-no-money',
    'how-to-use-pinterest-for-affiliate-marketing',
    'how-to-use-tubebuddy-keyword-explorer',
    'how-to-use-tubebuddy-to-rank-youtube-videos',
    'increase-blog-traffic-click-through-rate-strategy-32-experts-share-their-tips',
    'is-google-not-indexing-your-blog-search-engine-fishing-strategy',
    'is-swagbucks-legit-in-2022-a-variety-of-ways-to-earn-money-online',
    'is-tubebuddy-safe',
    'is-tubebuddy-worth-it',
    'link-building-strategies-2022-21-fast-effective-ideas',
    'mastering-hyperlocal-seo',
    'money-making-apps',
    'peak-performance-unleashing-productivity-with-holistic-health-hacks',
    'pet-blogging-how-to-start-a-pet-blog',
    'starting-a-youtube-channel-in-2022',
    'surface-go-3-for-business-review-your-portable-business-machine',
    'surface-pro-8-review-you-gotta-see-this-thing-video-included',
    'the-benefits-of-seo-for-businesses',
    'the-google-pixelbook-12in-review-an-affordable-chromebook-that-doesnt-sacrifice-quality-or-performance',
    'the-razer-blade-15-2018-h2-is-the-perfect-balance-of-power-and-portability',
    'the-sleek-and-stylish-asus-2-in-1-q535-review-specs',
    'the-ultimate-list-of-best-selling-laptops-on-amazon',
    'these-11-affiliate-programs-actually-pay-out-daily',
    'thinking-of-buying-an-acer-swift-3-sf315-41',
    'top-browser-extensions-that-save-time',
    'what-does-epc-mean-in-affiliate-marketing',
    'what-is-chatgpt-i-asked-chatgpt-to-write-me-this-blog-post-about-chatgpt',
    'what-is-cookie-duration-in-affiliate-marketing',
    'what-is-snovio',
    'white-label-ppc-agencies-3-things-to-look-for',
    'white-label-social-media-marketing',
    'youtube-thumbnails-and-youtube-thumbnail-backgrounds'
  ])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strip trailing slash for matching (but not root /)
  const clean = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname

  // Skip paths that are already correct
  if (
    clean.startsWith('/blog/') ||
    clean.startsWith('/category/') ||
    clean.startsWith('/author/') ||
    clean.startsWith('/images/') ||
    clean.startsWith('/_next/') ||
    clean.startsWith('/api/') ||
    clean === '/about' ||
    clean === '/contact' ||
    clean === '/privacy-policy' ||
    clean === '/feed' ||
    clean === '/sitemap.xml' ||
    clean === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  // Extract slug (remove leading slash)
  const slug = clean.replace(/^\//, '')

  if (BLOG_SLUGS.has(slug)) {
    const url = request.nextUrl.clone()
    url.pathname = `/blog/${slug}`
    return NextResponse.redirect(url, 301)
  }

  if (OFF_TOPIC_SLUGS.has(slug)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  // Handle WordPress-style query strings
  if (clean.includes('?is_otto_page_fetch=')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
