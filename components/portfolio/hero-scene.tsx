
'use client'

import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
  type ThreeEvent,
} from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
  }
}

// ========================================
// CONFIGURATION
// ========================================

const CARD_W = 1.6
const CARD_H = 2.56
const HOLDER_W = 1.74
const HOLDER_H = 2.8
const ANCHOR_Y = 1.58

type HeroSceneProps = {
  reducedMotion: boolean
  compact: boolean
  active: boolean
  onContextLost: () => void
}

// ========================================
// MAIN 3D SCENE
// ========================================

export default function HeroScene({
  reducedMotion,
  compact,
  active,
  onContextLost,
}: HeroSceneProps) {
  return (
    <Canvas
      className="!touch-none"
      camera={{
        position: [0, 0, compact ? 14.5 : 13],
        fov: 25,
      }}
      dpr={compact ? [0.8, 1] : [1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{
        antialias: !compact,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.2
        gl.outputColorSpace = THREE.SRGBColorSpace

        gl.domElement.addEventListener(
          'webglcontextlost',
          onContextLost,
          { once: true },
        )
      }}
      aria-label="Interactive 3D name card for Gilang. Drag the card to swing it on its lanyard."
      role="img"
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[3, 5, 7]}
        intensity={2.5}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, 1, 5]}
        intensity={1.2}
        color="#bfdbfe"
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={5}
        color="#60a5fa"
        distance={12}
      />

      <pointLight
        position={[4, -2, 2]}
        intensity={5}
        color="#67e8f9"
        distance={10}
      />

      <pointLight
        position={[0, 3, -3]}
        intensity={3}
        color="#a5b4fc"
        distance={12}
      />

      <Suspense fallback={null}>
        <Physics
          gravity={[0, -40, 0]}
          timeStep={1 / 60}
          paused={!active}
        >
          <Lanyard
            reducedMotion={reducedMotion}
            compact={compact}
          />
        </Physics>

        <Environment
          resolution={compact ? 64 : 128}
          frames={1}
        >
          <Lightformer
            intensity={2.5}
            color="#ffffff"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            color="#bfdbfe"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            color="#ffffff"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            color="#60a5fa"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />

          <Lightformer
            intensity={2}
            color="#a5b4fc"
            position={[5, 2, -5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[50, 5, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  )
}

// ========================================
// PHYSICS CONFIGURATION
// ========================================

const segmentProps: RigidBodyProps = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
}

// ========================================
// LANYARD TEXTURE
// ========================================

function useStrapTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')

    canvas.width = 1024
    canvas.height = 128

    const ctx = canvas.getContext('2d')

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 128)

      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(0.5, '#eaf4ff')
      gradient.addColorStop(1, '#cfe5ff')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#17365f'
      ctx.fillRect(0, 0, canvas.width, 7)
      ctx.fillRect(0, canvas.height - 7, canvas.width, 7)

      ctx.fillStyle = '#60a5fa'

      for (let x = 150; x < canvas.width; x += 60) {
        ctx.beginPath()
        ctx.moveTo(x, 7)
        ctx.lineTo(x + 25, 7)
        ctx.lineTo(x - 15, canvas.height - 7)
        ctx.lineTo(x - 40, canvas.height - 7)
        ctx.fill()
      }

      ctx.fillStyle = '#102b55'
      ctx.font = '900 42px system-ui, sans-serif'
      ctx.textBaseline = 'middle'
      ctx.fillText('IPA', 40, canvas.height / 2)

      ctx.font = '700 24px system-ui, sans-serif'
      ctx.fillText(
        'STMIK BINA PATRIA  //  HUMAS  //  MGL-INA',
        210,
        canvas.height / 2,
      )
    }

    const texture = new THREE.CanvasTexture(canvas)

    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.anisotropy = 8

    return texture
  }, [])
}

// ========================================
// CARD BACK TEXTURE
// ========================================

function useCardBackTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')

    canvas.width = 1024
    canvas.height = 1638

    const ctx = canvas.getContext('2d')

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 1024, 1638)

      gradient.addColorStop(0, '#163f78')
      gradient.addColorStop(0.45, '#0d2850')
      gradient.addColorStop(1, '#07182f')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1024, 1638)

      ctx.strokeStyle = 'rgba(147,197,253,0.10)'
      ctx.lineWidth = 2

      for (let x = -650; x < 1300; x += 115) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + 830, 1638)
        ctx.stroke()
      }

      const accent = ctx.createLinearGradient(95, 0, 930, 0)

      accent.addColorStop(0, '#60a5fa')
      accent.addColorStop(0.5, '#dbeafe')
      accent.addColorStop(1, '#60a5fa')

      ctx.fillStyle = accent
      ctx.fillRect(85, 115, 854, 6)

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.fillStyle = '#93c5fd'
      ctx.font = '700 44px system-ui, sans-serif'
      ctx.fillText('HIMTI', 512, 460)

      ctx.fillStyle = '#ffffff'
      ctx.font = '800 62px system-ui, sans-serif'
      ctx.fillText('STMIK BINA PATRIA', 512, 555)

      ctx.fillStyle = 'rgba(219,234,254,0.82)'
      ctx.font = 'italic 400 34px system-ui, sans-serif'
      ctx.fillText('Kabinet Pranava vox academia', 512, 625)

      ctx.fillStyle = '#60a5fa'
      ctx.fillRect(320, 760, 384, 4)

      ctx.fillStyle = '#ffffff'
      ctx.font = '900 130px system-ui, sans-serif'
      ctx.fillText('GILANG', 512, 990)

      ctx.fillStyle = '#93c5fd'
      ctx.font = '700 54px system-ui, sans-serif'
      ctx.fillText('HUMAS', 512, 1110)

      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.font = '600 24px system-ui, sans-serif'
      ctx.fillText('INFORMATICS ENGINEERING', 512, 1450)

      ctx.fillStyle = '#60a5fa'
      ctx.fillRect(85, 1530, 854, 6)
    }

    const texture = new THREE.CanvasTexture(canvas)

    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true

    return texture
  }, [])
}

// ========================================
// INTERACTIVE LANYARD
// ========================================

function Lanyard({
  reducedMotion,
  compact,
}: {
  reducedMotion: boolean
  compact: boolean
}) {
  const band = useRef<
    THREE.Mesh<MeshLineGeometry, MeshLineMaterial>
  >(null)

  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<RapierRigidBody>(null!)
  const j2 = useRef<RapierRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)

  const [vec] = useState(() => new THREE.Vector3())
  const [ang] = useState(() => new THREE.Vector3())
  const [rot] = useState(() => new THREE.Vector3())
  const [dir] = useState(() => new THREE.Vector3())

  const [lerped] = useState(() => [
    new THREE.Vector3(),
    new THREE.Vector3(),
  ])

  const lerpReady = useRef(false)

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])

    c.curveType = 'chordal'

    return c
  })

  const { width, height } = useThree((state) => state.size)

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false)
  const [hovered, setHovered] = useState(false)

  const front = useTexture('/images/name-card.jpg', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    t.minFilter = THREE.LinearMipmapLinearFilter
    t.magFilter = THREE.LinearFilter
    t.generateMipmaps = true
  })

  const back = useCardBackTexture()
  const strap = useStrapTexture()

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])

  useSphericalJoint(
    j3,
    card,
    [[0, 0, 0], [0, ANCHOR_Y, 0]],
  )

  useEffect(() => {
    if (!hovered) return

    document.body.style.cursor = dragged ? 'grabbing' : 'grab'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current ||
      !band.current
    ) {
      return
    }

    if (dragged) {
      vec.set(
        state.pointer.x,
        state.pointer.y,
        0.5,
      ).unproject(state.camera)

      dir.copy(vec)
        .sub(state.camera.position)
        .normalize()

      vec.add(
        dir.multiplyScalar(state.camera.position.length()),
      )

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }

    const joints = [j1.current, j2.current]

    if (!lerpReady.current) {
      joints.forEach((joint, i) => {
        lerped[i].copy(joint.translation())
      })

      lerpReady.current = true
    }

    joints.forEach((joint, i) => {
      const target = joint.translation()

      const distance = Math.max(
        0.1,
        Math.min(1, lerped[i].distanceTo(target)),
      )

      lerped[i].lerp(
        target,
        Math.min(1, delta * (10 + distance * 40)),
      )
    })

    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(lerped[1])
    curve.points[2].copy(lerped[0])
    curve.points[3].copy(fixed.current.translation())

    band.current.geometry.setPoints(
      curve.getPoints(compact ? 16 : 24),
    )

    ang.copy(card.current.angvel())

    const q = card.current.rotation()

    rot.set(q.x, q.y, q.z)

    card.current.setAngvel(
      {
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      },
      true,
    )
  })

  const start = reducedMotion
    ? {
        j1: [0, -1, 0],
        j2: [0, -2, 0],
        j3: [0, -3, 0],
        card: [0, -3 - ANCHOR_Y, 0],
      }
    : {
        j1: [0.5, 0, 0],
        j2: [1, 0, 0],
        j3: [1.5, 0, 0],
        card: [2, 0, 0],
      }

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()

    ;(e.target as unknown as Element).setPointerCapture(e.pointerId)

    if (card.current) {
      setDragged(
        new THREE.Vector3()
          .copy(e.point)
          .sub(vec.copy(card.current.translation())),
      )

      card.current.wakeUp()
    }
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    ;(e.target as unknown as Element).releasePointerCapture(e.pointerId)

    setDragged(false)
  }

  return (
    <>
      <group position={[0, 4.2, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />

        <RigidBody
          position={start.j1 as [number, number, number]}
          ref={j1}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={start.j2 as [number, number, number]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={start.j3 as [number, number, number]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={start.card as [number, number, number]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider
            args={[
              HOLDER_W / 2,
              HOLDER_H / 2,
              0.02,
            ]}
          />

          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <Card front={front} back={back} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />

        <meshLineMaterial
          args={[
            {
              resolution: new THREE.Vector2(width, height),
            },
          ]}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap={1}
          map={strap}
          repeat={[-4, 1]}
          lineWidth={compact ? 0.9 : 1}
        />
      </mesh>
    </>
  )
}

// ========================================
// 3D ID CARD
// ========================================

function Card({
  front,
  back,
}: {
  front: THREE.Texture
  back: THREE.Texture
}) {
  return (
    <group>
      <RoundedBox
        args={[HOLDER_W, HOLDER_H, 0.075]}
        radius={0.09}
        smoothness={6}
        position={[0, 0.1, -0.025]}
      >
        <meshPhysicalMaterial
          color="#dbeafe"
          roughness={0.22}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[CARD_W, CARD_H]} />

        <meshPhysicalMaterial
          map={front}
          roughness={0.22}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh
        position={[0, 0, -0.022]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[CARD_W, CARD_H]} />

        <meshPhysicalMaterial
          map={back}
          roughness={0.25}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <RoundedBox
        args={[HOLDER_W + 0.035, HOLDER_H + 0.035, 0.045]}
        radius={0.105}
        smoothness={6}
        position={[0, 0.1, 0.005]}
      >
        <meshPhysicalMaterial
          color="#eaf4ff"
          transparent
          opacity={0.12}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={1.8}
          depthWrite={false}
        />
      </RoundedBox>

      <RoundedBox
        args={[HOLDER_W + 0.055, HOLDER_H + 0.055, 0.018]}
        radius={0.115}
        smoothness={6}
        position={[0, 0.1, 0.035]}
      >
        <meshPhysicalMaterial
          color="#bfdbfe"
          transparent
          opacity={0.42}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1}
          depthWrite={false}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.46, 0.09, 0.065]}
        radius={0.035}
        smoothness={4}
        position={[0, HOLDER_H / 2 + 0.075, 0]}
      >
        <meshPhysicalMaterial
          color="#dbeafe"
          metalness={0.9}
          roughness={0.14}
          clearcoat={1}
        />
      </RoundedBox>

      <group position={[0, ANCHOR_Y - 0.06, 0]}>
        <mesh>
          <torusGeometry args={[0.095, 0.024, 12, 32]} />

          <meshStandardMaterial
            color="#e2e8f0"
            metalness={1}
            roughness={0.12}
          />
        </mesh>

        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.11, 0.12, 0.045]} />

          <meshStandardMaterial
            color="#94a3b8"
            metalness={1}
            roughness={0.16}
          />
        </mesh>
      </group>
    </group>
  )
}
