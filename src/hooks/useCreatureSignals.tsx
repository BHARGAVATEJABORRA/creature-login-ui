import { useEffect, useState } from "react";

type Opts = {
  passwordEl: HTMLInputElement | null;
  submitEl: HTMLElement | null;
};

export function useCreatureSignals({ passwordEl, submitEl }: Opts) {
  // Matches the demo’s behavior
  const [gazeDeg, setGazeDeg] = useState<number>(215); // neutral/resting
  const [avert, setAvert] = useState<boolean>(false);  // true while password focused
  const [sad, setSad] = useState<boolean>(false);      // toggled by password validity at blur
  const [lookAt, setLookAt] = useState<boolean>(false); // tilt on submit hover
  const [faceShiftX, setFaceShiftX] = useState<number>(0); // slide face by 30px on focus

  // Pointer gaze when not focusing/invalidating password
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const pwdFocused = !!document.querySelector("#password:focus");
      const pwdInvalid = !!document.querySelector("#password:is(:user-invalid)");
      if (pwdFocused || pwdInvalid) return;

      // Aim toward pointer; bias origin to left third (where creatures sit)
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const cx = vw * 0.33;
      const cy = vh * 0.5;
      const rad = Math.atan2(e.pageY - cy, e.pageX - cx);
      const deg = (rad * (180 / Math.PI) * -1) + 180;
      setGazeDeg(deg);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Password focus/blur: avert + slide, then restore + sad check
  useEffect(() => {
    if (!passwordEl) return;

    function onFocus() {
      setAvert(true);
      setFaceShiftX(30);
      setGazeDeg(100); // look away
    }
    function onBlur(this: HTMLInputElement) {
      setAvert(false);
      setFaceShiftX(0);
      setSad(!this.checkValidity());
      setGazeDeg(215); // resting neutral
    }

    passwordEl.addEventListener("focus", onFocus);
    passwordEl.addEventListener("blur", onBlur);
    return () => {
      passwordEl.removeEventListener("focus", onFocus);
      passwordEl.removeEventListener("blur", onBlur);
    };
  }, [passwordEl]);

  // Submit hover toggles a gentle tilt
  useEffect(() => {
    if (!submitEl) return;
    const onOver = () => setLookAt(true);
    const onOut = () => setLookAt(false);
    submitEl.addEventListener("mouseenter", onOver);
    submitEl.addEventListener("mouseleave", onOut);
    return () => {
      submitEl.removeEventListener("mouseenter", onOver);
      submitEl.removeEventListener("mouseleave", onOut);
    };
  }, [submitEl]);

  return { gazeDeg, avert, sad, lookAt, faceShiftX };
}
