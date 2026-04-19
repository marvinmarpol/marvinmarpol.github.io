# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check and bundle for production
npm run deploy     # Build and deploy to GitHub Pages (gh-pages)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## Architecture

This is a **3D interactive museum/portfolio** built with React Three Fiber (R3F) — a declarative React renderer on top of Three.js. The app renders a first-person walkable 3D room that can contain paintings, lights, and interactive objects.

### Layer structure

| Layer | Location | Role |
|---|---|---|
| Scene | `src/scenes/museum.tsx` | Root Canvas; composes all 3D objects, lighting, and camera |
| Objects | `src/objects/` | Reusable 3D meshes (Room, Floor, Painting, Box) |
| Lighting | `src/lighting/` | Light components (LightBulb = point light + visible sphere) |
| Camera | `src/cameras/FPSCamera.tsx` | FPS movement via PointerLockControls + WASD velocity |
| Hooks | `src/hooks/` | Input utilities (useKeyboard tracks currently held keys) |

### Key patterns

- **R3F components**: All 3D objects are standard React components that render JSX primitives like `<mesh>`, `<pointLight>`, `<boxGeometry>`. They run inside a `<Canvas>` from `@react-three/fiber`.
- **Drei helpers**: Used for `PointerLockControls`, `Html` (DOM overlays in 3D space), and other conveniences from `@react-three/drei`.
- **FPS camera**: `FPSCamera.tsx` uses `useFrame` to apply velocity-based movement each frame. `useKeyboard` tracks held keys and informs the movement loop.
- **Painting component** (`objects/painting.tsx`): Accepts position, rotation, dimensions, and an optional `distance` parameter to place a spotlight; encapsulates the mesh + light together.
- **Vite base path**: Set to `'./'` (relative) in `vite.config.ts` so the build works on GitHub Pages without a root-relative path.

### Tech stack

- React 19 + TypeScript (strict, ES2023 target)
- Three.js via `@react-three/fiber` and `@react-three/drei`
- Post-processing via `@react-three/postprocessing`
- Vite 8 for dev/build, `gh-pages` for deployment
