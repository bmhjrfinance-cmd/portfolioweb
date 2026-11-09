import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeCanvasProps {
  className?: string;
  wireframeMode?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ 
  className = 'w-full h-full',
  wireframeMode = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Software-WebGL Detection Guard (per Three.js skill)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#000000', 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
    } catch (e) {
      console.warn('WebGL failed to initialize', e);
      setIsSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (RoomEnvironment) for physical glass reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Key, Fill, Rim)
    const keyLight = new THREE.DirectionalLight('#ffffff', 2.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const mintAccentLight = new THREE.PointLight('#00F5A0', 3.5, 8);
    mintAccentLight.position.set(-2, -1, 1.5);
    scene.add(mintAccentLight);

    const crimsonAccentLight = new THREE.PointLight('#FF2D55', 2.5, 6);
    crimsonAccentLight.position.set(2, -2, -1.5);
    scene.add(crimsonAccentLight);

    const hemiLight = new THREE.HemisphereLight('#ffffff', '#0a0a0c', 0.8);
    scene.add(hemiLight);

    // 5. Composite 3D Procedural Subject: Multi-part Spatial Glass Artifact
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Part A: Outer Refractive Glass Facets (Icosahedron)
    const glassGeometry = new THREE.IcosahedronGeometry(1.25, 0);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.45 : 1,
      ior: 1.55,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: wireframeMode,
      attenuationColor: new THREE.Color('#00F5A0'),
      attenuationDistance: 1.5,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    rootGroup.add(glassMesh);

    // Part B: Outer Wireframe Cage Bevels (giving architectural precision)
    const wireframeGeo = new THREE.WireframeGeometry(glassGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: '#00F5A0',
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    wireframeLines.scale.setScalar(1.002);
    rootGroup.add(wireframeLines);

    // Part C: Inner Glowing Quantum Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: '#00F5A0',
      metalness: 0.8,
      roughness: 0.2,
      emissive: '#00F5A0',
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Part D: Orbital Spatial Ellipse Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(1.7, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#8A8A8E',
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    ringMesh2.scale.setScalar(1.15);
    rootGroup.add(ringMesh2);

    // Part E: Floating Ambient Spatial Particles
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#00F5A0',
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Tracking with Damped Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener('mousemove', onPointerMove);

    // 7. Animation Loop with Exponential Damping
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for silky smooth mouse tracking
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      rootGroup.rotation.y = time * 0.25 + mouseX;
      rootGroup.rotation.x = Math.sin(time * 0.3) * 0.15 + mouseY;
      rootGroup.position.y = Math.sin(time * 0.8) * 0.08;

      // Reverse spin for internal core
      coreMesh.rotation.y = -time * 0.6;
      coreMesh.rotation.z = time * 0.4;

      ringMesh1.rotation.z = time * 0.15;
      ringMesh2.rotation.z = -time * 0.2;

      particles.rotation.y = time * 0.04;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      glassGeometry.dispose();
      glassMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [wireframeMode]);

  if (!isSupported) {
    return (
      <div className={`${className} flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-500 text-xs`}>
        <span>Interactive 3D Spatial Canvas</span>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className={`${className} relative cursor-grab active:cursor-grabbing select-none`}
      title="Interactive 3D Glass Artifact — Drag or Move Mouse to Orbit"
    />
  );
};
