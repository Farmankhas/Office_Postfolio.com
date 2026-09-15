import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const ThreeCanvasLogo: React.FC<ThreeCanvasLogoProps> = ({
  size = 280,
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // If WebGL fails on edge device
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for the entire 3D emblem
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Studio Lighting for metallic chrome reflections
    const ambientLight = new THREE.AmbientLight(0x2e1065, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 3.2); // Metallic purple light
    dirLight2.position.set(-5, -3, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 2.0, 10); // subtle blue reflection
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    // Chrome Metallic Purple Material
    const chromePurpleMaterial = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x3b0764,
      emissiveIntensity: 0.35,
    });

    const chromeSilverMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.1,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.2,
    });

    // Outer Torus Ring 1 (tilted)
    const torusGeo1 = new THREE.TorusGeometry(2.0, 0.055, 32, 100);
    const torus1 = new THREE.Mesh(torusGeo1, chromeSilverMaterial);
    torus1.rotation.x = Math.PI / 3;
    emblemGroup.add(torus1);

    // Outer Torus Ring 2 (counter-tilted)
    const torusGeo2 = new THREE.TorusGeometry(2.2, 0.04, 32, 100);
    const torus2 = new THREE.Mesh(torusGeo2, chromePurpleMaterial);
    torus2.rotation.y = Math.PI / 4;
    emblemGroup.add(torus2);

    // Central Hexagonal / Diamond Shield Core
    const coreGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 6);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f0b1e,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.x = Math.PI / 2;
    emblemGroup.add(core);

    // Core border ring
    const coreBorderGeo = new THREE.TorusGeometry(1.42, 0.06, 16, 6);
    const coreBorder = new THREE.Mesh(coreBorderGeo, chromePurpleMaterial);
    emblemGroup.add(coreBorder);

    // 3D "F" Letter Representation
    const fGroup = new THREE.Group();
    // Vertical stem of F
    const stemGeo = new THREE.BoxGeometry(0.22, 1.2, 0.25);
    const fStem = new THREE.Mesh(stemGeo, chromeSilverMaterial);
    fStem.position.set(-0.65, 0, 0.15);
    fGroup.add(fStem);

    // Top horizontal bar of F
    const fTopGeo = new THREE.BoxGeometry(0.55, 0.2, 0.25);
    const fTop = new THREE.Mesh(fTopGeo, chromePurpleMaterial);
    fTop.position.set(-0.4, 0.5, 0.15);
    fGroup.add(fTop);

    // Middle horizontal bar of F
    const fMidGeo = new THREE.BoxGeometry(0.4, 0.18, 0.25);
    const fMid = new THREE.Mesh(fMidGeo, chromeSilverMaterial);
    fMid.position.set(-0.45, 0.05, 0.15);
    fGroup.add(fMid);

    emblemGroup.add(fGroup);

    // 3D "A" Letter Representation
    const aGroup = new THREE.Group();
    // Left diagonal leg of A
    const aLegLeftGeo = new THREE.BoxGeometry(0.2, 1.25, 0.25);
    const aLegLeft = new THREE.Mesh(aLegLeftGeo, chromeSilverMaterial);
    aLegLeft.position.set(0.35, 0, 0.15);
    aLegLeft.rotation.z = -0.22;
    aGroup.add(aLegLeft);

    // Right diagonal leg of A
    const aLegRight = new THREE.Mesh(aLegLeftGeo, chromePurpleMaterial);
    aLegRight.position.set(0.75, 0, 0.15);
    aLegRight.rotation.z = 0.22;
    aGroup.add(aLegRight);

    // Middle crossbar of A
    const aCrossGeo = new THREE.BoxGeometry(0.35, 0.16, 0.26);
    const aCross = new THREE.Mesh(aCrossGeo, chromeSilverMaterial);
    aCross.position.set(0.55, -0.05, 0.15);
    aGroup.add(aCross);

    // Top cap of A
    const aCapGeo = new THREE.BoxGeometry(0.22, 0.18, 0.25);
    const aCap = new THREE.Mesh(aCapGeo, chromePurpleMaterial);
    aCap.position.set(0.55, 0.53, 0.15);
    aGroup.add(aCap);

    emblemGroup.add(aGroup);

    // Floating Particles around the emblem
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4.0;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interaction mouse tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.9;
      targetRotX = -y * 0.7;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle floating and rotation
      torus1.rotation.z = elapsedTime * 0.4;
      torus2.rotation.x = Math.PI / 4 + Math.sin(elapsedTime * 0.5) * 0.25;
      torus2.rotation.y = elapsedTime * -0.3;

      emblemGroup.rotation.y += (targetRotY - emblemGroup.rotation.y) * 0.05 + Math.sin(elapsedTime * 0.8) * 0.002;
      emblemGroup.rotation.x += (targetRotX - emblemGroup.rotation.x) * 0.05;
      emblemGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;

      particles.rotation.y = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth || size;
      const newHeight = container.clientHeight || size;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      torusGeo1.dispose();
      torusGeo2.dispose();
      coreGeo.dispose();
      coreBorderGeo.dispose();
      stemGeo.dispose();
      fTopGeo.dispose();
      fMidGeo.dispose();
      aLegLeftGeo.dispose();
      aCrossGeo.dispose();
      aCapGeo.dispose();
      chromePurpleMaterial.dispose();
      chromeSilverMaterial.dispose();
      coreMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: '100%', height: '100%', minHeight: size }}
      aria-label="3D Metallic FA Logo"
    />
  );
};
