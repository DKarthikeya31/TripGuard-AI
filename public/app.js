const stub = document.getElementById("stub");
const statusText = document.getElementById("statusText");
const flightNumber = document.getElementById("flightNumber");
const depTime = document.getElementById("depTime");
const arrTime = document.getElementById("arrTime");
const origin = document.getElementById("origin");
const destination = document.getElementById("destination");
const memberTier = document.getElementById("memberTier");
const memberName = document.getElementById("memberName");

const reasoningCard = document.getElementById("reasoningCard");
const reasoningTitle = document.getElementById("reasoningTitle");
const reasoningText = document.getElementById("reasoningText");
const reasoningMeta = document.getElementById("reasoningMeta");

const escalationCard = document.getElementById("escalationCard");
const escalationText = document.getElementById("escalationText");

const btnInPolicy = document.getElementById("btnInPolicy");
const btnOutOfPolicy = document.getElementById("btnOutOfPolicy");
const btnReset = document.getElementById("btnReset");

const STATUS_LABELS = {
  MONITORING: "Monitoring your flight",
  DISRUPTED: "Disruption detected — deciding next steps",
  RESOLVED: "Rebooked and resolved",
  ESCALATED: "Escalated to a specialist"
};

function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC"
  }) + " UTC";
}

function render(state) {
  const { itinerary, status, lastDecision } = state;

  memberTier.textContent = itinerary.cardMember.loyaltyTier;
  memberName.textContent = itinerary.cardMember.name;
  origin.textContent = itinerary.trip.origin;
  destination.textContent = itinerary.trip.destination;
  flightNumber.textContent = itinerary.trip.flight.number;
  depTime.textContent = fmtTime(itinerary.trip.flight.departure);
  arrTime.textContent = fmtTime(itinerary.trip.flight.arrival);

  stub.dataset.status = status;
  statusText.textContent = STATUS_LABELS[status] || status;

  if (status === "RESOLVED" && lastDecision) {
    reasoningCard.hidden = false;
    escalationCard.hidden = true;
    reasoningTitle.textContent = "What happened";
    reasoningText.textContent = lastDecision.reasoning;
    reasoningMeta.textContent =
      `Resolved ${new Date(lastDecision.resolvedAt).toLocaleTimeString()} · ` +
      `Rebooked on ${lastDecision.decision.chosenAlternate.flightNumber}`;
  } else if (status === "ESCALATED" && lastDecision) {
    escalationCard.hidden = false;
    reasoningCard.hidden = true;
    escalationText.textContent = lastDecision.reasoning;
  } else {
    reasoningCard.hidden = true;
    escalationCard.hidden = true;
  }
}

async function loadTrip() {
  const res = await fetch("/api/trip");
  render(await res.json());
}

async function trigger(scenario) {
  setButtonsDisabled(true);
  statusText.textContent = "Disruption detected — deciding next steps";
  stub.dataset.status = "DISRUPTED";
  try {
    const res = await fetch("/api/disrupt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario })
    });
    render(await res.json());
  } catch (err) {
    console.error(err);
    statusText.textContent = "Something went wrong — check the server console";
  } finally {
    setButtonsDisabled(false);
  }
}

async function reset() {
  setButtonsDisabled(true);
  const res = await fetch("/api/reset", { method: "POST" });
  render(await res.json());
  setButtonsDisabled(false);
}

function setButtonsDisabled(disabled) {
  [btnInPolicy, btnOutOfPolicy, btnReset].forEach((b) => (b.disabled = disabled));
}

btnInPolicy.addEventListener("click", () => trigger("in_policy"));
btnOutOfPolicy.addEventListener("click", () => trigger("out_of_policy"));
btnReset.addEventListener("click", reset);

loadTrip();
