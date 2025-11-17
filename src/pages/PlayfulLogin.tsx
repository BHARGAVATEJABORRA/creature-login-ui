// src/pages/PlayfulLogin.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { LuEyeClosed } from "react-icons/lu";
import Creature from "../components/Creature";
import { useGaze } from "../hooks/useGaze";

export default function PlayfulLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [gazeDeg, setGazeDeg] = useState(215);
  const [lookAtButton, setLookAtButton] = useState(false);

  // Individual creature states
  const [purpleExp, setPurpleExp] = useState<"happy" | "sad" | "neutral" | "wow" | "shocked" | "awful">("neutral");
  const [blackExp, setBlackExp] = useState<"happy" | "sad" | "neutral" | "wow" | "shocked" | "awful">("neutral");
  const [yellowMouth, setYellowMouth] = useState<"bar" | "wave" | "vertical">("bar");
  const [orangeMouth, setOrangeMouth] = useState<"round" | "bar" | "sad" | "happy" | "triangle" | "wow">("happy");
  const [orangeEye, setOrangeEye] = useState<"round" | "closed" | "smiling">("round");

  const prefersReducedMotion = useReducedMotion();
  const passwordEyePupilRef = useRef<SVGCircleElement>(null);
  useGaze({ ref: passwordEyePupilRef });
  const eyeSvgRef = useRef<SVGSVGElement>(null);
  const [pupil, setPupil] = useState({ dx: 0, dy: 0 });

  // Eye pupil tracking for password field
  useEffect(() => {
    const svg = eyeSvgRef.current;
    if (!svg) return;
    const rx = 7.8, ry = 4.8, margin = 0.1, pupilRadius = 0.1;
    let raf = 0;

    function onMove(e: MouseEvent) {
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dxs = e.clientX - cx, dys = e.clientY - cy;
      const angle = Math.atan2(dys, dxs);
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const rMax = (rx * ry) / Math.sqrt((ry * cos) ** 2 + (rx * sin) ** 2);
      const r = Math.max(0, rMax - (margin + pupilRadius));
      const dx = r * cos, dy = r * sin;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPupil({ dx, dy }));
    }
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // Eye gaze tracking
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (passwordFocused) return;
      const width = window.innerWidth * 0.65;
      const x = Math.min(Math.max(e.clientX, width * 0.1), width * 0.95);
      const center = width / 2;
      const gaze = 215 + ((x - center) / (width / 2)) * 70;
      setGazeDeg(gaze);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [passwordFocused]);

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
    setPurpleExp("neutral");
    setBlackExp("neutral");
    setOrangeMouth("happy");
    setOrangeEye("round");
    setYellowMouth("bar");
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
    setGazeDeg(100);
    
    if (password.length === 0) {
      setPurpleExp("sad");
      setBlackExp("neutral");
      setOrangeMouth("sad");
      setOrangeEye("round");
      setYellowMouth("wave");
    }
  };

  const handleBlur = () => {
    setPasswordFocused(false);
    setEmailFocused(false);
    setGazeDeg(215);
    
    if (!password || password.length < 3) {
      setPurpleExp("sad");
      setBlackExp("neutral");
      setOrangeMouth("sad");
      setOrangeEye("round");
      setYellowMouth("bar");
    } else {
      setPurpleExp("neutral");
      setBlackExp("neutral");
      setOrangeMouth("happy");
      setOrangeEye("smiling");
      setYellowMouth("bar");
    }
  };

  // Update creatures based on password strength
  useEffect(() => {
    if (passwordFocused) {
      if (password.length === 0) {
        setPurpleExp("sad");
        setBlackExp("neutral");
        setOrangeMouth("sad");
        setOrangeEye("round");
        setYellowMouth("wave");
      } else if (password.length < 8) {
        setPurpleExp("sad");
        setBlackExp("neutral");
        setOrangeMouth("sad");
        setOrangeEye("round");
        setYellowMouth("wave");
      } else {
        setPurpleExp("neutral");
        setBlackExp("happy");
        setOrangeMouth("happy");
        setOrangeEye("smiling");
        setYellowMouth("bar");
      }
    }
  }, [password, passwordFocused]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[65%] flex items-center justify-center bg-gray-100 overflow-visible border-r border-gray-300">
        <Creature 
          gazeDeg={gazeDeg}
          emailFocused={emailFocused}
          passwordFocused={passwordFocused}
          lookAtButton={lookAtButton}
          purpleExpression={purpleExp}
          blackExpression={blackExp}
          yellowMouth={yellowMouth}
          orangeMouth={orangeMouth}
          orangeEye={orangeEye}
        />
      </div>
      <div className="w-[35%] min-w-[420px] flex items-center justify-center bg-white px-8 rounded-r-[40px]">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ rotate: 0, scale: 0.85, opacity: 0 }} 
              animate={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: 1, rotate: 360 }} 
              transition={{ duration: prefersReducedMotion ? 0.5 : 1.2, ease: prefersReducedMotion ? "easeOut" : "easeInOut" }} 
              aria-hidden="true"
            >
              <FaReact size={44} className="text-sky-500" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-extrabold text-center mb-1 text-black">Welcome back!</h1>
          <p className="text-black font-bold text-center mb-10 text-sm">Please enter your details</p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onFocus={handleEmailFocus} 
                onBlur={handleBlur} 
                className="w-full px-0 py-2.5 border-b-2 border-black focus:border-black bg-transparent outline-none transition-all peer text-black font-bold" 
                placeholder=" " 
              />
              <label className={`absolute left-0 transition-all duration-200 pointer-events-none font-bold text-black ${emailFocused || email ? "-top-5 text-xs" : "top-2.5 text-sm"}`}>
                Email
              </label>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={handlePasswordFocus} 
                onBlur={handleBlur} 
                className="w-full px-0 py-2.5 pr-12 border-b-2 border-black focus:border-black bg-transparent outline-none transition-all peer text-black font-bold" 
                placeholder=" " 
              />
              <label className={`absolute left-0 transition-all duration-200 pointer-events-none font-bold text-black ${passwordFocused || password ? "-top-5 text-xs" : "top-2.5 text-sm"}`}>
                Password
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 transition-opacity" 
                aria-label="Toggle password visibility"
              >
                {!showPassword ? (
                  <svg ref={eyeSvgRef} width="30" height="30" viewBox="0 0 30 30" className="text-black">
                    <defs><mask id="mask-no-center" maskUnits="userSpaceOnUse"><rect x="0" y="0" width="30" height="30" fill="white" /><circle cx="15" cy="15" r="4.4" fill="black" /></mask></defs>
                    <g mask="url(#mask-no-center)"><RxEyeOpen size={30} color="currentColor" /></g>
                    <circle ref={passwordEyePupilRef} cx={15 + pupil.dx} cy={15 + pupil.dy} r={3.0} fill="currentColor" />
                  </svg>
                ) : (<LuEyeClosed size={30} className="text-black" />)}
              </button>
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-black font-bold cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-2 border-black text-black focus:ring-0 cursor-pointer" />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="text-gray-500 font-medium hover:text-gray-700 transition-colors">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              onMouseEnter={() => setLookAtButton(true)} 
              onMouseLeave={() => setLookAtButton(false)} 
              className="w-full bg-black text-white py-3 rounded-xl font-extrabold text-base hover:bg-gray-800 active:scale-[0.98] transition-all shadow-md mt-6"
            >
              Log in
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-black font-bold hover:bg-gray-50 active:scale-[0.98] transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#145bcdff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#2bb951ff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#ffca2dff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ff1500ff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-black">Log in with Google</span>
            </button>
            <p className="text-center text-sm text-gray-600 font-medium pt-10">Don&apos;t have an account? <a href="#" className="text-gray-700 font-semibold hover:underline underline-offset-4 transition-all">Sign Up</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}
