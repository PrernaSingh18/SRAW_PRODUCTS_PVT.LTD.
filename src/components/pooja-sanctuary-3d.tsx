"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatINR, products, type Product } from "@/lib/products";
import { localePath, type Dictionary } from "@/lib/i18n";
import { productNames } from "@/lib/i18n/products-hi";
import type { Locale } from "@/lib/i18n/config";

type IncenseAroma = {
  id: string;
  name: { en: string; hi: string };
  stickColor: number;
  emberColor: number;
  smokeColor: number;
  productSlug: string;
  notes: { en: string; hi: string };
  burnTime: string;
  intensity: string;
};

const aromas: IncenseAroma[] = [
  {
    id: "sandal-3in1",
    name: { en: "Sri Kanth 3-in-1 (Chandan)", hi: "श्री कण्ठ ३-इन-१ (चंदन)" },
    stickColor: 0x4a2e18,
    emberColor: 0xff6600,
    smokeColor: 0xf5eedc,
    productSlug: "srikanth-3-in-1",
    notes: { en: "Pure Sandalwood, Floral Blend, Camphor", hi: "शुद्ध चंदन, पुष्प मिश्रण, कपूर" },
    burnTime: "45–50 Mins",
    intensity: "Rich & Harmonious",
  },
  {
    id: "neelkanth-loban",
    name: { en: "Neelkanth 4-in-1 (Kedarnath Loban)", hi: "नीलकंठ ४-इन-१ (लोबान व गुग्गुल)" },
    stickColor: 0x2b221c,
    emberColor: 0xff4500,
    smokeColor: 0xdfecf5,
    productSlug: "neelkanth",
    notes: { en: "Sacred Guggul, Temple Loban, Forest Herbs", hi: "पवित्र गुग्गुल, लोबान, जड़ी-बूटियाँ" },
    burnTime: "50+ Mins",
    intensity: "Deep Temple Resins",
  },
  {
    id: "puja-dhoop",
    name: { en: "Puja Dhoop Sticks (Airtight Jar)", hi: "पूजा धूप स्टिक्स (जार)" },
    stickColor: 0x3d1f14,
    emberColor: 0xff7722,
    smokeColor: 0xf0e6d2,
    productSlug: "srikanth-puja-dhoop-jar",
    notes: { en: "Samagri, Guggal, Cow Ghee Essence", hi: "वैदिक सामग्री, गुग्गुल, शुद्ध सुगंध" },
    burnTime: "40–45 Mins",
    intensity: "Strong Temple Aura",
  },
  {
    id: "total-out-citronella",
    name: { en: "Total Out (Herbal Citronella)", hi: "टोटल आउट (हर्बल सिट्रोनेला)" },
    stickColor: 0x24331b,
    emberColor: 0xffaa00,
    smokeColor: 0xe8f5e9,
    productSlug: "total-out",
    notes: { en: "Organic Citronella, Lemongrass & Neem", hi: "सिट्रोनेला, लेमनग्रास, नीम" },
    burnTime: "60+ Mins",
    intensity: "Crisp Mosquito-Free Freshness",
  },
];

export function PoojaSanctuary3D({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAromaIndex, setActiveAromaIndex] = useState(0);
  const [isLit, setIsLit] = useState(true);
  const [isFanning, setIsFanning] = useState(false);
  const [added, setAdded] = useState(false);
  const [isWebGlSupported, setIsWebGlSupported] = useState(true);
  const { add } = useCart();

  const isHi = locale === "hi";
  const activeAroma = aromas[activeAromaIndex];
  const activeProduct: Product | undefined = products.find(
    (p) => p.slug === activeAroma.productSlug,
  );
  const names = activeProduct ? productNames(activeProduct, locale) : null;

  // Scene references for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const emberMeshRef = useRef<THREE.Mesh | null>(null);
  const emberLightRef = useRef<THREE.PointLight | null>(null);
  const flameMeshRef = useRef<THREE.Mesh | null>(null);
  const flameLightRef = useRef<THREE.PointLight | null>(null);
  const smokeParticlesRef = useRef<{
    geometry: THREE.BufferGeometry;
    positions: Float32Array;
    velocities: Float32Array;
    lifetimes: Float32Array;
    points: THREE.Points;
  } | null>(null);
  const stickMeshRef = useRef<THREE.Mesh | null>(null);
  const fanWindRef = useRef<{ strength: number; direction: number }>({ strength: 0, direction: 0 });

  // Sacred Temple Bell synthesizer using Web Audio API
  const ringBell = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Fundamental and devotional harmonic frequencies of a brass temple bell
      const freqs = [587.33, 1174.66, 1760.0, 2349.32, 3520.0];
      const gains = [0.4, 0.25, 0.15, 0.08, 0.04];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Bell strike transient and long serene resonant ring
        gainNode.gain.setValueAtTime(gains[idx], ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.3);
      });
    } catch {
      // Audio context silently ignored if blocked by autoplay policy
    }
  }, []);

  // Quick Add to Cart
  const handleQuickAdd = () => {
    if (!activeProduct) return;
    const variant = activeProduct.variants[0];
    add(
      {
        slug: activeProduct.slug,
        name: `${activeProduct.name} — ${activeProduct.subtitle}`,
        variant: `${variant.label} (${formatINR(variant.price)})`,
        price: variant.price,
      },
      1,
    );
    setAdded(true);
    ringBell();
    window.setTimeout(() => setAdded(false), 1600);
  };

  // Trigger Breeze / Fan
  const triggerBreeze = () => {
    setIsFanning(true);
    fanWindRef.current.strength = 1.8;
    fanWindRef.current.direction = (Math.random() - 0.5) * 2;
    window.setTimeout(() => {
      setIsFanning(false);
      fanWindRef.current.strength = 0;
    }, 1200);
  };

  const isLitRef = useRef(isLit);
  useEffect(() => {
    isLitRef.current = isLit;
  }, [isLit]);

  // Setup Three.js 3D Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setTimeout(() => setIsWebGlSupported(false), 0);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 5.8);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Devotional Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffe8c2, 2.0);
    sunLight.position.set(4, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0xffeedd, 0.8, 10);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Root Group for interactive rotation
    const sanctuaryGroup = new THREE.Group();
    scene.add(sanctuaryGroup);

    // 1. Polished Brass Pooja Thali (Plate)
    const thaliRadius = 2.4;
    const thaliGeo = new THREE.CylinderGeometry(thaliRadius, thaliRadius * 0.95, 0.12, 64);
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });
    const thali = new THREE.Mesh(thaliGeo, brassMaterial);
    thali.receiveShadow = true;
    thali.castShadow = true;
    sanctuaryGroup.add(thali);

    // Thali Outer Rim Lip
    const rimGeo = new THREE.TorusGeometry(thaliRadius * 0.98, 0.08, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, brassMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.07;
    sanctuaryGroup.add(rimMesh);

    // Concentric Inscribed Mandala Ring inside Thali
    const innerRingGeo = new THREE.TorusGeometry(1.5, 0.02, 12, 64);
    const engravedMat = new THREE.MeshStandardMaterial({
      color: 0xb38600,
      metalness: 0.95,
      roughness: 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, engravedMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.065;
    sanctuaryGroup.add(innerRing);

    // 2. Brass Agarbatti Stand (Central Tiered Base)
    const standGroup = new THREE.Group();
    standGroup.position.set(-0.3, 0.06, 0);

    const standBaseGeo = new THREE.CylinderGeometry(0.32, 0.42, 0.12, 32);
    const standBase = new THREE.Mesh(standBaseGeo, brassMaterial);
    standBase.castShadow = true;
    standGroup.add(standBase);

    const standCupGeo = new THREE.CylinderGeometry(0.2, 0.14, 0.2, 32);
    const standCup = new THREE.Mesh(standCupGeo, brassMaterial);
    standCup.position.y = 0.14;
    standCup.castShadow = true;
    standGroup.add(standCup);

    sanctuaryGroup.add(standGroup);

    // 3. Incense Stick (Bamboo Stem + Fragrant Masala Coating)
    const stickGroup = new THREE.Group();
    stickGroup.position.set(-0.3, 0.24, 0);
    // Slight authentic prayer angle (7 degrees slant)
    stickGroup.rotation.z = -0.12;
    stickGroup.rotation.x = 0.05;

    // Bare bamboo stem handle
    const stemGeo = new THREE.CylinderGeometry(0.016, 0.018, 0.7, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xd2a679,
      roughness: 0.7,
      metalness: 0.05,
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.35;
    stem.castShadow = true;
    stickGroup.add(stem);

    // Fragrant Masala Agarbatti body
    const initialAroma = aromas[0];
    const stickBodyGeo = new THREE.CylinderGeometry(0.028, 0.026, 1.6, 16);
    const stickBodyMat = new THREE.MeshStandardMaterial({
      color: initialAroma.stickColor,
      roughness: 0.85,
      metalness: 0.0,
    });
    const stickBody = new THREE.Mesh(stickBodyGeo, stickBodyMat);
    stickBody.position.y = 1.48;
    stickBody.castShadow = true;
    stickMeshRef.current = stickBody;
    stickGroup.add(stickBody);

    // Glowing Ember Tip (Angaar)
    const emberGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const emberMat = new THREE.MeshBasicMaterial({
      color: initialAroma.emberColor,
    });
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.y = 2.28;
    emberMeshRef.current = ember;
    stickGroup.add(ember);

    // Point Light from Ember
    const emberLight = new THREE.PointLight(initialAroma.emberColor, 0.9, 1.8);
    emberLight.position.copy(ember.position);
    emberLightRef.current = emberLight;
    stickGroup.add(emberLight);

    sanctuaryGroup.add(stickGroup);

    // 4. Traditional Brass Diya (Oil Lamp) with Living Flame
    const diyaGroup = new THREE.Group();
    diyaGroup.position.set(0.95, 0.06, 0.4);

    const diyaCupGeo = new THREE.CylinderGeometry(0.38, 0.16, 0.22, 24);
    const diyaCup = new THREE.Mesh(diyaCupGeo, brassMaterial);
    diyaCup.castShadow = true;
    diyaGroup.add(diyaCup);

    // Oil surface in Diya
    const oilGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.02, 24);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0x9e6c1a,
      roughness: 0.1,
      metalness: 0.2,
    });
    const oil = new THREE.Mesh(oilGeo, oilMat);
    oil.position.y = 0.09;
    diyaGroup.add(oil);

    // Diya Flame Mesh (Tear-drop flame)
    const flameGeo = new THREE.ConeGeometry(0.09, 0.28, 16);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffb732,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, 0.23, 0);
    flameMeshRef.current = flame;
    diyaGroup.add(flame);

    // Golden Diya Point Light
    const flameLight = new THREE.PointLight(0xffa500, 1.6, 3.5);
    flameLight.position.set(0, 0.3, 0);
    flameLight.castShadow = true;
    flameLightRef.current = flameLight;
    diyaGroup.add(flameLight);

    sanctuaryGroup.add(diyaGroup);

    // 5. Devotional Offerings: Scattered Marigold & Rose Petals
    const flowerColors = [0xff7700, 0xffaa00, 0xcc2244, 0xff5500];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2 + 0.4;
      const radius = 1.3 + (i % 3) * 0.28;
      const flowerGeo = new THREE.SphereGeometry(0.09, 8, 8);
      flowerGeo.scale(1.2, 0.6, 1.2);
      const flowerMat = new THREE.MeshStandardMaterial({
        color: flowerColors[i % flowerColors.length],
        roughness: 0.7,
      });
      const flower = new THREE.Mesh(flowerGeo, flowerMat);
      flower.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
      flower.rotation.y = angle;
      flower.castShadow = true;
      sanctuaryGroup.add(flower);
    }

    // 6. Sacred 3D Smoke Particle Simulation System
    const particleCount = 180;
    const smokeGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    // Initialize particles at the ember tip with staggered lifetimes
    for (let i = 0; i < particleCount; i++) {
      lifetimes[i] = (i / particleCount) * 1.0;
      positions[i * 3] = -0.3 + (Math.random() - 0.5) * 0.04;
      positions[i * 3 + 1] = 2.45 + (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 2] = 0.0 + (Math.random() - 0.5) * 0.04;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = 0.014 + Math.random() * 0.008; // Upward buoyant drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    smokeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const smokeMat = new THREE.PointsMaterial({
      color: initialAroma.smokeColor,
      size: 0.16,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const smokePoints = new THREE.Points(smokeGeo, smokeMat);
    sanctuaryGroup.add(smokePoints);

    smokeParticlesRef.current = {
      geometry: smokeGeo,
      positions,
      velocities,
      lifetimes,
      points: smokePoints,
    };

    // Orbit Drag Controls (User Interactivity)
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.006;
      rotationVelocityX = deltaY * 0.004;

      sanctuaryGroup.rotation.y += rotationVelocityY;
      // Clamp vertical tilt so the thali remains visible
      sanctuaryGroup.rotation.x = Math.max(-0.25, Math.min(0.4, sanctuaryGroup.rotation.x + rotationVelocityX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      sanctuaryGroup.rotation.y += deltaX * 0.007;
      sanctuaryGroup.rotation.x = Math.max(-0.25, Math.min(0.4, sanctuaryGroup.rotation.x + deltaY * 0.004));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    dom.addEventListener("touchmove", onTouchMove, { passive: true });
    dom.addEventListener("touchend", onTouchEnd);

    // Responsive Canvas Resizing
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clockTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clockTime += 0.016;

      // Gentle auto-rotation when user is not dragging
      if (!isDragging) {
        sanctuaryGroup.rotation.y += 0.0025;
      }

      // 1. Diya Flame Flickering Physics
      if (flameMeshRef.current && flameLightRef.current) {
        const flicker = Math.sin(clockTime * 14) * 0.12 + Math.cos(clockTime * 23) * 0.08;
        flameMeshRef.current.scale.set(1 + flicker * 0.6, 1 + flicker, 1 + flicker * 0.6);
        flameMeshRef.current.position.y = 0.23 + flicker * 0.02;
        flameLightRef.current.intensity = 1.6 + flicker * 0.4;
      }

      // 2. Ember Heat Pulsing & Light Shimmer
      if (emberMeshRef.current && emberLightRef.current) {
        const emberPulse = Math.sin(clockTime * 4) * 0.15 + 0.85;
        emberMeshRef.current.scale.setScalar(emberPulse);
        emberLightRef.current.intensity = isLitRef.current ? 0.9 * emberPulse : 0.0;
        emberMeshRef.current.visible = isLitRef.current;
      }

      // 3. Smoke Particles Physics
      if (smokeParticlesRef.current && isLitRef.current) {
        const { positions, velocities, lifetimes, geometry } = smokeParticlesRef.current;
        const wind = fanWindRef.current;

        for (let i = 0; i < particleCount; i++) {
          lifetimes[i] += 0.009;

          // Natural spiritual spiral curl
          const curlX = Math.sin(clockTime * 3 + lifetimes[i] * 5) * 0.0025;
          const curlZ = Math.cos(clockTime * 2.5 + lifetimes[i] * 4) * 0.0025;

          positions[i * 3] += velocities[i * 3] + curlX + wind.strength * 0.025;
          positions[i * 3 + 1] += velocities[i * 3 + 1];
          positions[i * 3 + 2] += velocities[i * 3 + 2] + curlZ;

          // Reset particle to ember tip when reaching end of lifetime
          if (lifetimes[i] > 1.0 || positions[i * 3 + 1] > 4.2) {
            lifetimes[i] = 0;
            // Spawn at ember location
            positions[i * 3] = -0.3 + (Math.random() - 0.5) * 0.03;
            positions[i * 3 + 1] = 2.45 + (Math.random() - 0.5) * 0.03;
            positions[i * 3 + 2] = 0.0 + (Math.random() - 0.5) * 0.03;

            velocities[i * 3] = (Math.random() - 0.5) * 0.006;
            velocities[i * 3 + 1] = 0.013 + Math.random() * 0.008;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      dom.removeEventListener("touchmove", onTouchMove);
      dom.removeEventListener("touchend", onTouchEnd);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D materials when aroma selection changes
  useEffect(() => {
    if (stickMeshRef.current) {
      const mat = stickMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(activeAroma.stickColor);
    }
    if (emberMeshRef.current) {
      const mat = emberMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.color.setHex(activeAroma.emberColor);
    }
    if (emberLightRef.current) {
      emberLightRef.current.color.setHex(activeAroma.emberColor);
    }
    if (smokeParticlesRef.current) {
      const mat = smokeParticlesRef.current.points.material as THREE.PointsMaterial;
      mat.color.setHex(activeAroma.smokeColor);
    }
  }, [activeAroma]);

  // Handle Lit / Extinguish state
  useEffect(() => {
    if (emberMeshRef.current) {
      emberMeshRef.current.visible = isLit;
    }
    if (emberLightRef.current) {
      emberLightRef.current.intensity = isLit ? 0.9 : 0;
    }
    if (smokeParticlesRef.current) {
      smokeParticlesRef.current.points.visible = isLit;
    }
  }, [isLit]);

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#180f29] via-ink to-[#120822] text-white py-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>✨ {isHi ? "३डी आभासी पूजा दर्शन" : "3D Virtual Pooja Sanctum"}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-white">
            {isHi
              ? "पवित्र अगरबत्ती और थाली का सजीव ३डी अनुभव"
              : "Experience Pure Incense in Real-Time 3D"}
          </h2>

          <p className="mt-3 text-sm text-white/80 sm:text-base">
            {isHi
              ? "थाली को ३६०° घुमाएँ, सुगंध बदलें, पवित्र घंटी बजाएँ, और शुद्ध अगरबत्ती के पावन धुएँ का अनुभव करें।"
              : "Interact directly with our handcrafted brass thali and incense. Drag to rotate in 360°, switch divine fragrances, and ring the sanctum bell."}
          </p>
        </div>

        {/* 3D Canvas Showcase & Control Center */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* 3D Canvas Box */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/15 bg-radial from-amber-950/25 via-black/60 to-black/90 shadow-2xl backdrop-blur-md">
            {/* The 3D WebGL Canvas */}
            {isWebGlSupported ? (
              <div
                ref={containerRef}
                className="h-full w-full cursor-grab active:cursor-grabbing"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-8 text-center text-white/70">
                <p>
                  {isHi
                    ? "आपका ब्राउज़र WebGL ३डी का समर्थन नहीं करता है।"
                    : "WebGL is not supported on this browser."}
                </p>
              </div>
            )}

            {/* In-Canvas Floating Interactive Controls */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={ringBell}
                className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-3 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                title="Ring sacred temple bell"
              >
                <span>🔔</span>
                <span>{isHi ? "घंटी बजाएँ" : "Ring Bell"}</span>
              </button>

              <button
                type="button"
                onClick={triggerBreeze}
                disabled={isFanning}
                className={`flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 ${
                  isFanning ? "animate-pulse text-amber-300" : ""
                }`}
                title="Fan breeze towards incense smoke"
              >
                <span>💨</span>
                <span>{isHi ? "हवा दें" : "Fan Smoke"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLit((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 ${
                  isLit ? "text-orange-400" : "text-white/60"
                }`}
                title="Toggle lit/unlit state"
              >
                <span>🔥</span>
                <span>{isLit ? (isHi ? "सुगंध प्रज्वलित" : "Lit") : (isHi ? "बुझाएँ" : "Unlit")}</span>
              </button>
            </div>

            {/* Drag Hint at Bottom Center */}
            <div className="pointer-events-none absolute bottom-4 inset-x-0 z-20 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-[11px] font-medium tracking-wide text-white/75 backdrop-blur-md">
                <span>🔄</span>
                <span>{isHi ? "३६०° घुमाने के लिए क्लिक व ड्रैग करें" : "Click & drag to rotate 360°"}</span>
              </div>
            </div>
          </div>

          {/* Side Control & Product Card */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase block">
                {isHi ? "सुगंध एवं अवतार चुनें:" : "Choose Incense Fragrance:"}
              </span>

              {/* Fragrance Switcher Tabs */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {aromas.map((aroma, idx) => {
                  const isSelected = idx === activeAromaIndex;
                  return (
                    <button
                      key={aroma.id}
                      type="button"
                      onClick={() => {
                        setActiveAromaIndex(idx);
                        setIsLit(true);
                      }}
                      className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200 active:scale-95 ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/20 text-white shadow-md shadow-amber-500/20"
                          : "border-white/15 bg-black/30 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-bold truncate w-full">
                        {aroma.name[locale]}
                      </span>
                      <span className="mt-1 text-[10px] text-white/60 truncate w-full">
                        {aroma.intensity}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Incense Specifications */}
              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase tracking-wider">
                    {isHi ? "प्राकृतिक सुगंध घटक" : "Aroma Notes"}
                  </span>
                  <span className="text-sm font-semibold text-amber-200 mt-0.5 block">
                    {activeAroma.notes[locale]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase tracking-wider">
                      {isHi ? "प्रज्वलन अवधि" : "Burn Duration"}
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">
                      ⏱️ {activeAroma.burnTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase tracking-wider">
                      {isHi ? "पवित्रता" : "Purity"}
                    </span>
                    <span className="font-semibold text-emerald-400 mt-0.5 block">
                      ✓ 100% Charcoal-Free
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Product Shop Link & Add to Cart */}
            {activeProduct && names && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                      {isHi ? "संबद्ध उत्पाद" : "Featured Product"}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {names.primary}
                    </h4>
                    <p className="text-xs text-amber-200 font-semibold mt-0.5">
                      {formatINR(activeProduct.variants[0].price)}{" "}
                      <span className="text-white/60 font-normal">
                        ({activeProduct.variants[0].label})
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleQuickAdd}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all active:scale-95 shadow-md ${
                        added
                          ? "bg-emerald-600 text-white"
                          : "bg-brand hover:bg-brand-dark text-white shadow-brand/40"
                      }`}
                    >
                      {added ? `${dict.common.added} ✓` : `${dict.common.addToCart}`}
                    </button>

                    <Link
                      href={localePath(locale, `/shop/${activeProduct.slug}`)}
                      className="text-[11px] text-white/80 underline underline-offset-2 hover:text-amber-300 transition-colors"
                    >
                      {dict.common.viewDetails} →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
