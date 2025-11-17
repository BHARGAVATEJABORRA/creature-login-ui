// src/components/Creature.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Expression = "happy" | "sad" | "neutral" | "wow" | "shocked" | "awful";
type YellowMouth = "bar" | "wave" | "vertical";
type OrangeMouth = "round" | "bar" | "sad" | "happy" | "triangle" | "wow";
type OrangeEye = "round" | "closed" | "smiling";

type Props = {
  expression?: Expression;
  gazeDeg?: number;
  faceShiftX?: number;
  emailFocused?: boolean;
  passwordFocused?: boolean;
  lookAtButton?: boolean;
  purpleExpression?: Expression;
  blackExpression?: Expression;
  yellowMouth?: YellowMouth;
  orangeMouth?: OrangeMouth;
  orangeEye?: OrangeEye;
};

function Eye({
  x,
  y,
  size = 36,
  gazeDeg = 215,
  sclera = true,
  pupil = { size: 12, orbit: 10 },
  border = 4,
  z = 10,
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
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: z,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: sclera ? "#fff" : "transparent",
          border: sclera ? `${border}px solid #000` : "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          transform: `translate(-50%,-50%) rotate(${gazeDeg}deg)`,
          transformOrigin: "50% 50%",
          transition: "transform .15s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: pupil.size,
            height: pupil.size,
            background: "#000",
            borderRadius: "50%",
            transform: `translate(-50%,-50%) translateY(-${pupil.orbit}px)`,
          }}
        />
      </div>
    </div>
  );
}

function OrangeEye({
  x,
  y,
  type = "round",
  gazeDeg,
}: {
  x: number;
  y: number;
  type: OrangeEye;
  gazeDeg: number;
}) {
  if (type === "closed") {
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y + 12,
          width: 28,
          height: 4,
          background: "#000",
          borderRadius: "2px",
          zIndex: 2,
        }}
      />
    );
  }
  if (type === "smiling") {
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y + 8,
          width: 28,
          height: 14,
          borderBottom: "4px solid #000",
          borderRadius: "0 0 50% 50%",
          zIndex: 2,
        }}
      />
    );
  }
  return (
    <Eye
      x={x}
      y={y}
      size={28}
      gazeDeg={gazeDeg}
      sclera={false}
      pupil={{ size: 28, orbit: 0 }}
      z={2}
    />
  );
}

const CREATURES = {
  floorY: 600,
  purple: { w: 220, h: 550, l: 240 },
  black: { w: 130, h: 410, l: 410 },
  yellow: { w: 190, h: 310, l: 504 },
  orange: { w: 460, h: 260, l: 10 },
};

export default function Creature({
  expression = "happy",
  gazeDeg = 215,
  faceShiftX = 0,
  emailFocused = false,
  passwordFocused = false,
  lookAtButton = false,
  purpleExpression,
  blackExpression,
  yellowMouth = "bar",
  orangeMouth = "bar",
  orangeEye = "round",
}: Props) {
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const purpleMouthRef = useRef<HTMLDivElement>(null);
  const blackMouthRef = useRef<HTMLDivElement>(null);
  const yellowMouthRef = useRef<HTMLDivElement>(null);
  const orangeMouthRef = useRef<HTMLDivElement>(null);

  const purpleLineRef = useRef<HTMLDivElement>(null);
  const blackLineRef = useRef<HTMLDivElement>(null);
  const yellowLineRef = useRef<HTMLDivElement>(null);
  const orangeLineRef = useRef<HTMLDivElement>(null);

  const purpleExp = purpleExpression || expression;
  const blackExp = blackExpression || expression;

  // ENHANCED ENTRANCE ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        blackRef.current,
        {
          x: 170,
          y: -850,
          width: 180,
          height: 90,
          rotation: 180,
          borderRadius: "12%",
          scale: 0.5,
          transformOrigin: "top center",
          opacity: 1,
        },
        {
          x: 0,
          y: 0,
          width: 130,
          height: 410,
          rotation: 0,
          borderRadius: "0%",
          scale: 1,
          transformOrigin: "center center",
          duration: 2.2,
          ease: "elastic.out(1, 0.5)",
        },
        0
      );

      tl.fromTo(
        purpleRef.current,
        {
          x: -120,
          y: -40,
          width: 200,
          height: 200,
          rotation: -45,
          borderRadius: "8%",
          scale: 0.7,
          transformOrigin: "center center",
          opacity: 1,
        },
        {
          x: 0,
          y: 0,
          width: 220,
          height: 550,
          rotation: 0,
          borderRadius: "0%",
          scale: 1,
          transformOrigin: "center bottom",
          duration: 2.0,
          ease: "elastic.out(1, 0.6)",
        },
        0.15
      );

      tl.fromTo(
        orangeRef.current,
        {
          x: -450,
          y: 180,
          width: 80,
          height: 35,
          borderRadius: "40px",
          scale: 0.6,
          rotation: -180,
          opacity: 1,
        },
        {
          x: 0,
          y: 0,
          width: 460,
          height: 260,
          borderRadius: "480px 480px 0 0",
          scale: 1,
          rotation: 0,
          duration: 2.1,
          ease: "back.out(1.4)",
        },
        0.25
      );

      tl.fromTo(
        yellowRef.current,
        {
          x: 420,
          y: 140,
          width: 100,
          height: 100,
          borderRadius: "50px 50px 0 0",
          scale: 0.3,
          opacity: 0.5,
        },
        {
          x: 0,
          y: 0,
          width: 190,
          height: 310,
          borderRadius: "120px 120px 0 0",
          scale: 1,
          opacity: 1,
          duration: 1.9,
          ease: "back.out(1.7)",
        },
        0.35
      );

      tl.fromTo(
        [purpleLineRef.current, blackLineRef.current, yellowLineRef.current, orangeLineRef.current],
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, duration: 1.0, stagger: 0.08, ease: "expo.out" },
        1.4
      );
    });

    return () => ctx.revert();
  }, []);

  // BODY BENDING - ORANGE FIXED (NO SKEW)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (emailFocused) {
        gsap.to(purpleRef.current, {
          skewX: -4,
          x: -12,
          scaleY: 1.02,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        gsap.to(blackRef.current, {
          skewX: -3,
          x: -8,
          scaleY: 1.015,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        gsap.to(yellowRef.current, {
          skewX: -2,
          x: -5,
          scaleY: 1.01,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        // ORANGE - NO SKEW, ONLY SLIDE
        gsap.to(orangeRef.current, {
          x: -3,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      } else if (passwordFocused) {
        gsap.to(purpleRef.current, {
          skewX: 5,
          x: 14,
          scaleY: 1.03,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        gsap.to(blackRef.current, {
          skewX: 4,
          x: 10,
          scaleY: 1.02,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        gsap.to(yellowRef.current, {
          skewX: 3,
          x: 7,
          scaleY: 1.015,
          transformOrigin: "center bottom",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        // ORANGE - NO SKEW, ONLY SLIDE
        gsap.to(orangeRef.current, {
          x: 4,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      } else {
        gsap.to([purpleRef.current, blackRef.current, yellowRef.current, orangeRef.current], {
          skewX: 0,
          x: 0,
          scaleY: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });
    return () => ctx.revert();
  }, [emailFocused, passwordFocused]);

  // YELLOW MOUTH WAVE
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (yellowMouth === "wave") {
        gsap.to(yellowMouthRef.current, {
          rotation: 10,
          yoyo: true,
          repeat: -1,
          duration: 0.6,
          ease: "sine.inOut",
        });
      } else if (yellowMouth === "vertical") {
        gsap.to(yellowMouthRef.current, {
          rotation: 90,
          duration: 0.5,
          ease: "back.out(1.5)",
        });
      } else {
        gsap.to(yellowMouthRef.current, {
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
        });
      }
    });
    return () => ctx.revert();
  }, [yellowMouth]);

  // BUTTON HOVER TILT
  useEffect(() => {
    gsap.to(containerRef.current, {
      rotation: lookAtButton ? -4 : 0,
      duration: 0.7,
      ease: "power2.out",
    });
  }, [lookAtButton]);

  const getPurpleMouth = () => {
    const base = {
      background: "#222",
      position: "absolute" as const,
      left: 94,
      top: 60,
      zIndex: 2,
      transition: "all .4s cubic-bezier(.34,1.56,.64,1)",
    };
    switch (purpleExp) {
      case "happy":
        return { ...base, width: 30, height: 8, borderRadius: 200, transform: "scaleY(1.1)" };
      case "sad":
        return { ...base, width: 30, height: 8, borderRadius: 200, transform: "scaleY(-1.2)" };
      case "wow":
        return { ...base, width: 24, height: 24, borderRadius: "50%", left: 98, top: 58 };
      case "shocked":
        return { ...base, width: 28, height: 32, borderRadius: "50%", left: 96, top: 56 };
      case "awful":
        return {
          ...base,
          width: 35,
          height: 6,
          borderRadius: 200,
          transform: "scaleY(-1.4) scaleX(1.3)",
        };
      default:
        return { ...base, width: 30, height: 8, borderRadius: 200, transform: "scaleY(.9)" };
    }
  };

  const getBlackMouth = () => {
    const base = {
      background: "#fff",
      position: "absolute" as const,
      left: 56,
      top: 54,
      zIndex: 2,
      transition: "all .4s cubic-bezier(.34,1.56,.64,1)",
    };
    switch (blackExp) {
      case "happy":
        return { ...base, width: 28, height: 10, borderRadius: 16, transform: "scaleY(1.1)" };
      case "sad":
        return { ...base, width: 28, height: 10, borderRadius: 16, transform: "scaleY(-1.1)" };
      case "wow":
        return { ...base, width: 20, height: 20, borderRadius: "50%", left: 60, top: 52 };
      default:
        return { ...base, width: 28, height: 10, borderRadius: 16, transform: "scaleY(.9)" };
    }
  };

  const getOrangeMouth = () => {
    const base = {
      background: "#222",
      position: "absolute" as const,
      zIndex: 2,
      transition: "all .5s cubic-bezier(.34,1.56,.64,1)",
    };
    switch (orangeMouth) {
      case "round":
        return { ...base, width: 32, height: 32, borderRadius: "50%", left: 115, top: 116 };
      case "bar":
        return { ...base, width: 42, height: 14, borderRadius: 200, left: 110, top: 120 };
      case "sad":
        return {
          ...base,
          width: 42,
          height: 14,
          borderRadius: 200,
          left: 110,
          top: 120,
          transform: "scaleY(-1.1)",
        };
      case "happy":
        return {
          ...base,
          width: 42,
          height: 14,
          borderRadius: 200,
          left: 110,
          top: 120,
          transform: "scaleY(1.3)",
        };
      case "triangle":
        return {
          ...base,
          width: 0,
          height: 0,
          borderLeft: "16px solid transparent",
          borderRight: "16px solid transparent",
          borderBottom: "20px solid #222",
          left: 125,
          top: 116,
          background: "transparent",
        };
      case "wow":
        return { ...base, width: 28, height: 36, borderRadius: "50%", left: 117, top: 114 };
      default:
        return { ...base, width: 42, height: 14, borderRadius: 200, left: 110, top: 120 };
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: 820, height: 660, overflow: "visible" }}
    >
      {/* Purple Creature */}
      <div
        ref={purpleRef}
        style={{
          position: "absolute",
          left: 240,
          top: 50,
          width: 220,
          height: 550,
          background: "#672afa",
          zIndex: 1,
          transformOrigin: "center bottom",
        }}
      >
        <Eye x={80} y={14} size={19} gazeDeg={gazeDeg} sclera pupil={{ size: 8, orbit: 7 }} border={3} z={2} />
        <Eye x={150} y={14} size={19} gazeDeg={gazeDeg} sclera pupil={{ size: 8, orbit: 7 }} border={3} z={2} />
        <div ref={purpleMouthRef} style={getPurpleMouth()} />
      </div>

      {/* Black Creature */}
      <div
        ref={blackRef}
        style={{
          position: "absolute",
          left: 410,
          top: 190,
          width: 130,
          height: 410,
          background: "#1b1d21",
          zIndex: 3,
          transformOrigin: "center bottom",
        }}
      >
        <Eye x={28} y={6} size={28} gazeDeg={gazeDeg} sclera pupil={{ size: 14, orbit: 10 }} border={4} z={2} />
        <Eye x={74} y={6} size={28} gazeDeg={gazeDeg} sclera pupil={{ size: 14, orbit: 10 }} border={4} z={2} />
        <div ref={blackMouthRef} style={getBlackMouth()} />
      </div>

      {/* Yellow Creature */}
      <div
        ref={yellowRef}
        style={{
          position: "absolute",
          left: 504,
          top: 290,
          width: 190,
          height: 310,
          background: "#ffd500ff",
          borderRadius: "120px 120px 0 0",
          zIndex: 4,
          transformOrigin: "center bottom",
        }}
      >
        <Eye x={76} y={20} size={10} gazeDeg={gazeDeg} sclera={false} pupil={{ size: 10, orbit: 0 }} z={2} />
        <div
          ref={yellowMouthRef}
          style={{
            position: "absolute",
            left: -8,
            top: 66,
            width: 84,
            height: 8,
            background: "#222",
            borderRadius: 24,
            transformOrigin: "center center",
            zIndex: 2,
          }}
        />
      </div>

      {/* Orange Creature - FIXED NO SKEW */}
      <div
        ref={orangeRef}
        style={{
          position: "absolute",
          left: 10,
          top: 340,
          width: 460,
          height: 260,
          background: "#f0a026",
          borderRadius: "480px 480px 0 0",
          zIndex: 7,
        }}
      >
        <OrangeEye x={110} y={76} type={orangeEye} gazeDeg={gazeDeg} />
        <OrangeEye x={156} y={76} type={orangeEye} gazeDeg={gazeDeg} />
        <div ref={orangeMouthRef} style={getOrangeMouth()} />
      </div>

      {/* Ground Lines */}
      <div
        ref={purpleLineRef}
        style={{
          position: "absolute",
          top: CREATURES.floorY,
          left: 240,
          width: 220,
          height: "2px",
          background: "#555",
          zIndex: 20,
        }}
      />
      <div
        ref={blackLineRef}
        style={{
          position: "absolute",
          top: CREATURES.floorY,
          left: 410,
          width: 130,
          height: "2px",
          background: "#555",
          zIndex: 20,
        }}
      />
      <div
        ref={yellowLineRef}
        style={{
          position: "absolute",
          top: CREATURES.floorY,
          left: 504,
          width: 190,
          height: "2px",
          background: "#555",
          zIndex: 20,
        }}
      />
      <div
        ref={orangeLineRef}
        style={{
          position: "absolute",
          top: CREATURES.floorY,
          left: 10,
          width: 460,
          height: "2px",
          background: "#555",
          zIndex: 20,
        }}
      />
    </div>
  );
}
