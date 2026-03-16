# 🐟 MiroFish — English Version

> English-localized version of MiroFish: a swarm intelligence engine that simulates thousands of AI agents to predict public opinion and social media reactions.

## 🌐 Live Demo
**[https://UswaKhan.github.io/MiroFish-English](https://UswaKhan.github.io/MiroFish-English)**

---

## What is MiroFish?

MiroFish is a multi-agent AI prediction engine. You upload a seed document (news article, policy draft, financial report, or novel), and it:

1. **Builds a knowledge graph** from your document — extracting entities and relationships
2. **Generates 120 unique AI agents** with independent personalities, demographics, and behavioral patterns
3. **Simulates those agents** interacting on Twitter and Reddit across 40 rounds
4. **Produces a prediction report** analyzing sentiment trajectory, platform dynamics, and risk factors
5. **Lets you chat** directly with any simulated agent or the ReportAgent

This is the English-localized version of the original Chinese project at [666ghj/MiroFish](https://github.com/666ghj/MiroFish) (10k+ stars).

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React** | UI components and state management |
| **Tailwind CSS** | Styling and layout |
| **D3.js** | Interactive knowledge graph visualization |
| **Create React App** | Project setup and build tool |

---

## Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version)

### Steps
```bash
# Install dependencies
npm install

# Start development server
npm start
```

App opens at **http://localhost:3000**

---

## Project Structure
```
src/
├── App.js                    # Main app — controls which step is shown
├── index.css                 # Tailwind + custom animations
├── data/
│   └── index.js              # All mock data (agents, posts, report sections)
└── components/
    ├── Navbar.jsx             # Top navigation with step indicators
    ├── UploadStep.jsx         # Step 0: File upload + progress simulation
    ├── GraphStep.jsx          # Step 1: D3.js knowledge graph
    ├── AgentsStep.jsx         # Step 2: Agent profile cards
    ├── SimulationStep.jsx     # Step 3: Live Twitter and Reddit feeds
    ├── ReportStep.jsx         # Step 4: Full prediction report
    └── ChatStep.jsx           # Step 5: Chat with any simulated agent
```

---

## Original Project

- GitHub: [666ghj/MiroFish](https://github.com/666ghj/MiroFish)
- Original stack: Vue 3, Python/Flask, Zep Cloud, CAMEL-OASIS
