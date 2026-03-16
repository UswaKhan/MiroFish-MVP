export const AGENTS = [
  { id:1,  name:"Alex Chen",     handle:"@alexc_media",     emoji:"A", bio:"Tech journalist covering AI and digital policy. 8 years experience, skeptical but fair.",         tags:["Journalist","Tech","Neutral"],        platform:"twitter", sentiment:"neutral"  },
  { id:2,  name:"Priya Sharma",  handle:"@priyatalks",      emoji:"P", bio:"Political science student passionate about civic engagement and social justice.",                tags:["Student","Politics","Liberal"],       platform:"twitter", sentiment:"positive" },
  { id:3,  name:"Marcus Webb",   handle:"u/mwebb_thoughts", emoji:"M", bio:"Retired teacher turned active Reddit commenter. Values facts over hype.",                       tags:["Veteran","Education","Skeptic"],      platform:"reddit",  sentiment:"negative" },
  { id:4,  name:"Sofia Reyes",   handle:"@sofiar_now",      emoji:"S", bio:"Marketing manager. Early adopter. Shares opinions loudly and often.",                          tags:["Marketing","Influencer","Positive"],  platform:"twitter", sentiment:"positive" },
  { id:5,  name:"James O'Brien", handle:"u/jobrien_real",   emoji:"J", bio:"Small business owner frustrated with government policies. Active forum poster.",               tags:["Business","Conservative","Critic"],   platform:"reddit",  sentiment:"negative" },
  { id:6,  name:"Yuki Tanaka",   handle:"@yukiT_writes",    emoji:"Y", bio:"Science communicator. Believes in evidence-based discussion and nuance.",                     tags:["Science","Analyst","Moderate"],       platform:"twitter", sentiment:"neutral"  },
  { id:7,  name:"Dana Brooks",   handle:"u/dana_brooks99",  emoji:"D", bio:"Gen Z. Heavily influenced by social media trends. Shares memes and hot takes.",               tags:["Gen-Z","Casual","Expressive"],        platform:"reddit",  sentiment:"positive" },
  { id:8,  name:"Omar Farouk",   handle:"@ofarouk_fin",     emoji:"O", bio:"Financial analyst tracking economic indicators. Cautious, data-driven perspective.",          tags:["Finance","Expert","Bearish"],         platform:"twitter", sentiment:"negative" },
  { id:9,  name:"Rachel Kim",    handle:"u/rachelkim_pnw",  emoji:"R", bio:"Environmental activist who sees everything through the lens of climate impact.",              tags:["Environment","Activist","Progressive"],platform:"reddit", sentiment:"positive" },
  { id:10, name:"Tom Bauer",     handle:"@tombauer_news",   emoji:"T", bio:"Local news editor. Tries to present all sides. Accused of both bias directions.",             tags:["Media","Neutral","Veteran"],          platform:"twitter", sentiment:"neutral"  },
  { id:11, name:"Linda Voss",    handle:"u/lindavoss_uk",   emoji:"L", bio:"UK expat in the US. Brings international perspective to every debate.",                       tags:["International","Moderate","Expat"],   platform:"reddit",  sentiment:"neutral"  },
  { id:12, name:"Carlos Mendez", handle:"@carlosm_blog",    emoji:"C", bio:"Blogger covering social movements. Passionate, sometimes inflammatory.",                     tags:["Blogger","Activist","Outspoken"],     platform:"twitter", sentiment:"positive" },
];

export const GRAPH_NODES = [
  {id:"Policy",group:1},{id:"Government",group:1},{id:"Citizens",group:2},
  {id:"Media",group:2},{id:"Economy",group:3},{id:"Technology",group:3},
  {id:"Social Media",group:2},{id:"Public Opinion",group:4},{id:"Regulation",group:1},
  {id:"Innovation",group:3},{id:"Misinformation",group:4},{id:"Trust",group:4},
  {id:"Jobs",group:3},{id:"Infrastructure",group:1},{id:"Healthcare",group:2},
];

export const GRAPH_LINKS = [
  {source:"Government",target:"Policy"},{source:"Policy",target:"Citizens"},
  {source:"Media",target:"Public Opinion"},{source:"Citizens",target:"Social Media"},
  {source:"Technology",target:"Economy"},{source:"Economy",target:"Jobs"},
  {source:"Government",target:"Regulation"},{source:"Regulation",target:"Technology"},
  {source:"Social Media",target:"Misinformation"},{source:"Misinformation",target:"Trust"},
  {source:"Trust",target:"Government"},{source:"Innovation",target:"Technology"},
  {source:"Economy",target:"Healthcare"},{source:"Infrastructure",target:"Economy"},
  {source:"Public Opinion",target:"Policy"},{source:"Media",target:"Misinformation"},
  {source:"Citizens",target:"Trust"},{source:"Technology",target:"Jobs"},
];

export const TWITTER_POSTS = [
  {author:"Alex Chen",     sentiment:"neutral",  text:"Analyzing the situation carefully. Numbers suggest a nuanced picture — neither the doomsayers nor the optimists have it right. Thread incoming 🧵"},
  {author:"Priya Sharma",  sentiment:"positive", text:"This is HUGE for everyday people. Finally some real change. Sharing this with everyone I know 🙌 #MakeItHappen"},
  {author:"Sofia Reyes",   sentiment:"positive", text:"Already seeing a shift in my network. People are talking about this differently than last month. Vibes are genuinely changing."},
  {author:"Yuki Tanaka",   sentiment:"neutral",  text:"Let's look at the actual data before we celebrate or panic. Correlation ≠ causation, and we need longitudinal studies here."},
  {author:"Tom Bauer",     sentiment:"neutral",  text:"Both sides have valid points. I've read 12 position papers today. Key tension: short-term disruption vs long-term stability."},
  {author:"Carlos Mendez", sentiment:"positive", text:"The grassroots movement is WORKING. Don't let anyone tell you individual voices don't matter. We are the algorithm now. 🔥"},
  {author:"Omar Farouk",   sentiment:"negative", text:"Market response tells a different story. 3 major indicators flashing yellow. The enthusiasm online doesn't match economic reality."},
  {author:"Alex Chen",     sentiment:"neutral",  text:"Update: spoke to 4 different experts today. Consensus is more cautious than the headline narrative. Nuance matters here."},
  {author:"Priya Sharma",  sentiment:"positive", text:"Attended the community meeting. 200+ people showed up. The energy in that room was electric. Change is coming from the bottom up."},
  {author:"Omar Farouk",   sentiment:"negative", text:"Reminder that similar announcements in 2019 and 2021 got this same reaction. Both times the outcomes were… disappointing."},
];

export const REDDIT_POSTS = [
  {author:"Marcus Webb",   sentiment:"negative", text:"Been through 4 of these cycles in my lifetime. Every time the hype is the same. Every time reality is more complicated. I'll believe it when I see tangible results."},
  {author:"James O'Brien", sentiment:"negative", text:"How does this actually help small businesses? The announcement sounds good but the details are nowhere to be found. My costs are still the same."},
  {author:"Dana Brooks",   sentiment:"positive", text:"okay but the memes about this are genuinely hilarious AND this matters. can we not have both?? anyway pls vote pls act pls do something"},
  {author:"Rachel Kim",    sentiment:"positive", text:"For those asking about environmental impact — I've been tracking this. Initial assessments are positive. Cautiously optimistic based on the data I've seen."},
  {author:"Linda Voss",    sentiment:"neutral",  text:"For reference, the UK went through something similar in 2018. The public reaction was identical. The outcome was… mixed. Happy to share specifics if helpful."},
  {author:"Marcus Webb",   sentiment:"negative", text:"Edit: people are calling me pessimistic. I'm not. I'm asking for accountability. There's a difference. Show me the implementation plan."},
  {author:"James O'Brien", sentiment:"negative", text:"Update from my business association: 8/10 owners in our group are skeptical. We've heard promises before. We need specifics, not vibes."},
  {author:"Rachel Kim",    sentiment:"positive", text:"The coalition letter now has 1,400 signatures from scientists. That's not nothing. Expertise matters and the experts are cautiously supportive."},
  {author:"Dana Brooks",   sentiment:"positive", text:"my entire friend group is talking about this which has NEVER happened before for anything policy related. idk that feels significant"},
  {author:"Linda Voss",    sentiment:"neutral",  text:"Good faith question: what mechanisms exist to hold decision-makers accountable if this doesn't pan out? Asking because the UK model failed on this exact point."},
];

export const REPORT_SECTIONS = [
  {
    title: "Executive Summary",
    paragraphs: [
      "Based on a 40-round dual-platform simulation with 120 autonomous agents, MiroFish projects a moderately positive trajectory for public opinion over the next 30 days, with significant volatility expected in weeks 2–3.",
      "Initial sentiment distribution shows 48% positive, 31% neutral, and 21% negative reactions. However, simulation data indicates a polarization trend — the neutral population is likely to split toward stronger positions as narratives solidify.",
    ],
    highlight: "Key Prediction: Dominant sentiment will shift from cautious optimism to either strong support (60% probability) or fragmented skepticism (40% probability) by Day 21, depending on whether concrete implementation details are released.",
    showSentiment: false,
  },
  {
    title: "Sentiment Trajectory",
    paragraphs: [
      "Phase 1 (Days 1–7): High initial engagement driven by novelty. Positive sentiment dominates social media as early adopters and advocates lead the conversation.",
      "Phase 2 (Days 8–21): Skeptical voices gain traction as initial excitement fades. Economic and practical concerns begin resonating with previously neutral users. This is the critical inflection window.",
      "Phase 3 (Days 22–30): Opinion consolidates around dominant narratives. Expert voices have disproportionate influence in this final phase.",
    ],
    highlight: null,
    showSentiment: true,
  },
  {
    title: "Platform Dynamics",
    paragraphs: [
      "Twitter agents show faster sentiment propagation, higher volatility, and stronger influence from perceived authority figures. Emotional framing outperforms factual arguments in reach and engagement.",
      "Reddit agents exhibit slower but stickier opinion changes. Long-form critical arguments gain traction. Skeptical voices are more likely to be upvoted, creating a fundamentally different information environment.",
      "Cross-platform spillover is significant — approximately 35% of Reddit discussions reference Twitter narratives within 48 simulation hours.",
    ],
    highlight: null,
    showSentiment: false,
  },
  {
    title: "Key Risk Factors",
    paragraphs: [
      "Risk 1 — Information Vacuum (Probability: 65%): If detailed implementation plans are not communicated within 10 days, speculation fills the void. Our models show this accelerates polarization by 2.3×.",
      "Risk 2 — Credibility Collapse (Probability: 22%): A single high-profile critical statement from a trusted expert can shift neutral agents negative within 3–5 simulation rounds.",
      "Risk 3 — Competing Narrative (Probability: 41%): An unrelated but similarly scaled news event would draw agent attention away, reducing engagement by an estimated 55%.",
    ],
    highlight: "Recommendation: Proactive, specific communication within the first 10 days is the single highest-leverage intervention to secure positive outcomes.",
    showSentiment: false,
  },
  {
    title: "Predictions & Conclusions",
    paragraphs: [
      "30-day dominant sentiment: 58% positive if implementation details are shared; 39% positive if they are not.",
      "Peak engagement window: Days 5–12. Interventions in this period have 3× the impact of equivalent actions in Days 20+.",
      "Most influential agent archetype: Informed skeptics — their conversion to neutral or positive has outsized cascade effects on the broader population.",
      "Underestimated risk: The 18–25 age cohort shows high initial positivity but the fastest disillusionment curve if early enthusiasm is not matched by concrete action.",
    ],
    highlight: null,
    showSentiment: false,
  },
];

export const AGENT_RESPONSES = {
  ReportAgent: [
    "Based on the simulation data, the most significant finding is the sharp Phase 2 inflection point around Days 8–14. This is where opinion cascades are most likely to trigger — and where proactive communication has the highest leverage.",
    "The 120-agent simulation ran 40 complete rounds, generating 1,847 individual posts and 3,200+ interactions. The sentiment patterns were consistent across 8 different random seeds, giving us high confidence in the trajectory.",
    "The key variable our model identified is expert credibility density — how many trusted, visible voices are actively providing specific information. When that density drops, uncertainty fills the void and negative sentiment accelerates.",
    "The Reddit vs Twitter divergence is one of the most actionable findings. Twitter rewards speed and emotion; Reddit rewards depth and evidence. A communications strategy that ignores this distinction will underperform on at least one platform.",
  ],
  default: [
    "From my perspective in the simulation, the initial energy felt genuine. But the lack of specifics is starting to create doubt even among supporters like me.",
    "In the simulation, the most meaningful conversations I had were with people who asked what does this actually mean for me. Abstract benefits do not move people. Concrete examples do.",
    "I would characterize the mood among agents like me as conditional optimism. We want this to work but we have learned to wait for evidence before fully committing.",
    "The cross-platform dynamic is interesting — I often saw Twitter narratives arrive on Reddit within a few hours, but they were met with much more scrutiny here. Same story, completely different reception.",
  ],
};