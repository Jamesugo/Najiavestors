import test from "node:test";
import assert from "node:assert/strict";
import {
  formatNigerianPhone,
  isValidNigerianPhone,
  getWhatsAppLink,
  NIGERIAN_STATES,
  PRICE_TIERS,
} from "../src/data/nigeria-data.ts";

test("Nigerian Geolocation Dataset contains 36 States + FCT", () => {
  const states = Object.keys(NIGERIAN_STATES);
  assert.equal(states.length, 37, "Must contain all 36 states and FCT");
  assert.ok(NIGERIAN_STATES["Lagos"], "Lagos state must exist");
  assert.ok(NIGERIAN_STATES["FCT"], "FCT must exist");
  assert.ok(NIGERIAN_STATES["Rivers"], "Rivers state must exist");
  assert.ok(NIGERIAN_STATES["Kano"], "Kano state must exist");
});

test("Nigerian Phone Normalization to +234 format", () => {
  assert.equal(formatNigerianPhone("08031234567"), "+2348031234567");
  assert.equal(formatNigerianPhone("07012345678"), "+2347012345678");
  assert.equal(formatNigerianPhone("2348099007744"), "+2348099007744");
  assert.equal(formatNigerianPhone("+2348099007744"), "+2348099007744");
});

test("Nigerian Phone Number Validation", () => {
  assert.equal(isValidNigerianPhone("08031234567"), true);
  assert.equal(isValidNigerianPhone("+2348031234567"), true);
  assert.equal(isValidNigerianPhone("09088887777"), true);
  assert.equal(isValidNigerianPhone("12345"), false);
  assert.equal(isValidNigerianPhone("invalid"), false);
});

test("WhatsApp Click-to-Chat Link Generator", () => {
  const link = getWhatsAppLink("08031234567", "Terra Kulture");
  assert.ok(link.startsWith("https://wa.me/2348031234567?text="));
  assert.ok(link.includes("Terra%20Kulture"));
});

test("Price Tier definitions", () => {
  assert.equal(PRICE_TIERS.BUDGET.label, "₦");
  assert.equal(PRICE_TIERS.MODERATE.label, "₦₦");
  assert.equal(PRICE_TIERS.EXPENSIVE.label, "₦₦₦");
  assert.equal(PRICE_TIERS.LUXURY.label, "₦₦₦₦");
});
