import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Tutankhamun({ mouse }) {
  const { scene } = useGLTF('/tutankhamon.glb')
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    const [x, y] = mouse.current

    // يبص دايمًا ناحية النص (اليسار) بحركة طبيعية جدًا
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      -0.9 + x * 0.2,
      0.09
    )
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      y * 0.12,
      0.09
    )
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
      position={[1, -0.4, 0]}          // يمين الشاشة تمامًا
      rotation={[0, -0.55, 0]}             // بيبص للنص من الأول
    />
  )
}

export default function HeroSection() {
  const mouse = useRef([0, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ]
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const hieroglyphs = "𓀀 𓁿 𓂀 𓃀 𓄁 𓅂 𓆃 𓇳 𓈗 𓉐 𓊪 𓋹 𓌃 𓍢 𓎀 𓐍 𓏏 𓐝 𓋴 𓎛 𓎡 𓏤 𓐍 𓂋 𓏭 𓅓 𓊵 𓏏 𓊪 𓏳 𓄟 𓋴 𓇳 𓍯"

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', position: 'relative' }}>

      {/* الهيروغليفية المتحركة في الخلفية */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 40%, rgba(20,15,5,0.4) 0%, #000 70%)',
      }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '240%',
            height: '20%',
            top: `${i * 20}%`,
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              fontSize: '4.2vw',
              whiteSpace: 'nowrap',
              color: '#ffdd77',
              fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", serif',
              letterSpacing: '1.8vw',
              animation: i % 2 === 0 
                ? 'scroll-left 220s linear infinite' 
                : 'scroll-right 200s linear infinite',
              textShadow: `
                0 0 20px #ffd700,
                0 0 40px #ffaa00,
                0 0 80px #cc8800,
                0 0 120px #aa6600
              `,
              filter: 'brightness(1.3) contrast(2)',
              opacity: 0.26,
            }}>
              {hieroglyphs.repeat(12)}
            </div>

            {i < 4 && (
              <div style={{
                position: 'absolute',
                left: 0, right: 0,
                bottom: 0,
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, #ffd700, #b8860b, #ffd700, transparent)',
                boxShadow: '0 0 12px #ffd700',
                opacity: 0.5,
              }} />
            )}
          </div>
        ))}
      </div>

      {/* النص الذهبي الفخم على الشمال */}
      <div style={{
        position: 'absolute',
        left: '10vw',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        color: '#ffe136ff',
        pointerEvents: 'none',
        maxWidth: '600px',
      }}>
        <h1 style={{
          fontFamily:'initial',
          fontSize: 'clamp(52px, 7vw, 120px)',
          fontWeight: '300',
          margin: 0,
          lineHeight: '1.05',
          letterSpacing: '0.06em',
          textShadow: '0 0 40px #ffd700, 0 0 80px #b8860b, 0 0 120px #8b5a00',
        }}>
         Egypt
        Unpacked
        </h1>
        <p style={{
          fontSize: 'clamp(14px, 2.6vw, 32px)', color: '#ffdd99', margin: '28px 0 0',
          lineHeight: '1.6', fontWeight: 30, opacity: 0.92, letterSpacing: '0.1em',
          textShadow: '0 0 20px #ffd700'
        }}>
        </p>

  <div style={{
    marginTop: '60px',
    height: '2px',
    width: '180px',
    background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
    boxShadow: '0 0 25px #ffd700',
  }} />

</div>

      {/* الـ 3D Canvas */}
      <Canvas
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        camera={{ position: [0, 0.35, 2.1], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Environment preset="night" />
        <directionalLight position={[3.5, 6, 4]} intensity={2.6} color="#ffe8b8" />
        <directionalLight position={[-4, 8, -3]} intensity={1.8} color="#ffdc8a" />
        <directionalLight position={[0, -2, 6]} intensity={0.8} color="#b8d4ff" />
        <ambientLight intensity={0.1} />

        <Tutankhamun mouse={mouse} />
      </Canvas>

      {/* الأنيميشن بتاع الهيروغليفية */}
      <style jsx>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}