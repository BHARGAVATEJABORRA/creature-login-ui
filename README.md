# 🎭 Creature Login UI


![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![GSAP](https://img.shields.io/badge/GSAP-3.13-green) ![Progress](https://img.shields.io/badge/progress-68%25-orange)

**🔗 Live Demo:** [GitHub Pages](https://bhargavatejaborra.github.io/creature-login-ui/)

---
 
## What It Is

A React login page where 4 animated creatures watch you type. Their eyes follow your mouse, they lean toward the input field you're typing in, and they react to your password strength.

**Built with:** React 18, TypeScript, GSAP, Framer Motion, Tailwind CSS

---

## Features

### ✅ What Works (68% Complete)
- 🎬 Creatures bounce in on page load
- 👁️ Eyes follow your mouse cursor
- 🎯 Creatures lean left/right based on which input you're focused on
- 🔒 Creatures change expressions based on password length (sad → neutral → happy)
- ⚡ Smooth 60fps animations

### 🚧 What's Missing
- No celebration animation when you click "Log in"
- No error animation for wrong credentials
- No backend (frontend only)
- Mobile responsiveness not tested
- Yellow creature mouth wave animation feels stiff

---

## Quick Start

```bash
git clone https://github.com/BHARGAVATEJABORRA/creature-login-ui.git
cd creature-login-ui
npm install
npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
src/
├── components/
│   └── Creature.tsx        # 675 lines - All 4 creatures & animations
├── pages/
│   └── PlayfulLogin.tsx    # 242 lines - Form & layout
├── hooks/
│   ├── useGaze.ts          # Eye tracking logic
│   └── useIconCursor.tsx   # Password eye icon pupil
└── App.tsx
```

---

## Key Issues Fixed

### Orange Creature Eye Glitch (SOLVED)
**Problem:** Orange creature's eyes stretched when it leaned  
**Fix:** Removed `skewX` transform, used only horizontal translation  
**Why:** Wide flat shapes + skew = distorted children

---

## What's Next

### This Week
- [ ] Fix yellow wave animation (use `sine.inOut` easing)
- [ ] Add celebration bounce on login
- [ ] Test on mobile
- [ ] Deploy to GitHub Pages

### Future
- [ ] Connect to backend API
- [ ] Add form validation with error messages
- [ ] Creature shake animation on error
- [ ] OAuth login (Google, GitHub)
- [ ] Dark mode

---

## Tech Stack

| What | Version | Why |
|------|---------|-----|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| GSAP | 3.13 | Physics animations |
| Framer Motion | 12 | Hover effects |
| Tailwind | 3.4 | Styling |
| Vite | 6.0 | Fast builds |

---

## License

MIT License - Copyright (c) 2025 Bhargava Teja Borra

**Design Inspiration:** [Outcrowd's WeStud Login](https://dribbble.com/shots/21953371-WeStud-Creative-Log-In-For-The-Educational-Platform) (Dribbble)  
**Code:** 100% original implementation

---

## Contact

**Bhargava Teja Borra**  
GitHub: [@BHARGAVATEJABORRA](https://github.com/BHARGAVATEJABORRA)  
Email: bhargavateja.borra@gmail.com

---

<div align="center">

**Built with React & GSAP**  
*Inspired by Outcrowd's Design*

Last Updated: November 17, 2025

</div>
