import { Trace } from "venn-sdk";
import { isKnownDrainer, hasSuspiciousCallPattern } from "../utils/heuristics";

export async function analyzeTransaction(trace: Trace): Promise<boolean> {
  if (!trace.input || !trace.to) return false;

  const sig = trace.input.slice(0, 10);
  const suspicious = hasSuspiciousCallPattern(sig) || isKnownDrainer(trace.to);
  return suspicious;
}
