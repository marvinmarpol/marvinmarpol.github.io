import type { ReactNode } from "react";
import { Html } from "@react-three/drei";

import type { PopupInfo } from "../../objects/Focusable";

const UI_FONT = "var(--sans)";

function InfoLine({ children }: { children: ReactNode }) {
  return <p style={{ margin: "0 0 8px 0", lineHeight: "1.55" }}>{children}</p>;
}

function InfoBullet({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 3px 0", paddingLeft: "8px" }}>· {children}</p>
  );
}

export function WallLabel({ children }: { children: string }) {
  return (
    <Html center pointerEvents="none">
      <span
        style={{
          color: "rgba(255,255,255,0.45)",
          fontFamily: UI_FONT,
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

// North wall — Work Experience (company images)
export const NORTH_TEXTURES = [
  "./paintings/north-0.jpg",  // Krom Bank
  "./paintings/north-1.webp", // Amarbank Technical Architect
  "./paintings/north-2.webp", // Amarbank Backend Engineer
  "./paintings/north-3.jpg",  // DattaBot
  "./paintings/north-4.jpg",  // Telkom Indonesia
];

// West wall — Achievements (dark abstract)
export const  WEST_TEXTURES = [
  "./paintings/west-0.jpg",
  "./paintings/west-1.jpg",
  "./paintings/west-2.jpg",
];

// East wall — Specializations (tech/code)
export const  EAST_TEXTURES = [
  "./paintings/east-0.jpg",
  "./paintings/east-1.jpg",
  "./paintings/east-2.jpg",
];

// North wall — Career Experience
export const  NORTH_INFOS: PopupInfo[] = [
  {
    title: "Krom Bank Indonesia",
    subtitle: "Lead Software Engineer · 2026 – Present",
    content: (
      <>
        <InfoLine>
          Leading fullstack development of internal banking tools at PT. Krom
          Bank Indonesia, Tbk — Engineering Personal Account division.
        </InfoLine>
        <InfoBullet>
          Designing scalable frontend &amp; backend architecture
        </InfoBullet>
        <InfoBullet>Leading and mentoring engineering teams</InfoBullet>
        <InfoBullet>Collaborating with product, design &amp; QA</InfoBullet>
        <InfoBullet>Node.js · TypeScript · React · Angular · Vue.js</InfoBullet>
      </>
    ),
  },
  {
    title: "Amarbank — Technical Architect",
    subtitle: "Dec 2023 – Present",
    content: (
      <>
        <InfoLine>
          Defined system architecture, technical frameworks, and security
          standards across engineering squads at Indonesia's digital bank.
        </InfoLine>
        <InfoBullet>+70% feature release accuracy via A/B testing</InfoBullet>
        <InfoBullet>−40% regression via Codecept.js automation</InfoBullet>
        <InfoBullet>100% PCI-DSS &amp; GDPR via anonymizer engine</InfoBullet>
        <InfoBullet>Redux → Zustand migration completed in 3 months</InfoBullet>
      </>
    ),
  },
  {
    title: "Amarbank — Backend Engineer",
    subtitle: "Apr 2019 – Nov 2023 · Staff & Senior",
    content: (
      <>
        <InfoLine>
          Built and scaled core banking microservices in Golang. Mentored
          engineers and owned backend reliability.
        </InfoLine>
        <InfoBullet>−50% deployment time: monolith → microservices</InfoBullet>
        <InfoBullet>
          −60% downtime via async event-driven architecture
        </InfoBullet>
        <InfoBullet>−70% duplicate storage via CQRS pattern</InfoBullet>
        <InfoBullet>Mentored 7 engineers into senior promotions</InfoBullet>
      </>
    ),
  },
  {
    title: "DattaBot",
    subtitle: "Senior Software Engineer · 2017 – 2019",
    content: (
      <>
        <InfoLine>
          Built blockchain infrastructure and data analytics pipelines at
          DattaBot, an Indonesian big data &amp; AI startup.
        </InfoLine>
        <InfoBullet>
          −25% minting cost &amp; −30% gas via Solidity optimization
        </InfoBullet>
        <InfoBullet>
          +70% query perf: DynamoDB → PostgreSQL migration
        </InfoBullet>
        <InfoBullet>Ethereum smart contract development</InfoBullet>
        <InfoBullet>Node.js · Solidity · PostgreSQL · AWS</InfoBullet>
      </>
    ),
  },
  {
    title: "Telkom Indonesia",
    subtitle: "Software Engineer · 2016 – 2017",
    content: (
      <>
        <InfoLine>
          Developed secure QR-code payment systems and mobile banking
          integrations at Indonesia's state-owned telecommunications company.
        </InfoLine>
        <InfoBullet>
          +50% performance: PHP legacy → Java J2EE migration
        </InfoBullet>
        <InfoBullet>ISO8583 mobile payment integration with Rintis</InfoBullet>
        <InfoBullet>QR-code payment gateway design &amp; delivery</InfoBullet>
        <InfoBullet>Java · J2EE · PHP · ISO8583</InfoBullet>
      </>
    ),
  },
];

// West wall — Achievements
export const  WEST_INFOS: PopupInfo[] = [
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
        <InfoBullet>+70% feature release accuracy</InfoBullet>
        <InfoBullet>Reduced rollback incidents significantly</InfoBullet>
        <InfoBullet>Adopted company-wide across engineering squads</InfoBullet>
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
        <InfoBullet>100% PCI-DSS &amp; GDPR compliance achieved</InfoBullet>
        <InfoBullet>Zero data breach incidents post-launch</InfoBullet>
        <InfoBullet>
          Protects sensitive customer data at banking scale
        </InfoBullet>
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
        <InfoBullet>−50% deployment time</InfoBullet>
        <InfoBullet>−60% service downtime</InfoBullet>
        <InfoBullet>−70% duplicate storage via CQRS</InfoBullet>
      </>
    ),
  },
];

// East wall — Specializations
export const  EAST_INFOS: PopupInfo[] = [
  {
    title: "System Architecture",
    subtitle: "Microservices · Event-Driven · Cloud · Security",
    content: (
      <>
        <InfoLine>
          Designing and owning end-to-end system architecture across distributed
          systems, cloud infrastructure, and regulated financial environments.
        </InfoLine>
        <InfoBullet>
          Microservices · Event-driven · CQRS · Serverless
        </InfoBullet>
        <InfoBullet>AWS Lambda · Cloud Architecture · DevOps</InfoBullet>
        <InfoBullet>PCI-DSS · GDPR · ISO8583 compliance</InfoBullet>
        <InfoBullet>Solidity · Ethereum · Smart Contracts</InfoBullet>
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
          manager — from architecture reviews to cross-functional alignment
          between product, design, and QA.
        </InfoLine>
        <InfoBullet>Mentored 7 engineers into senior promotions</InfoBullet>
        <InfoBullet>
          Served as Interim Engineering Manager at Amarbank
        </InfoBullet>
        <InfoBullet>Defined technical frameworks across squads</InfoBullet>
        <InfoBullet>Led hiring, onboarding, and engineering culture</InfoBullet>
      </>
    ),
  },
  {
    title: "Full-Stack Engineering",
    subtitle: "Go · Node.js · React · Vue · TypeScript",
    content: (
      <>
        <InfoLine>
          Fluent across the full stack — from high-throughput backend
          microservices in Go to pixel-precise frontend interfaces in React and
          Vue.
        </InfoLine>
        <InfoBullet>Go · Node.js · NestJS · Python · PHP · Java</InfoBullet>
        <InfoBullet>React · Vue · Angular · Next.js · Nuxt.js</InfoBullet>
        <InfoBullet>TypeScript · Redux · Zustand · Vuex</InfoBullet>
        <InfoBullet>PostgreSQL · MongoDB · Redis · Elasticsearch</InfoBullet>
      </>
    ),
  },
];
