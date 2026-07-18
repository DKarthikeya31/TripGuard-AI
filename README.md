# TripGuard AI 🧳✈️
### Autonomous Travel-Disruption Concierge

**American Express CodeStreet Hackathon 2026**

> Flights get cancelled. Connections get missed. TripGuard AI detects the disruption the moment it happens — and fixes it before the card member even knows there's a problem.

---

## 🚩 The Problem

Travel disruptions are one of the most stressful moments in a card member's journey — and today, resolving them is almost entirely manual.

- A flight gets cancelled or a connection is missed.
- The card member finds out from an airline app or an announcement — not proactively.
- They call support, wait on hold, and manually search for alternate flights and hotels.
- By the time they're rebooked, hours have been lost and the experience has already damaged trust in the card.

Existing travel apps only **display** disruption information. None of them **act** on it. For a premium card brand built on travel benefits and concierge service, this is a gap — not a nice-to-have.

---

## 💡 Our Solution

**TripGuard AI** is an autonomous agent that watches a card member's itinerary in real time and, when a disruption occurs, independently:

1. **Detects** the disruption (cancellation, delay, missed connection) the moment it's reported
2. **Decides** the best resolution path based on real-time alternatives, fare rules, loyalty status, and card benefit policy
3. **Acts** — rebooks the flight, adjusts the hotel stay, and confirms the new plan
4. **Notifies** the card member with a clear, plain-language explanation of what changed and why
5. **Escalates** to a human agent only when a decision falls outside policy limits

No manual searching. No hold music. No confusion — just a resolved trip and a clear explanation.

---

## 🌟 What Makes This Different

| Existing Travel Apps | TripGuard AI |
|---|---|
| Notify you *after* things go wrong | Detects disruption in real time |
| You manually rebook | Autonomously rebooks within policy |
| Static itinerary display | Live, self-healing itinerary |
| No reasoning shown | Transparent, explainable decisions |
| Reactive | Proactive |

---

## 🏗️ How It Works — System Architecture

```
┌─────────────────────┐
│  Flight Status Feed  │  (Amadeus / Sabre API — live disruption events)
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│  Disruption Detector │  → identifies cancellation, delay, or missed connection
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│   Decision Engine    │  → evaluates alternatives against:
│  (Agentic AI Layer)  │     - fare class & loyalty tier
│                      │     - card benefit policy limits
│                      │     - time-to-departure urgency
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│    Action Layer      │  → executes rebooking (flight + hotel APIs)
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│ Notification Engine  │  → sends card member a plain-language update
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│ Transparency Layer   │  → "Here's why we chose this option" explanation
└──────────────────────┘
```

If a decision falls outside pre-approved policy (e.g. cost above threshold, no acceptable alternative), the system **escalates to a human agent with full context** — no cold handoffs.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (mobile-first, card member notifications & live status) |
| Backend & APIs | Node.js, FastAPI |
| Agentic AI Framework | LangChain / AutoGen (decision-making & orchestration) |
| Travel Data | Amadeus for Developers API (flight status, availability) |
| Rules Engine | Custom policy engine (fare rules, benefit limits, loyalty tiers) |
| Database | PostgreSQL (itinerary & policy data), Redis (real-time event cache) |
| Notifications | Push/SMS/Email via Twilio or Firebase Cloud Messaging |
| Cloud | AWS (Lambda for event triggers, S3 for logs) |

---

## 📊 Business Impact for American Express

- **Reduced support load**: Fewer disruption-related calls into customer service, freeing agents for complex cases
- **Stronger retention**: A seamless, proactive experience reinforces the value of premium travel benefits and annual fees
- **Brand differentiation**: Positions Amex ahead of competitors who offer only static travel insurance or itinerary tracking
- **Higher NPS in a high-stress moment**: Disruptions are emotionally charged; resolving them flawlessly builds outsized loyalty
- **Scalable to millions of cardholders**: Cloud-native, API-first design supports enterprise scale from day one

---

## 🔎 Transparency & Trust

Every autonomous decision comes with a plain-language explanation:

> *"Your original flight was cancelled. We rebooked you on the next available flight in your fare class, arriving only 40 minutes later than planned, and extended your hotel check-in by 2 hours at no extra cost — all within your card's travel protection policy."*

This reasoning layer builds member trust in autonomous decisions and gives Amex a full audit trail for every action taken.

---

## 🚀 Feasibility & Roadmap

**Hackathon MVP (Round 2 scope):**
- Simulated live flight disruption event
- End-to-end automated rebooking flow (flight + hotel)
- Real-time notification with reasoning shown to the user
- Escalation path demo for out-of-policy scenarios

**Future scale path:**
- Integration with live airline/hotel partner APIs
- Expansion to rental cars, event tickets, and other travel bookings
- Personalization based on individual member travel history and preferences

---

## 👥 Team

| Name | Role |
|---|---|
| [Your Name] | [Role] |
| [Teammate] | [Role] |
| [Teammate] | [Role] |

---

## 📽️ Demo

- **Video**: [link here]
- **Live Prototype**: [link here]
- **Pitch Deck**: [link here]

---

*Built for the American Express CodeStreet Hackathon — turning travel disruptions from a moment of stress into a moment of trust.*
