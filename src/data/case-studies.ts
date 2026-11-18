import "server-only";
import type { SiteImage } from "./imagery";

export interface CaseStudy {
  slug: string;
  image?: SiteImage;
  title: string;
  client: string;
  industry: string;
  serviceSlugs: string[];
  challenge: string;
  approach: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  timeline: string;
  disclaimer?: string;
  content: {
    section: string;
    body: string;
    image?: SiteImage;
  }[];
}

const illustrativeDisclaimer =
  "Illustrative case study using a placeholder business name and representative figures. Replace with verified client data before publication.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "bookkeeping-workflow-automation",
    image: {
      src: "/images/case-studies/bookkeeping-workflow.webp",
      alt: "A realistic laptop and phone show a bookkeeping document upload, extracted invoice details, duplicate warning, and human approval controls beside paper receipts.",
      width: 1672,
      height: 941,
      focalPoint: "50% 50%",
      kind: "project",
    },
    title: "Giving a Small Bookkeeping Team Its Week Back",
    client: "ClearLedger Bookkeeping",
    industry: "Bookkeeping & Accounting",
    serviceSlugs: ["ai-business-automation", "web-development"],
    challenge:
      "A three-person bookkeeping practice was receiving roughly 430 invoices, receipts, and bank documents each month from 38 recurring clients. Files arrived through email, shared folders, and phone photos, so one team member spent most Mondays renaming documents, chasing missing information, and copying figures into the accounting system. Month-end work regularly slipped into the following week, and the owner was reluctant to add clients because the team had no spare administrative capacity.",
    approach:
      "We focused on document intake rather than trying to automate the entire bookkeeping service. A single upload link and monitored inbox now collect client documents, extract a small set of agreed fields, flag duplicates, and create draft entries for review. Low-confidence items and unusual transactions stay with a bookkeeper. We piloted the workflow with six clients, compared every draft with the team's manual entry, and expanded it only after the exception rules were reliable.",
    results: [
      { metric: "Weekly document admin", value: "31 hrs → 14 hrs" },
      { metric: "Month-end readiness", value: "8.5 → 5.5 days" },
      { metric: "Items needing correction", value: "6.1% → 2.4%" },
      { metric: "Added capacity", value: "7 clients" },
    ],
    timeline: "8 weeks + 4 weeks monitoring",
    content: [
      {
        section: "The Problem Was Intake, Not Bookkeeping",
        body: "The team initially described the problem as being short-staffed. A two-week baseline showed something more specific: experienced bookkeepers were spending 31 hours a week organizing documents before they could begin client work. There was no consistent naming convention, the same receipt sometimes appeared in two channels, and missing details were usually discovered late in the month. We agreed that the first goal was not headcount reduction. It was to return administrative time to the existing team and make close dates more predictable.",
      },
      {
        section: "A Narrow Workflow with Human Review",
        image: {
          src: "/images/case-studies/practical/bookkeeping-document-dashboard.webp",
          alt: "A document-intake dashboard showing monthly volume, review queues, exception handling, correction rate, month-end readiness, and weekly admin hours.",
          width: 1672,
          height: 941,
          kind: "project",
        },
        body: "The new workflow accepts documents by upload or email, associates them with the correct client, checks for duplicates, and extracts vendor, date, reference number, tax, and total. It then creates a draft for a bookkeeper to approve. Confidence thresholds determine what can move forward and what needs attention; nothing posts automatically. We also added a simple queue showing missing documents and ageing exceptions, so the team can follow up before month-end rather than during it.",
      },
      {
        section: "Measured After the Busy-Period Test",
        body: "After four weeks of monitored use across all 38 clients, document administration averaged 14 hours a week. The proportion of entries returned for correction fell from 6.1% to 2.4%, largely because duplicate and incomplete files were caught earlier. Average month-end readiness improved by three business days. The practice chose to use the recovered capacity to onboard seven smaller clients over the next quarter while keeping the same team size; the project did not remove the need for professional review or client follow-up.",
      },
    ],
  },
  {
    slug: "local-food-brand-launch",
    image: {
      src: "/images/case-studies/local-food-brand.webp",
      alt: "A realistic studio arrangement shows a coordinated preserve and honey range, gift packaging, wholesale line sheet, packing slip, shipping carton, and mobile storefront.",
      width: 1672,
      height: 941,
      focalPoint: "50% 50%",
      kind: "project",
    },
    title: "Turning a Market-Stall Favorite into a Consistent Local Brand",
    client: "Willow & Field Pantry",
    industry: "Local Food & Retail",
    serviceSlugs: [
      "branding-design",
      "web-development",
      "social-media-management",
    ],
    challenge:
      "A family-run producer sold preserves, infused honey, and seasonal gift boxes at two weekend markets. Customers liked the products, but labels had been created at different times, retailers found the range difficult to understand, and repeat customers could not order between market days. The immediate goal was practical: create a coherent seven-product range, launch a simple online shop, and give nearby independent stores enough information to consider a small wholesale order.",
    approach:
      "We built the identity around the product-making process rather than inventing a lifestyle story. The work included a flexible label system, plain-language product descriptions, a compact photography library, and an e-commerce site designed for quick repeat ordering. Social content documented batches, ingredients, and market days. We also prepared a one-page wholesale sheet with case sizes, lead times, shelf life, and suggested retail pricing so shop owners could evaluate the range without a lengthy sales call.",
    results: [
      { metric: "Online orders in 12 weeks", value: "126" },
      { metric: "Email subscribers", value: "94 → 612" },
      { metric: "Wholesale enquiries", value: "2 → 11" },
      { metric: "New local stockists", value: "5" },
    ],
    timeline: "8 weeks",
    content: [
      {
        section: "A Good Product with an Inconsistent Presentation",
        body: "Customer interviews showed that people remembered the taste and the family behind the stall, but often could not remember the business name or distinguish one product range from another. Retailers had a different problem: the existing labels varied in size and hierarchy, and there was no concise information about margins, shelf life, or ordering. The project therefore needed to improve recognition and make buying easier, not make the business appear larger or more premium than it was.",
      },
      {
        section: "One System for Labels, Web, and Social",
        image: {
          src: "/images/case-studies/practical/food-brand-commerce-system.webp",
          alt: "A brand and commerce system showing coordinated packaging, desktop and mobile storefronts, a wholesale overview, and first-season results.",
          width: 1672,
          height: 941,
          kind: "project",
        },
        body: "We created a label template that kept the producer name, flavor, key ingredient, and required product information in consistent positions. Colors and illustrations changed by product, allowing new seasonal batches without redesigning the range. The website used the same hierarchy and prioritized mixed boxes and returning-customer reorders. A six-week content plan gave the owner repeatable formats—batch day, ingredient source, serving idea, and market reminder—that could be photographed with a phone and maintained without an agency shoot every month.",
      },
      {
        section: "A Manageable First Season",
        body: "During the first 12 weeks, the shop processed 126 orders without paid advertising. A market-day QR card and a welcome offer grew the email list from 94 to 612 subscribers. Eleven nearby retailers requested the wholesale sheet and five placed opening orders. Those numbers did not transform the business overnight, but they created a dependable sales channel between markets and gave the family enough evidence to plan production for the next season with less guesswork.",
      },
    ],
  },
  {
    slug: "home-services-local-seo",
    image: {
      src: "/images/case-studies/home-services-seo.webp",
      alt: "A realistic phone displays a local heating search result and service-area map beside the matching service website on a laptop, a thermostat, and a printed coverage map.",
      width: 1672,
      height: 941,
      focalPoint: "50% 50%",
      kind: "project",
    },
    title: "Helping a Local Heating Company Get Found in the Areas It Serves",
    client: "Northline Heating & Cooling",
    industry: "Home Services",
    serviceSlugs: ["search-engine-optimization", "web-development"],
    challenge:
      "A seven-technician heating and cooling company relied on referrals, repeat customers, and an increasingly expensive stream of directory leads. Its five-year-old website loaded slowly on mobile, listed services only in broad terms, and gave search engines little information about the towns the team actually covered. Organic search produced about 11 trackable enquiries a month, and several were outside the service area or for work the company did not offer.",
    approach:
      "We repaired the mobile experience, clarified the service-area structure, and rewrote the core heating, cooling, maintenance, and emergency pages around questions customers ask before booking. Each location page included genuine coverage details, travel limitations, locally relevant FAQs, and consistent contact information rather than duplicated city names. We also improved the Google Business Profile, added call and form tracking, and introduced a monthly routine for collecting customer reviews after completed jobs.",
    results: [
      { metric: "Organic enquiries per month", value: "11 → 24" },
      { metric: "Booked jobs from organic", value: "7 → 15" },
      { metric: "Relevant top-10 queries", value: "4 → 17" },
      { metric: "Mobile load time", value: "5.6s → 2.3s" },
    ],
    timeline: "6 months",
    content: [
      {
        section: "Finding the Leaks in the Existing Journey",
        body: "The initial audit found no single dramatic fault. Instead, several smaller issues were compounding: large images slowed the mobile site, service descriptions were too vague to match specific searches, addresses and opening hours differed across listings, and enquiry forms did not record how customers arrived. We established a baseline using tracked calls and forms, then removed out-of-area and irrelevant enquiries so the project would be judged on qualified local demand rather than traffic alone.",
      },
      {
        section: "Useful Pages Instead of City Swaps",
        body: "We consolidated weak pages and created a small number of useful service and coverage pages. Technicians helped answer practical questions about call-out timing, common equipment, maintenance, and when a repair may not be economical. These answers became page copy and FAQs. Technical work reduced image weight, removed duplicate metadata, improved internal linking, and added appropriate business and service information. No bulk location-page generator or purchased links were used.",
      },
      {
        section: "Steady Growth Over Six Months",
        image: {
          src: "/images/case-studies/practical/home-services-seo-dashboard.webp",
          alt: "A local search dashboard comparing organic enquiries, booked jobs, top-ten queries, and mobile load time over six months.",
          width: 1672,
          height: 941,
          kind: "project",
        },
        body: "By month six, relevant non-branded queries in the top ten had increased from four to 17. Trackable organic enquiries averaged 24 per month, of which about 15 became booked jobs, compared with seven at baseline. Mobile load time fell to 2.3 seconds on the agreed test device. Referrals remained the company's largest source of work, but organic search became a useful second channel and reduced the number of low-quality directory leads the office needed to buy.",
      },
    ],
  },
  {
    slug: "dental-practice-paid-growth",
    image: {
      src: "/images/case-studies/dental-paid-growth.webp",
      alt: "A realistic dental campaign cover shows a focused two-location landing page and search ad on a laptop, a coordinated mobile social ad, and an appointment confirmation card.",
      width: 1672,
      height: 941,
      focalPoint: "50% 50%",
      kind: "project",
    },
    title: "Making Paid Search Work Harder for a Two-Location Dental Practice",
    client: "Oak & River Dental",
    industry: "Local Healthcare",
    serviceSlugs: ["paid-marketing", "web-development"],
    challenge:
      "A two-location general dental practice was spending about $6,500 a month on search and social ads but could not reliably connect leads to attended appointments. Campaigns sent every service to the homepage, calls were not tracked, and reception staff spent time responding to enquiries for treatments or insurance plans the practice did not provide. The owners wanted more suitable new-patient enquiries without materially increasing the monthly budget.",
    approach:
      "We first connected call, form, and appointment-source tracking so the practice could distinguish an enquiry from a kept appointment. Search campaigns were reorganized by location and treatment, irrelevant queries were excluded, and budgets were shifted toward services with available chair time. We created three focused landing pages, clarified insurance and location information, shortened the enquiry form, and worked with reception staff on a consistent callback and reminder process.",
    results: [
      { metric: "Qualified enquiries per month", value: "38 → 61" },
      { metric: "Cost per qualified enquiry", value: "$112 → $69" },
      { metric: "Landing-page conversion", value: "3.1% → 5.2%" },
      { metric: "Kept first appointments", value: "62% → 70%" },
    ],
    timeline: "10 weeks + 3 months optimization",
    content: [
      {
        section: "Separating Leads from Useful Enquiries",
        body: "The ad platforms reported more than 90 monthly conversions, but many were page views, repeat calls, or forms from outside the service area. Reception records showed an average of 38 genuinely suitable enquiries and no consistent view of how many attended. We rebuilt conversion tracking around calls longer than 45 seconds, completed treatment forms, and booked appointments. This lowered the headline conversion count but gave the team a number it could make decisions from.",
      },
      {
        section: "Matching the Campaign to Available Care",
        body: "Campaigns were divided by location and treatment so budget could follow actual appointment availability. Broad informational queries, unsupported insurance searches, and distant areas were excluded. Each landing page answered the questions reception heard most often: who the treatment was suitable for, what the first visit involved, where the clinic was, and how payment worked. The form was reduced to five fields, with a phone option for people who preferred to speak to the team.",
      },
      {
        section: "Better Results Without a Large Budget Increase",
        image: {
          src: "/images/case-studies/practical/dental-campaign-dashboard.webp",
          alt: "A new-patient campaign dashboard showing search and social ads, a landing page, the conversion funnel, performance comparisons, and stable spend.",
          width: 1672,
          height: 941,
          kind: "project",
        },
        body: "Across the following three months, monthly spend stayed between $6,300 and $6,700. Qualified enquiries increased from 38 to 61 and their average cost fell from $112 to $69. Landing-page conversion reached 5.2%. The kept-appointment rate also improved from 62% to 70% after the practice introduced same-day callbacks and clearer reminders. Advertising was not the only cause of that final improvement, so campaign and reception changes are reported separately rather than assigning all credit to media buying.",
      },
    ],
  },
];
