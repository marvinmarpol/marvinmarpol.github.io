import { useState, useCallback, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import {
  PointerLockControls,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import FPSCamera from "../../cameras/FPSCamera";
import Room from "../../objects/room";
import Floor from "../../objects/floor";
import Painting from "../../objects/painting";
import LightBulb from "../../lighting/LightBulb";
import EntryOverlay from "../../overlay/EntryOverlay";
import useIsMobile from "../../hooks/useIsMobile";
import { type PopupInfo } from "../../objects/Focusable";

const PAINTING_WIDTH = 1.2;
const PAINTING_HEIGHT = 1.6;
const PAINTING_Y = 2.6;

const NS_PAINTING_WIDTH = 2.0;
const NS_PAINTING_HEIGHT = 1.13; // ~16:9 to match landscape company banners

const NS_COUNT = 4;
const NS_SPACING = 5;
const NS_START_X = -((NS_COUNT - 1) * NS_SPACING) / 2;

const EW_COUNT = 3;
const EW_SPACING = 5;
const EW_START_Z = -((EW_COUNT - 1) * EW_SPACING) / 2;

const MY_HEIGHT = 1.78;

const UI_FONT = "var(--sans)";

function InfoLine({ children }: { children: ReactNode }) {
  return <p style={{ margin: "0 0 8px 0", lineHeight: "1.55" }}>{children}</p>;
}

function InfoBullet({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 3px 0", paddingLeft: "8px" }}>· {children}</p>
  );
}

function WallLabel({ children }: { children: string }) {
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
const NORTH_TEXTURES = [
  "./paintings/north-0.jpg", // Krom Bank
  "./paintings/north-1.webp", // Amarbank Technical Architect
  "./paintings/north-2.webp", // Amarbank Backend Engineer
  "./paintings/north-3.webp", // DattaBot & Telkom
];

// West wall — Achievements (dark abstract)
const WEST_TEXTURES = [
  "./paintings/west-0.jpg",
  "./paintings/west-1.jpg",
  "./paintings/west-2.jpg",
];

// East wall — Specializations (tech/code)
const EAST_TEXTURES = [
  "./paintings/east-0.jpg",
  "./paintings/east-1.jpg",
  "./paintings/east-2.jpg",
];

// North wall — Career Experience
const NORTH_INFOS: PopupInfo[] = [
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
    title: "DattaBot & Telkom",
    subtitle: "Senior Software Engineer · 2016 – 2019",
    content: (
      <>
        <InfoLine>
          Built blockchain infrastructure at DattaBot and secure QR-code payment
          systems at Telkom Indonesia.
        </InfoLine>
        <InfoBullet>
          −25% minting cost &amp; −30% gas via Solidity optimization
        </InfoBullet>
        <InfoBullet>
          +70% query perf: DynamoDB → PostgreSQL migration
        </InfoBullet>
        <InfoBullet>
          +50% performance: PHP legacy → Java J2EE at Telkom
        </InfoBullet>
        <InfoBullet>ISO8583 mobile payment integration with Rintis</InfoBullet>
      </>
    ),
  },
];

// West wall — Achievements
const WEST_INFOS: PopupInfo[] = [
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
const EAST_INFOS: PopupInfo[] = [
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

const _defaultOrbitTarget = new Vector3(0, MY_HEIGHT, 0);

function MobilePanController({
  orbitRef,
  panTarget,
}: {
  orbitRef: { current: any };
  panTarget: Vector3 | null;
}) {
  useFrame(() => {
    const controls = orbitRef.current;
    if (!controls) return;
    const target = panTarget ?? _defaultOrbitTarget;
    if (controls.target.distanceToSquared(target) < 0.00001) return;
    if (panTarget) controls.object.position.sub(panTarget).normalize();
    controls.target.lerp(target, 0.07);
    controls.update();
  });
  return null;
}

interface SceneProps {
  width: number;
  height: number;
  depth: number;
  onFocus: (info: PopupInfo) => void;
  onBlur: () => void;
  isMobile: boolean;
  onInfoClick: (info: PopupInfo) => void;
  northInfos: PopupInfo[];
  westInfos: PopupInfo[];
  eastInfos: PopupInfo[];
  started: boolean;
  onMobileSelect?: (pos: Vector3) => void;
}

function Scene({
  width,
  height,
  onFocus,
  onBlur,
  isMobile,
  onInfoClick,
  northInfos,
  westInfos,
  eastInfos,
  started,
  onMobileSelect,
}: SceneProps) {
  return (
    <>
      <Floor
        position={[0, 0, 0]}
        size={[width, height]}
        receiveShadow={true}
        color={"#aaaaaa"}
      />
      <Room
        position={[0, 0, 0]}
        size={{ width, height, depth: 12 }}
        color="#888888"
      />

      {/* North wall — Work Experience */}
      {Array.from({ length: NS_COUNT }, (_, i) => (
        <Painting
          key={`north-${i}`}
          imageUrl={NORTH_TEXTURES[i]}
          frameColor="#1a1a2e"
          position={[
            NS_START_X + i * NS_SPACING,
            PAINTING_Y,
            -height / 2 + 0.02,
          ]}
          size={{ width: NS_PAINTING_WIDTH, height: NS_PAINTING_HEIGHT }}
          info={northInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(northInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      NS_START_X + i * NS_SPACING,
                      PAINTING_Y,
                      -height / 2 + 0.02,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group position={[0, 4.2, -height / 2 + 0.05]}>
          <WallLabel>Work Experience</WallLabel>
        </group>
      )}

      {/* West wall — Achievements */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`west-${i}`}
          imageUrl={WEST_TEXTURES[i]}
          frameColor="#2e1a1a"
          position={[width / 2 - 0.02, PAINTING_Y, EW_START_Z + i * EW_SPACING]}
          rotation={[0, -Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          info={westInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(westInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      width / 2 - 0.02,
                      PAINTING_Y,
                      EW_START_Z + i * EW_SPACING,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group
          position={[width / 2 - 0.05, 4.2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <WallLabel>Achievements</WallLabel>
        </group>
      )}

      {/* East wall — Specializations */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`east-${i}`}
          imageUrl={EAST_TEXTURES[i]}
          frameColor="#1a2e1a"
          position={[
            -width / 2 + 0.02,
            PAINTING_Y,
            EW_START_Z + i * EW_SPACING,
          ]}
          rotation={[0, Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          info={eastInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(eastInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      -width / 2 + 0.02,
                      PAINTING_Y,
                      EW_START_Z + i * EW_SPACING,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group
          position={[-width / 2 + 0.05, 4.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <WallLabel>Specializations</WallLabel>
        </group>
      )}
    </>
  );
}

interface Props {
  width?: number;
  height?: number;
  depth?: number;
}

export default function Museum({ width = 22, height = 16, depth = 12 }: Props) {
  const cameraPosition = { x: 0, y: MY_HEIGHT, z: height / 3 };
  const isMobile = useIsMobile();

  const { progress: loadingProgress } = useProgress();
  const [started, setStarted] = useState(false);
  const [activeInfo, setActiveInfo] = useState<PopupInfo | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [panTarget, setPanTarget] = useState<Vector3 | null>(null);
  const activeInfoRef = useRef<PopupInfo | null>(null);
  const pointerLockRef = useRef<any>(null);
  const orbitRef = useRef<any>(null);

  const handleFocus = useCallback((info: PopupInfo) => {
    activeInfoRef.current = info;
    setActiveInfo(info);
    setShowPopup(true);
  }, []);

  const handleBlur = useCallback(() => {
    activeInfoRef.current = null;
    setActiveInfo(null);
    setShowPopup(false);
    setPanTarget(null);
  }, []);

  const handleInfoClick = useCallback((info: PopupInfo) => {
    setActiveInfo(info);
    setShowPopup(true);
  }, []);

  const handlePointerMissed = useCallback(() => {
    if (isMobile) {
      setShowPopup(false);
      setActiveInfo(null);
      setPanTarget(null);
    }
  }, [isMobile]);

  const handleEnter = useCallback(() => {
    setStarted(true);
    if (!isMobile) {
      pointerLockRef.current?.lock();
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  return (
    <div id="canvas-container">
      {!started && (
        <EntryOverlay onEnter={handleEnter} progress={loadingProgress} />
      )}
      {!isMobile && started && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 16,
              height: 2,
              background: "rgba(255,255,255,0.7)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 2,
              height: 16,
              background: "rgba(255,255,255,0.7)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      )}

      {showPopup && activeInfo && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "40px",
            background: "rgba(8, 8, 8, 0.92)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderLeft: "3px solid rgba(255,255,255,0.22)",
            borderRadius: "4px",
            padding: "18px 22px",
            color: "#f0f0f0",
            fontFamily: UI_FONT,
            maxWidth: "380px",
            zIndex: 10,
          }}
        >
          {activeInfo.title && (
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "4px",
                letterSpacing: "0.02em",
              }}
            >
              {activeInfo.title}
            </div>
          )}
          {activeInfo.subtitle && (
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                marginBottom: "12px",
                letterSpacing: "0.04em",
              }}
            >
              {activeInfo.subtitle}
            </div>
          )}
          {activeInfo.content && (
            <div style={{ fontSize: "12px", color: "#bbb", lineHeight: "1.6" }}>
              {activeInfo.content}
            </div>
          )}
        </div>
      )}

      <Canvas
        shadows
        gl={{ toneMappingExposure: 2.2 }}
        camera={{ fov: 75 }}
        onPointerMissed={handlePointerMissed}
      >
        <fog attach="fog" args={["#555555", depth, Math.max(width, height)]} />
        <ambientLight intensity={0.4} />

        <LightBulb
          intensity={34}
          position={[0, depth / 2 - 1, 0]}
          radius={0.1}
          distance={21}
          color={"#f0f0f0"}
        />

        <Scene
          width={width}
          height={height}
          depth={depth}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isMobile={isMobile}
          onInfoClick={handleInfoClick}
          northInfos={NORTH_INFOS}
          westInfos={WEST_INFOS}
          eastInfos={EAST_INFOS}
          started={started}
          onMobileSelect={isMobile ? setPanTarget : undefined}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
        </EffectComposer>

        {isMobile ? (
          <>
            <OrbitControls
              ref={orbitRef}
              target={[0, cameraPosition.y, 0]}
              maxPolarAngle={Math.PI / 2 - 0.1}
              minPolarAngle={Math.PI / 2 - 0.5}
              minDistance={2}
              maxDistance={5}
            />
            <MobilePanController orbitRef={orbitRef} panTarget={panTarget} />
          </>
        ) : (
          <>
            <FPSCamera
              width={width}
              height={height}
              position={cameraPosition}
              clampOffset={{ x: 0, y: 0, z: 0 }}
              disabled={!started}
            />
            <PointerLockControls ref={pointerLockRef} />
          </>
        )}
      </Canvas>
    </div>
  );
}
