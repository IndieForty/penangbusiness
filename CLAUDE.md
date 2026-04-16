# PenangBusiness — Claude Operations Guide

## What This Site Is

PenangBusiness (penangbusiness.com) serves two audiences:

1. **Malaysian builders** — freelancers, entrepreneurs, online business owners who want to earn in USD and build income that isn't capped by the ringgit
2. **Foreign operators** — expats, digital nomads, foreign entrepreneurs doing business in or relocating to Penang/Malaysia

Four content pillars:
1. Earning in dollars from Malaysia (freelancing, SaaS, remote work, USD banking)
2. Business setup in Malaysia (Labuan company, Sdn Bhd, MM2H visa, DE Rantau)
3. Living and operating in Penang (cost of living, coworking, areas, practicalities)
4. Southeast Asia business and opportunity (regional macro, semiconductor boom, ASEAN)

**Author:** Paul Allen — Irish entrepreneur based in Penang, Labuan company owner, builds digital businesses earning in USD while based in Malaysia.

## Tech Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Based on DublinRush template at /home/paulallen/dublinrush-next/
- MDX content files in /content/
- Deployed on Vercel via GitHub (IndieForty/penangbusiness) — push to main = auto-deploy
- Site config: src/lib/config.ts

## Content Rules (Non-Negotiable)

See WRITING_PERSONA.md for full detail. Key rules:

- Always include RM AND USD figures when discussing money — "RM3,500/month ($750)"
- No em-dashes (replace with commas or full stops)
- No generic business advice — everything must be filtered through Malaysia/SEA context
- Both audiences must find value — Malaysian freelancer AND foreign entrepreneur
- No travel blog content — not "Top 10 hawker stalls", not tourism roundups
- No "Arsenal win League Cup: implications for Penang" — that is the exact content being replaced
- Short paragraphs, concrete numbers, actionable takeaways

## Existing Content Migration Plan

The Ghost site has 1,594 articles. Almost all are "global news event filtered through Penang economy" — this content is being replaced.

**Keep (approx 20-30 articles):** Articles with genuine local knowledge — Labuan company setup, MM2H visa, Penang coworking spaces, cost of living, specific Penang business/tech ecosystem coverage, semiconductor industry analysis.

**301 to homepage:** Everything else — all the "Arsenal/Netflix/Thailand filtered through Penang" articles, generic Malaysia news, tourism roundups with no business angle.

Run the site-crawler output through a scoring script (same approach as ThinkInTokens) to classify automatically.

Crawler output already exists at:
/home/paulallen/site-crawler/output/penangbusiness.com/
(1,594 MDX files)

## Key Local Facts to Get Right

- Labuan is a federal territory of Malaysia, an offshore financial centre — companies pay 3% tax on trading income
- MM2H (Malaysia My Second Home) visa: current 2024+ requirements are significantly stricter than old version — always check current requirements
- DE Rantau: Malaysia's digital nomad visa, launched 2022, requires proof of remote income
- Ringgit (RM): approximately 4.4-4.7 to USD1 as of 2026 (verify current rate)
- Malaysia uses single-tier tax system — foreign-sourced income remitted to Malaysia was tax-exempt until 2022, now partially taxable — verify current rules
- Penang has two main areas: George Town (city, heritage, coworking) and Bayan Lepas (industrial, airport, cheaper housing)
- MDEC (Malaysia Digital Economy Corporation) offers various incentives for digital businesses

## GSC and Indexing

GSC property: sc-domain:penangbusiness.com
Use /home/paulallen/mcp-gsc/ same as other sites.

## Em-Dash Audit

```bash
grep -rl "—" /home/paulallen/penangbusiness-next/content/ | wc -l
```

## Deployment

```bash
cd /home/paulallen/penangbusiness-next
git add -A
git commit -m "your message"
git push origin main
```

## Priority Content to Write First

These are the articles with the highest search demand and clearest authority:

1. "How to Earn in USD From Malaysia: The Honest 2026 Guide" — target: "earn in usd malaysia", "how to get paid usd malaysia"
2. "Labuan Company Setup: The Complete 2026 Guide" — target: "labuan company setup", "labuan offshore company"
3. "Cost of Living in Penang in 2026: Real Numbers" — target: "cost of living penang", "penang expat cost of living"
4. "MM2H vs DE Rantau: Which Malaysian Visa in 2026" — target: "mm2h 2026", "de rantau visa"
5. "Coworking Spaces in Penang: Honest 2026 Guide" — target: "coworking penang", "coworking space penang"
6. "Wise vs YouTrip vs Local Banks: USD Accounts for Malaysians" — target: "usd account malaysia", "wise malaysia"
7. "Freelancing From Malaysia: How to Get International Clients" — target: "freelancing malaysia", "how to freelance from malaysia"

## What Not to Cover

- Tourism roundups, food guides, travel content
- Generic "global news filtered through Penang economy" articles
- Content that could apply to any country without Malaysia-specific adaptation
- Politics unless directly affecting business/investment environment
