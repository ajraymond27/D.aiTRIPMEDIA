// components/GatorHunt/GatorHuntImpl.jsx
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function GatorHuntImpl() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const frustumHeight = 1000;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.OrthographicCamera(
      (-frustumHeight * aspect) / 2,
      (frustumHeight * aspect) / 2,
      frustumHeight / 2,
      -frustumHeight / 2,
      0.1,
      1000
    );
    camera.position.z = 10;

    const loader = new THREE.TextureLoader();
    const gatorTex = loader.load("/gator-hunt/gator_idle.png");
    const gatorHitTex = loader.load("/gator-hunt/gator_hit.png");
    const bgTex = loader.load("/gator-hunt/background.png");

    // Background
    const bgMat = new THREE.MeshBasicMaterial({ map: bgTex });
    const bgGeom = new THREE.PlaneGeometry(frustumHeight * aspect, frustumHeight);
    const bgMesh = new THREE.Mesh(bgGeom, bgMat);
    bgMesh.position.z = -50;
    scene.add(bgMesh);

    const activeGators = [];

    // Simple gator spawn
    function spawnGator() {
      const width = 150;
      const height = 100;
      const mat = new THREE.MeshBasicMaterial({ map: gatorTex, transparent: true });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mat);

      const fromLeft = Math.random() > 0.5;
      mesh.position.x = fromLeft ? -renderer.domElement.width / 2 - width : renderer.domElement.width / 2 + width;
      mesh.position.y = (Math.random() - 0.5) * frustumHeight * 0.5;
      mesh.userData = { direction: fromLeft ? 1 : -1, speed: 200, state: "idle", hitTimer: 0 };
      scene.add(mesh);
      activeGators.push(mesh);
    }

    // Spawn every 0.5 seconds
    const spawnInterval = setInterval(spawnGator, 500);

    // Simple click detection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    renderer.domElement.addEventListener("pointerdown", (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(activeGators);
      if (hits.length) {
        const g = hits[0].object;
        if (g.userData.state !== "hit") {
          g.material.map = gatorHitTex;
          g.userData.state = "hit";
          g.userData.hitTimer = 0.5;
          setScore((s) => s + 1);
        }
      }
    });

    // Animation loop
    function animate(now) {
      const delta = 0.016; // fixed ~60fps for simplicity

      for (let i = activeGators.length - 1; i >= 0; i--) {
        const g = activeGators[i];
        if (g.userData.state === "hit") {
          g.userData.hitTimer -= delta;
          if (g.userData.hitTimer <= 0) {
            scene.remove(g);
            activeGators.splice(i, 1);
          }
        } else {
          g.position.x += g.userData.direction * g.userData.speed * delta;
          if (g.position.x < -renderer.domElement.width / 2 - 200 || g.position.x > renderer.domElement.width / 2 + 200) {
            scene.remove(g);
            activeGators.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    // Game timer
    const start = performance.now();
    const timerInterval = setInterval(() => {
      const elapsed = performance.now() - start;
      const remain = Math.max(0, Math.ceil(timeLeft - elapsed / 1000));
      setTimeLeft(remain);
      if (remain <= 0) clearInterval(timerInterval);
    }, 100);

    // Cleanup
    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
      cancelAnimationFrame(rafRef.current);
      activeGators.forEach((g) => scene.remove(g));
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", left: 12, top: 12, color: "white" }}>Score: {score}</div>
      <div style={{ position: "absolute", right: 12, top: 12, color: "white" }}>Time: {timeLeft}s</div>
    </div>
  );
}