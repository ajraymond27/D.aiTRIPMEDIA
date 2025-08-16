// components/GatorHunt/GatorHuntImpl.jsx
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import * as THREE from "three";

export default function GatorHuntImpl() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

  // --- Game State / HUD ---
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // phases: "ready" | "countdown" | "playing" | "over"
  const [phase, setPhase] = useState("ready");
  const [countdown, setCountdown] = useState(null); // 3 | 2 | 1 | "GO" | null

  // Start / Restart helpers
  function startGame() {
    // reset HUD
    setHits(0);
    setMisses(0);
    setElapsedTime(0);
    // begin countdown
    setPhase("countdown");
  }
  function restartGame() {
    startGame();
  }

  // --- Countdown sequence ---
  useEffect(() => {
    if (phase !== "countdown") return;
    const seq = [3, 2, 1, "GO"];
    let i = 0;
    setCountdown(seq[i]);

    const iv = setInterval(() => {
      i += 1;
      if (i < seq.length) {
        setCountdown(seq[i]);
      } else {
        clearInterval(iv);
        setCountdown(null);
        setPhase("playing"); // enter gameplay
      }
    }, 700);

    return () => clearInterval(iv);
  }, [phase]);

  // --- Three.js setup / loop (re-inits when phase changes) ---
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Camera
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

    // Textures for game
    const loader = new THREE.TextureLoader();
    const gatorTex = loader.load("https://dzca54yadzmkj.cloudfront.net/gator-hunt/gator_idle.png");
    const gatorHitTex = loader.load("/gator_hit.png");
    const bgTex = loader.load("https://dzca54yadzmkj.cloudfront.net/gator-hunt/background.png");

    // Background
    const bgMat = new THREE.MeshBasicMaterial({ map: bgTex });
    const bgGeom = new THREE.PlaneGeometry(frustumHeight * aspect, frustumHeight);
    const bgMesh = new THREE.Mesh(bgGeom, bgMat);
    bgMesh.position.z = -50;
    scene.add(bgMesh);

    // Gators
    const activeGators = [];

    // Spawn logic (only runs in "playing")
    function spawnGator() {
      if (phase !== "playing") return;

      const width = 150;
      const height = 100;
      const mat = new THREE.MeshBasicMaterial({
        map: gatorTex,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mat);

      const fromLeft = Math.random() > 0.5;
      mesh.position.x = fromLeft
        ? -renderer.domElement.width / 2 - width
        : renderer.domElement.width / 2 + width;
      mesh.position.y = (Math.random() - 0.5) * frustumHeight * 0.5;

      if (fromLeft) mesh.scale.x = -1;

      mesh.userData = {
        direction: fromLeft ? 1 : -1,
        speed: 200,
        state: "idle",
        hitTimer: 0,
      };

      scene.add(mesh);
      activeGators.push(mesh);
    }

    // --- Dynamic spawn cadence (starts easy, ramps up) ---
    // replaces: const spawnInterval = phase === "playing" ? setInterval(spawnGator, 500) : null;
    let spawnInterval = null;

    if (phase === "playing") {
      // 1) spawn immediately so the game isn't empty at start
      spawnGator();

      // 2) schedule next spawns with a timeout that adjusts its own delay over time
      const initialMs   = 2000; // start at 2.0s
      const stepMs      = 200;  // decrease by 0.2s
      const stepEveryMs = 3000; // ...every 3s of gameplay
      const minMs       = 500;  // never go below 0.5s
      const t0 = performance.now();

      const scheduleNext = () => {
        const elapsed = performance.now() - t0;
        const steps   = Math.floor(elapsed / stepEveryMs);
        const delay   = Math.max(minMs, initialMs - steps * stepMs);

        spawnInterval = setTimeout(() => {
          spawnGator();     // spawn one
          scheduleNext();   // then schedule the next using the *current* delay
        }, delay);
      };

      scheduleNext();
    }
    // Click → Raycast
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (e) => {
      if (phase !== "playing") return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const hitsList = raycaster.intersectObjects(activeGators);
      if (hitsList.length) {
        const g = hitsList[0].object;
        if (g.userData.state !== "hit") {
          g.material.map = gatorHitTex;
          g.userData.state = "hit";
          g.userData.hitTimer = 0.5;
          setHits((h) => h + 1);
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // Animation loop
    function animate() {
      // Render background in any phase, but only update when playing
      const delta = 0.016;

      if (phase === "playing") {
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
            if (
              g.position.x < -renderer.domElement.width / 2 - 200 ||
              g.position.x > renderer.domElement.width / 2 + 200
            ) {
              scene.remove(g);
              activeGators.splice(i, 1);
              setMisses((m) => {
                const next = m + 1;
                if (next >= 3) {
                  setPhase("over");
                }
                return next;
              });
            }
          }
        }
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // Timer (only during playing)
    const timerInterval =
      phase === "playing"
        ? setInterval(() => {
            setElapsedTime((t) => t + 1);
          }, 1000)
        : null;

    // Cleanup
    return () => {
      if (spawnInterval) clearTimeout(spawnInterval);
      if (timerInterval) clearTimeout(timerInterval);
      cancelAnimationFrame(rafRef.current);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      activeGators.forEach((g) => scene.remove(g));
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [phase]);

  // Small helper: center HUD bar styles
  const hudBarStyle = {
    position: "absolute",
    top: 80, // adjust for your navbar height
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "1.5rem",
    background: "rgba(0,0,0,0.5)",
    padding: "6px 12px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    minWidth: "320px",
    textAlign: "center",
    zIndex: 2,
    fontFamily: "'Creepster', system-ui, sans-serif",
    letterSpacing: "0.5px",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Swampy font */}
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Three.js mount */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* START SCREEN (phase: ready) */}
      {phase === "ready" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            textAlign: "center",
            zIndex: 3,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Creepster', system-ui, sans-serif",
                fontSize: "4rem",
                lineHeight: 1,
                marginBottom: "0.5rem",
                letterSpacing: "2px",
              }}
            >
              GATOR HUNT
            </div>
            <div style={{ maxWidth: 520, margin: "0 auto", opacity: 0.95 }}>
              Click the gators before they escape! You only get 3 misses. Good luck out there in the swamp.
            </div>
            <button
              onClick={startGame}
              style={{
                marginTop: "1.25rem",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Creepster', system-ui, sans-serif",
                fontSize: "1.1rem",
                border: "none",
                borderRadius: "10px",
                background: "#2e7d32",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
            >
              ▶ Start Game
            </button>
          </div>
        </div>
      )}

      {/* COUNTDOWN (phase: countdown) */}
      {phase === "countdown" && countdown && (
        <>
          <div style={hudBarStyle}>
            ⏱️ {elapsedTime}s | 🐊 Hits: {hits} | ❌ Misses: {misses}/3
          </div>

          <div
            key={String(countdown)} // force re-animate per step
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              zIndex: 3,
              fontFamily: "'Creepster', system-ui, sans-serif",
              fontSize: countdown === "GO" ? "5rem" : "7rem",
              letterSpacing: "2px",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              animation: "pop 650ms ease forwards",
            }}
          >
            {countdown}
          </div>

          <style jsx>{`
            @keyframes pop {
              0% { opacity: 0; transform: scale(0.6); }
              50% { opacity: 1; transform: scale(1.05); }
              100% { opacity: 0.9; transform: scale(1); }
            }
          `}</style>
        </>
      )}

      {/* HUD while playing */}
      {phase === "playing" && (
        <div style={hudBarStyle}>
          ⏱️ {elapsedTime}s | 🐊 Hits: {hits} | ❌ Misses: {misses}/3
        </div>
      )}

      {/* GAME OVER overlay */}
      {phase === "over" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            textAlign: "center",
            zIndex: 3,
          }}
        >
          <div>
            <div
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "red",
                fontFamily: "'Creepster', system-ui, sans-serif",
                letterSpacing: "2px",
              }}
            >
              GAME OVER
            </div>
            <div style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "1rem" }}>
              Time: {elapsedTime}s • Hits: {hits} • Misses: {misses}/3
            </div>
            <button
              onClick={restartGame}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1.1rem",
                border: "none",
                borderRadius: "10px",
                background: "limegreen",
                color: "white",
                cursor: "pointer",
              }}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}