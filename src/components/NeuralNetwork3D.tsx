/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Activity, Radio, Cpu, Network } from "lucide-react";

interface NodeItem {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  mesh: THREE.Mesh;
  id: number;
  connections: number[];
  baseScale: number;
}

interface SignalPacket {
  startNodeId: number;
  endNodeId: number;
  progress: number; // 0 to 1
  speed: number;
  mesh: THREE.Mesh;
}

export default function NeuralNetwork3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live diagnostic counts for our HUD Overlay
  const [activeNodes, setActiveNodes] = useState(60);
  const [activeLinks, setActiveLinks] = useState(0);
  const [packetsRouted, setPacketsRouted] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Smooth fog so particles fade out beautifully in the distance
    scene.fog = THREE.FogExp2 ? new THREE.FogExp2(0x050816, 0.015) : null;

    // --- Camera Setup ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 75;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Geometries & Materials ---
    // High-performance low-poly geometries for smooth framerates
    const nodeGeom = new THREE.IcosahedronGeometry(0.5, 0); 
    const coreHubGeom = new THREE.IcosahedronGeometry(1.0, 1);
    
    // Distinct material tones matching Shakil's palette
    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd1,
      transparent: true,
      opacity: 0.8
    });

    const blueMat = new THREE.MeshBasicMaterial({
      color: 0x0a84ff,
      transparent: true,
      opacity: 0.8
    });

    const goldMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.95
    });

    const packetGeom = new THREE.SphereGeometry(0.35, 4, 4);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0
    });

    // --- Initialize Nodes ---
    const totalNodesCount = 65;
    const nodes: NodeItem[] = [];
    const boundingSize = { x: 90, y: 55, z: 50 };

    for (let i = 0; i < totalNodesCount; i++) {
      // Alternate sizes: make 6 key nodes "Hub Controllers" with orbiting helper lines
      const isHub = i < 6;
      const x = (Math.random() - 0.5) * boundingSize.x;
      const y = (Math.random() - 0.5) * boundingSize.y;
      const z = (Math.random() - 0.5) * boundingSize.z;

      const pos = new THREE.Vector3(x, y, z);
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );

      // Create Mesh object
      const mesh = new THREE.Mesh(
        isHub ? coreHubGeom : nodeGeom,
        isHub ? goldMat : (Math.random() > 0.5 ? cyanMat : blueMat)
      );
      mesh.position.copy(pos);
      
      // If it is a hub node, add a subtle orbit wireframe ring around it
      if (isHub) {
        const ringGeom = new THREE.RingGeometry(2.2, 2.3, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x00ffd1,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.25
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.random() * Math.PI;
        ringMesh.rotation.y = Math.random() * Math.PI;
        // Connect to mesh as helper child
        mesh.add(ringMesh);
      }

      scene.add(mesh);

      nodes.push({
        pos,
        vel,
        mesh,
        id: i,
        connections: [],
        baseScale: isHub ? 1.0 : 0.6 + Math.random() * 0.5
      });
    }

    // --- Build Lines Segment Buffer (High Performance WebGL rendering method) ---
    const maxConnectionsPossible = 300;
    // Every connection line has 2 vertices (start, end). Each vertex has 3 float coords (x,y,z).
    const linePositions = new Float32Array(maxConnectionsPossible * 2 * 3);
    const lineColors = new Float32Array(maxConnectionsPossible * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // --- Signal Packets Pool ---
    let packets: SignalPacket[] = [];
    const maxPacketsCount = 8;
    let localPacketsCount = 0;

    // Helper functions to find connected nodes
    const getConnectedNodes = (nodeId: number): number[] => {
      return nodes[nodeId].connections;
    };

    // --- Mouse Parallax Motion ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Map to -1 to +1 normalized coordinate system
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Responsive Scaling Observer ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Core Cycle/Frame Update Loop ---
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const dt = Math.min(clock.getDelta(), 0.1); // clamp delta to prevent physics explosion

      // 1. Move Node Positions (Brownian noise style physics with bound wrapping)
      for (const node of nodes) {
        node.pos.add(node.vel);

        // Gentle friction/accel drift back toward center if drifting too far off boundary matrix
        if (Math.abs(node.pos.x) > boundingSize.x / 2 + 5) node.vel.x *= -1;
        if (Math.abs(node.pos.y) > boundingSize.y / 2 + 5) node.vel.y *= -1;
        if (Math.abs(node.pos.z) > boundingSize.z / 2 + 5) node.vel.z *= -1;

        // Apply updated absolute coordinate state back to real WebGL Mesh
        node.mesh.position.copy(node.pos);

        // Spin node children elements (orbiter line rings on our Hubs)
        if (node.mesh.children.length > 0) {
          node.mesh.children.forEach(child => {
            child.rotation.z += 0.015;
            child.rotation.y += 0.008;
          });
        }
      }

      // 2. Re-calculate Connection Matrix every frame based on relative distance thresholds
      let activeLineCount = 0;
      const linePosArr = lineGeometry.attributes.position.array as Float32Array;
      const lineColArr = lineGeometry.attributes.color.array as Float32Array;

      // Reset individual node connection buffers
      for (const node of nodes) {
        node.connections = [];
      }

      const connectionMaxDist = 18.0;

      for (let i = 0; i < totalNodesCount; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < totalNodesCount; j++) {
          const nodeB = nodes[j];
          const dist = nodeA.pos.distanceTo(nodeB.pos);

          if (dist < connectionMaxDist && activeLineCount < maxConnectionsPossible) {
            // Draw connecting web vector line
            nodeA.connections.push(j);
            nodeB.connections.push(i);

            const indexValue = activeLineCount * 6;

            // Start coordinates
            linePosArr[indexValue] = nodeA.pos.x;
            linePosArr[indexValue + 1] = nodeA.pos.y;
            linePosArr[indexValue + 2] = nodeA.pos.z;

            // End coordinates
            linePosArr[indexValue + 3] = nodeB.pos.x;
            linePosArr[indexValue + 4] = nodeB.pos.y;
            linePosArr[indexValue + 5] = nodeB.pos.z;

            // Compute distance intensity ratio for color luminance fading (closer nodes = brighter line edge)
            const strengthOpacity = 1.0 - (dist / connectionMaxDist);
            
            // Choose cyan color for standard nodes, and warmer cyber golden color for hub paths
            const isHubConnection = i < 6 || j < 6;
            const r = isHubConnection ? 0.9 : 0.0;
            const g = isHubConnection ? 0.75 : 0.85;
            const b = isHubConnection ? 0.1 : 0.95;

            // Start vertex colors
            lineColArr[indexValue] = r * strengthOpacity;
            lineColArr[indexValue + 1] = g * strengthOpacity;
            lineColArr[indexValue + 2] = b * strengthOpacity;

            // End vertex colors
            lineColArr[indexValue + 3] = r * strengthOpacity;
            lineColArr[indexValue + 4] = g * strengthOpacity;
            lineColArr[indexValue + 5] = b * strengthOpacity;

            activeLineCount++;
          }
        }
      }

      // Flag geometry structures as updated
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, activeLineCount * 2);

      // 3. Process Live Data Signal Packets propagating along paths
      // Spawn new packet if below ceiling and we have active connections on grid
      if (packets.length < maxPacketsCount && activeLineCount > 0 && Math.random() < 0.05) {
        // Pick random starting node that possesses mapped edges
        const validStarterNodes = nodes.filter(n => n.connections.length > 0);
        if (validStarterNodes.length > 0) {
          const startNode = validStarterNodes[Math.floor(Math.random() * validStarterNodes.length)];
          const endNodeId = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];

          // Fabricate 3D glowing sphere representational mesh
          const pMesh = new THREE.Mesh(packetGeom, packetMat);
          pMesh.position.copy(startNode.pos);
          scene.add(pMesh);

          packets.push({
            startNodeId: startNode.id,
            endNodeId: endNodeId,
            progress: 0,
            speed: 0.85 + Math.random() * 1.5, // units progress velocity
            mesh: pMesh
          });
        }
      }

      // Render and tick existing packets
      const activePackets: SignalPacket[] = [];
      for (const packet of packets) {
        packet.progress += packet.speed * dt;

        if (packet.progress >= 1.0) {
          // Destory mesh element, count in cumulative router HUD index
          scene.remove(packet.mesh);
          packet.mesh.geometry.dispose();
          localPacketsCount++;
          if (localPacketsCount % 3 === 0) {
            setPacketsRouted(prev => prev + 1);
          }
        } else {
          // Slide along current vectors interpolate points
          const startVec = nodes[packet.startNodeId].pos;
          const endVec = nodes[packet.endNodeId].pos;
          packet.mesh.position.lerpVectors(startVec, endVec, packet.progress);
          
          // Add rhythmic pulse scaling
          const wavePulse = 1.0 + Math.sin(packet.progress * Math.PI) * 1.2;
          packet.mesh.scale.set(wavePulse, wavePulse, wavePulse);

          activePackets.push(packet);
        }
      }
      packets = activePackets;

      // 4. Smooth Parallax Orbit and Camera damping
      targetCameraX = mouseX * 22;
      targetCameraY = mouseY * 15;

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;

      // Rotate entire node scene matrix slowly
      scene.rotation.y += 0.0012;
      scene.rotation.x += 0.0004;

      renderer.render(scene, camera);

      // Fast, raw React state throttling so we don't trigger heavy re-renders
      if (Math.random() < 0.15) {
        setActiveLinks(activeLineCount);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // --- Cleanup resources ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose scene elements and meshes to prevent memory pooling/vRAM leaks
      nodes.forEach(n => {
        n.mesh.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        n.mesh.geometry.dispose();
        if (Array.isArray(n.mesh.material)) {
          n.mesh.material.forEach(m => m.dispose());
        } else {
          n.mesh.material.dispose();
        }
      });

      packets.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach(m => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });

      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full min-h-[300px] overflow-hidden rounded-xl bg-slate-950/20 border border-cyan-500/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] select-none pointer-events-none"
    >
      {/* Absolute Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-65 md:opacity-85 mix-blend-screen" 
      />

      {/* Cybernetic HUD Micro Stats Grid Overlay */}
      <div className="absolute top-3 left-4 flex gap-6 text-[8px] tracking-wider font-mono text-cyan-500/50 uppercase select-none">
        <div className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Nodes: <span className="text-cyan-300 font-bold">{activeNodes}</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-teal-400" />
          <span>Paths: <span className="text-teal-300 font-bold">{activeLinks}</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>Routed: <span className="text-slate-100 font-bold">{packetsRouted} kb/s</span></span>
        </div>
      </div>

      {/* Subtle bottom scanline animation overlays */}
      <div className="absolute bottom-3 right-4 text-[7px] font-mono text-cyan-500/20 uppercase tracking-widest">
        <span>3D_NEURAL_SOLVER // VER: 4.5.12</span>
      </div>
    </div>
  );
}
