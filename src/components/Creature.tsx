import React from "react";

type Props = {
  expression?: "happy" | "sad" | "neutral";
  gazeDeg?: number;
  avert?: boolean;
  lookAt?: boolean;
  faceShiftX?: number;
};

function Eye({
  x, y, size = 36, gazeDeg = 215, sclera = true, pupil = { size: 12, orbit: 10 }, border = 4, z = 10,
}: {
  x: number;
  y: number;
  size?: number;
  gazeDeg?: number;
  sclera?: boolean;
  pupil?: { size: number; orbit: number };
  border?: number;
  z?: number;
}) {
  const wrap: React.CSSProperties = {
    position: "absolute", left: x, top: y, width: size, height: size, zIndex: z, pointerEvents: "none",
  };
  const ball: React.CSSProperties = {
    position: "absolute", inset: 0, borderRadius: "50%",
    background: sclera ? "#fff" : "transparent",
    border: sclera ? `${border}px solid #000` : "none"
  };
  const rotor: React.CSSProperties = {
    position: "absolute", left: "50%", top: "50%", width: size, height: size,
    transform: `translate(-50%,-50%) rotate(${gazeDeg}deg)`,
    transformOrigin: "50% 50%", transition: "transform .12s cubic-bezier(.83,0,.28,1)"
  };
  const dot: React.CSSProperties = {
    position: "absolute", left: "50%", top: "50%",
    width: pupil.size, height: pupil.size, background: "#000", borderRadius: "50%",
    transform: `translate(-50%,-50%) translateY(-${pupil.orbit}px)`
  };
  return (
    <div style={wrap}>
      <div style={ball} />
      <div style={rotor}><div style={dot} /></div>
    </div>
  );
}

// Double all the key values:
const CREATURES = {
  floorY: 600,
  purple: { w: 220, h: 550, l: 240 },
  black:  { w: 130, h: 410, l: 410 },
  yellow: { w: 190, h: 310, l: 504, r: 120 },
  orange: { w: 460, h: 260, l: 10, r: 480 },
};

export default function Creature({
  expression = "happy",
  gazeDeg = 215,
  avert = false,
  lookAt = false,
  faceShiftX = 0,
}: Props) {

  const container: React.CSSProperties = {
    position: "relative",
    width: 820, height: 660,
    transform: `rotate(${lookAt ? -8 : 0}deg)`,
    transition: "transform .22s cubic-bezier(.83,0,.28,1)"
  };

  const face: React.CSSProperties = {
    position: "absolute", inset: 0,
    transform: `translateX(${faceShiftX}px)`,
    transition: "transform .22s cubic-bezier(.83,0,.28,1)"
  };

  const purple: React.CSSProperties = {
    position: "absolute",
    left: CREATURES.purple.l,
    top: CREATURES.floorY - CREATURES.purple.h,
    width: CREATURES.purple.w,
    height: CREATURES.purple.h,
    background: "#6726c8ff",
    borderRadius: 0,
    zIndex: 1,
    transition: "all .18s cubic-bezier(.83,0,.28,1)"
  };
  const black: React.CSSProperties = {
    position: "absolute",
    left: CREATURES.black.l,
    top: CREATURES.floorY - CREATURES.black.h,
    width: CREATURES.black.w,
    height: CREATURES.black.h,
    background: "#000000ff",
    borderRadius: 0,
    zIndex: 3,
    transition: "all .18s cubic-bezier(.83,0,.28,1)"
  };
  const yellow: React.CSSProperties = {
    position: "absolute",
    left: CREATURES.yellow.l,
    top: CREATURES.floorY - CREATURES.yellow.h,
    width: CREATURES.yellow.w,
    height: CREATURES.yellow.h,
    background: "#ffd500ff",
    borderTopLeftRadius: CREATURES.yellow.r,
    borderTopRightRadius: CREATURES.yellow.r,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: 4,
    transition: "all .18s cubic-bezier(.83,0,.28,1)"
  };
  const orange: React.CSSProperties = {
    position: "absolute",
    left: CREATURES.orange.l,
    top: CREATURES.floorY - CREATURES.orange.h,
    width: CREATURES.orange.w,
    height: CREATURES.orange.h,
    background: "#ff872a",
    borderTopLeftRadius: CREATURES.orange.r,
    borderTopRightRadius: CREATURES.orange.r,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: 7,
    transition: "all .19s cubic-bezier(.83,0,.28,1)"
  };

  const mouthCommon = { background: "#222", zIndex: 12, position: "absolute" } as React.CSSProperties;
  const purpleMouth = {
    ...mouthCommon,
    width: 30, height: 8, left: 334, top: 110,
    borderRadius: 200,
    transform: expression === "sad"
      ? "scaleY(-1.1)" : expression === "happy"
      ? "scaleY(1)" : "scaleY(.88)",
    transition: "transform .2s"
  };
  const blackMouth = {
    ...mouthCommon,
    width: 28, height: 10, left: 466, top: 244,
    borderRadius: 16,
    transform: expression === "sad"
      ? "scaleY(-1.02)" : "scaleY(1)",
    transition: "transform .22s"
  };
  const orangeMouth = {
    ...mouthCommon,
    width: 42, height: 14, left: 120, top: 460,
    borderRadius: 200,
    transform: expression === "sad"
      ? "scaleY(-1.1)" : expression === "happy"
      ? "scaleY(1)" : "scaleY(.92)",
    transition: "transform .22s"
  };
  const yellowMouth = {
    ...mouthCommon,
    width: 84, height: 8, left: 496, top: 356,
    borderRadius: 24,
    transform: expression === "sad" ? "scaleY(-.98)" : "scaleY(1)"
  };

  return (
    <div style={container}>
      <div id="face" style={face}>
        <div style={purple}/>
        <div style={yellow}/>
        <div style={orange}/>
        <div style={black}/>
        {/* Eyes */}
        {/* Purple */}
        <Eye x={320} y={64}  size={26} gazeDeg={gazeDeg} sclera z={8}/>
        <Eye x={390} y={64}  size={26} gazeDeg={gazeDeg} sclera z={8}/>
        <div style={purpleMouth}/>
        {/* Black */}
        <Eye x={438} y={196} size={28} gazeDeg={gazeDeg} sclera z={11}/>
        <Eye x={484} y={196} size={28} gazeDeg={gazeDeg} sclera z={11}/>
        <div style={blackMouth} />
        {/* Yellow */}
        <Eye x={580} y={310} size={10} gazeDeg={gazeDeg} sclera={false} z={11}/>
        <div style={yellowMouth}/>
        {/* Orange */}
        <Eye x={120} y={416} size={28} gazeDeg={gazeDeg} sclera={false} z={12}/>
        <Eye x={166} y={416} size={28} gazeDeg={gazeDeg} sclera={false} z={12}/>
        <div style={orangeMouth}/>
      </div>
    </div>
  );
}
