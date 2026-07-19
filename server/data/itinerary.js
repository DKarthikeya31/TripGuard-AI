// In-memory "database" for the hackathon MVP.
// Replace with Postgres + Amadeus/Sabre live feeds post-hackathon.

const baseItinerary = {
  cardMember: {
    name: "J. Whitfield",
    loyaltyTier: "Platinum",
    cardProduct: "Amex Platinum"
  },
  trip: {
    id: "TRIP-8841",
    origin: "JFK",
    destination: "LHR",
    flight: {
      number: "AA 100",
      status: "ON_TIME",
      departure: "2026-07-19T22:10:00Z",
      arrival: "2026-07-20T10:05:00Z",
      fareClass: "Business"
    },
    hotel: {
      name: "The Langham, London",
      checkIn: "2026-07-20T14:00:00Z",
      checkOut: "2026-07-23T11:00:00Z"
    }
  }
};

// Two canned disruption scenarios so the demo can show BOTH the
// auto-resolve path and the human-escalation path.
const scenarios = {
  in_policy: {
    label: "Flight cancelled — in-policy rebooking",
    disruption: {
      type: "CANCELLATION",
      flightNumber: "AA 100",
      reason: "Aircraft maintenance issue",
      reportedAt: null // filled in at trigger time
    },
    alternates: [
      {
        id: "ALT-1",
        flightNumber: "AA 106",
        departure: "2026-07-19T23:40:00Z",
        arrival: "2026-07-20T10:45:00Z",
        fareClass: "Business",
        cost: 0, // covered under original fare, no additional cost
        delayMinutes: 40
      },
      {
        id: "ALT-2",
        flightNumber: "BA 178",
        departure: "2026-07-20T09:00:00Z",
        arrival: "2026-07-20T21:15:00Z",
        fareClass: "Business",
        cost: 0,
        delayMinutes: 670
      }
    ],
    hotelAdjustment: {
      newCheckIn: "2026-07-20T16:00:00Z",
      extraCost: 0,
      note: "Check-in shifted 2 hours to match new arrival time, no extra charge"
    }
  },
  out_of_policy: {
    label: "Flight cancelled — no in-policy option (escalation)",
    disruption: {
      type: "CANCELLATION",
      flightNumber: "AA 100",
      reason: "Weather diversion, route suspended 48 hours",
      reportedAt: null
    },
    alternates: [
      {
        id: "ALT-3",
        flightNumber: "DL 402",
        departure: "2026-07-20T08:00:00Z",
        arrival: "2026-07-20T20:30:00Z",
        fareClass: "First", // above the member's booked fare class -> needs approval
        cost: 1850,
        delayMinutes: 780
      }
    ],
    hotelAdjustment: null
  }
};

// Policy limits the Decision Engine checks against.
// Kept simple and explicit on purpose — a real system would source
// this from Amex benefit/fare-rule config per card product.
const policy = {
  maxDelayMinutesAutoApprove: 240, // 4 hours
  maxAdditionalCostAutoApprove: 300, // USD
  allowFareClassUpgrade: false // cannot auto-approve a class upgrade
};

// Simple mutable state so the API can reflect "current" trip status
// across requests during the demo. Reset on server restart.
let state = {
  itinerary: JSON.parse(JSON.stringify(baseItinerary)),
  status: "MONITORING", // MONITORING | DISRUPTED | RESOLVED | ESCALATED
  lastDecision: null
};

function resetState() {
  state = {
    itinerary: JSON.parse(JSON.stringify(baseItinerary)),
    status: "MONITORING",
    lastDecision: null
  };
  return state;
}

module.exports = { state, scenarios, policy, resetState };
