import { handler } from "../src/detector";
import { Trace } from "venn-sdk";

describe("PhishSentry AI", () => {
  it("should flag known phishing pattern", async () => {
    const trace: Trace = {
      from: "0x123...",
      to: "0xdeadbeef...",
      input: "0x095ea7b3",
      value: "0x0",
    };
    const findings = await handler(trace);
    expect(findings.length).toBeGreaterThan(0);
  });

  it("should not flag normal tx", async () => {
    const trace: Trace = {
      from: "0xabc...",
      to: "0xlegit...",
      input: "0x",
      value: "0x0",
    };
    const findings = await handler(trace);
    expect(findings.length).toBe(0);
  });
});
