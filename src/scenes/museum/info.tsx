import type { ReactNode } from "react";
import { Html } from "@react-three/drei";

import type { PopupInfo } from "../../objects/Focusable";

function InfoLine({ children }: { children: ReactNode }) {
  return <p style={{ margin: "0 0 8px 0", lineHeight: "1.55" }}>{children}</p>;
}

function InfoBullet({ children }: { children: ReactNode }) {
  return <li style={{ margin: "0 0 3px 0" }}>{children}</li>;
}

export function WallLabel({ children }: { children: string }) {
  return (
    <Html center pointerEvents="none">
      <span
        style={{
          color: "#d0e60d",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {children}
      </span>
    </Html>
  );
}

// Painting sizes derived from actual texture aspect ratios (ratio × base height)
// North: base height 1.13 — widths = ratio × 1.13
export const NORTH_SIZES = [
  { width: 1.5, height: 1.13 }, // Telkom ratio 1.332
  { width: 1.7, height: 1.13 }, // DattaBot ratio 1.500
  { width: 2.7, height: 1.13 }, // Amarbank BE ratio 2.386
  { width: 1.88, height: 1.13 }, // Amarbank TA ratio 1.659
  { width: 2.26, height: 1.13 }, // Krom Bank ratio 2.000
];

// South: portrait (TikTok/Instagram h=2.0), landscape (djrekord h=1.2)
export const SOUTH_SIZES = [
  { width: 0.92, height: 2.0 }, // TikTok ratio 0.462
  { width: 2.59, height: 1.2 }, // djrekord ratio 2.160
  { width: 0.92, height: 2.0 }, // Instagram ratio 0.461
];

// North wall — Work Experience (company images, oldest → newest left to right)
export const NORTH_TEXTURES = [
  "./paintings/north-4.jpg", // Telkom Indonesia
  "./paintings/north-3.jpg", // DattaBot
  "./paintings/north-2.jpg", // Amarbank Backend Engineer
  "./paintings/north-1.webp", // Amarbank Technical Architect
  "./paintings/north-0.jpg", // Krom Bank
];

// West wall — Achievements (dark abstract)
export const WEST_TEXTURES = [
  "./paintings/west-0.jpg",
  "./paintings/west-1.jpg",
  "./paintings/west-2.jpg",
];

// East wall — Specializations (tech/code)
export const EAST_TEXTURES = [
  "./paintings/east-0.jpg",
  "./paintings/east-1.jpg",
  "./paintings/east-2.jpg",
];

// North wall — Career Experience (oldest → newest left to right)
export const NORTH_INFOS: PopupInfo[] = [
  {
    title: "Telkom Indonesia",
    subtitle: "Software Engineer · 2016 – 2017",
    href: "https://www.telkom.co.id",
    content: (
      <>
        <InfoLine>
          Developed secure QR-code payment systems and mobile banking
          integrations at Indonesia's state-owned telecommunications company.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>
            +50% performance: PHP legacy → Java J2EE migration
          </InfoBullet>
          <InfoBullet>
            ISO8583 mobile payment integration with Rintis
          </InfoBullet>
          <InfoBullet>QR-code payment gateway design &amp; delivery</InfoBullet>
          <InfoBullet>Java · J2EE · PHP · ISO8583</InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "DattaBot",
    subtitle: "Senior Software Engineer · 2017 – 2019",
    href: "https://dattabot.io",
    content: (
      <>
        <InfoLine>
          Built blockchain infrastructure and data analytics pipelines at
          DattaBot, an Indonesian big data &amp; AI startup.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>
            -25% minting cost and −30% gas fee via Solidity optimization
          </InfoBullet>
          <InfoBullet>
            +70% query perf: DynamoDB → PostgreSQL migration
          </InfoBullet>
          <InfoBullet>Ethereum smart contract development</InfoBullet>
          <InfoBullet>Node.js · Solidity · PostgreSQL · AWS</InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Amarbank — Backend Engineer",
    subtitle: "Apr 2019 – Nov 2023 · Staff & Senior",
    href: "https://www.amarbank.co.id",
    content: (
      <>
        <InfoLine>
          Built and scaled core banking microservices in Golang. Mentored
          engineers and owned backend reliability.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>
            −50% deployment time: monolith → microservices
          </InfoBullet>
          <InfoBullet>
            −60% downtime via async event-driven architecture
          </InfoBullet>
          <InfoBullet>−70% duplicate storage via CQRS pattern</InfoBullet>
          <InfoBullet>Mentored 7 engineers into senior promotions</InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Amarbank — Technical Architect",
    subtitle: "Dec 2023 – Oct 2025",
    href: "https://www.amarbank.co.id",
    content: (
      <>
        <InfoLine>
          Defined system architecture, technical frameworks, and security
          standards across engineering squads at Indonesia's digital bank.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>+70% feature release accuracy via A/B testing</InfoBullet>
          <InfoBullet>−40% regression via Codecept.js automation</InfoBullet>
          <InfoBullet>100% PCI-DSS &amp; GDPR via anonymizer engine</InfoBullet>
          <InfoBullet>
            Redux → Zustand migration completed in 3 months
          </InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Krom Bank Indonesia",
    subtitle: "Lead Software Engineer · 2026 – Present",
    href: "https://www.krom.id",
    content: (
      <>
        <InfoLine>
          Leading fullstack development of internal banking tools at PT. Krom
          Bank Indonesia, Tbk — Engineering Personal Account division.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>
            Designing scalable frontend &amp; backend architecture
          </InfoBullet>
          <InfoBullet>Leading and mentoring engineering teams</InfoBullet>
          <InfoBullet>Collaborating with product, design and QA</InfoBullet>
          <InfoBullet>
            Node.js · Nest.js · React · Next.js · TypeScript
          </InfoBullet>
        </ul>
      </>
    ),
  },
];

// West wall — Achievements
export const WEST_INFOS: PopupInfo[] = [
  {
    title: "A/B Testing Rollout",
    subtitle: "Amarbank · 2024",
    content: (
      <>
        <InfoLine>
          Designed and rolled out an A/B testing framework across all
          customer-facing features, replacing manual release gates with
          data-driven experimentation at scale.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>+70% feature release accuracy</InfoBullet>
          <InfoBullet>Reduced rollback incidents significantly</InfoBullet>
          <InfoBullet>
            Adopted company-wide across engineering squads
          </InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Anonymizer Engine",
    subtitle: "Amarbank · 2024",
    content: (
      <>
        <InfoLine>
          Architected and led delivery of a data anonymization pipeline ensuring
          full compliance with international privacy and banking security
          standards across all services.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>100% PCI-DSS &amp; GDPR compliance achieved</InfoBullet>
          <InfoBullet>Zero data breach incidents post-launch</InfoBullet>
          <InfoBullet>
            Protects sensitive customer data at banking scale
          </InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Microservices Migration",
    subtitle: "Amarbank · 2022–2023",
    content: (
      <>
        <InfoLine>
          Led full architectural migration from a distributed monolith to an
          async event-driven microservices model, eliminating bottlenecks during
          national-scale traffic spikes.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>−50% deployment time</InfoBullet>
          <InfoBullet>−60% service downtime</InfoBullet>
          <InfoBullet>−70% duplicate storage via CQRS</InfoBullet>
        </ul>
      </>
    ),
  },
];

// East wall — Specializations
export const EAST_INFOS: PopupInfo[] = [
  {
    title: "System Architecture",
    subtitle: "Microservices · Event-Driven · Cloud · Security",
    content: (
      <>
        <InfoLine>
          Designing and owning end-to-end system architecture across distributed
          systems, cloud infrastructure, and regulated financial environments.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>
            Microservices · Event-driven · CQRS · Serverless
          </InfoBullet>
          <InfoBullet>AWS Lambda · Cloud Architecture · DevOps</InfoBullet>
          <InfoBullet>PCI-DSS · GDPR · ISO8583 compliance</InfoBullet>
          <InfoBullet>Solidity · Ethereum · Smart Contracts</InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Technical Leadership",
    subtitle: "Mentorship · Engineering Management · Strategy",
    content: (
      <>
        <InfoLine>
          Leading engineering teams as both a technical authority and people
          manager. From architecture reviews to cross-functional alignment
          between product, design, and QA.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>Mentored 7 engineers into senior promotions</InfoBullet>
          <InfoBullet>
            Served as Interim Engineering Manager at Amarbank
          </InfoBullet>
          <InfoBullet>Defined technical frameworks across squads</InfoBullet>
          <InfoBullet>
            Led hiring, onboarding, and engineering culture
          </InfoBullet>
        </ul>
      </>
    ),
  },
  {
    title: "Fullstack Engineering",
    subtitle: "Go · Node.js · React · Vue · TypeScript",
    content: (
      <>
        <InfoLine>
          Fluent across the full stack. From high-throughput backend
          microservices in Go to pixel-precise frontend interfaces in React and
          Vue.
        </InfoLine>
        <ul style={{ paddingLeft: "21px" }}>
          <InfoBullet>Go · Node.js · NestJS · Python · PHP · Java</InfoBullet>
          <InfoBullet>React · Vue · Angular · Next.js · Nuxt.js</InfoBullet>
          <InfoBullet>TypeScript · Redux · Zustand · Vuex</InfoBullet>
          <InfoBullet>PostgreSQL · MongoDB · Redis · Elasticsearch</InfoBullet>
        </ul>
      </>
    ),
  },
];

// South wall — Socials
export const SOUTH_TEXTURES = [
  "./paintings/south-0.webp", // TikTok
  "./paintings/south-1.jpg", // djrekord.com
  "./paintings/south-2.webp", // Instagram
];

export const SOUTH_INFOS: PopupInfo[] = [
  {
    title: "TikTok",
    subtitle: "@rhythmixchell",
    href: "https://www.tiktok.com/@rhythmixchell",
    content: <InfoLine>Short-form music &amp; DJ content.</InfoLine>,
  },
  {
    title: "djrekord.com",
    subtitle: "Personal music site",
    href: "https://djrekord.com",
    content: <InfoLine>DJ sets, mixes, and music releases.</InfoLine>,
  },
  {
    title: "Instagram",
    subtitle: "@marvin_mitchell92",
    href: "https://www.instagram.com/marvin_mitchell92",
    content: <InfoLine>Photos, reels, and behind-the-scenes content.</InfoLine>,
  },
];
