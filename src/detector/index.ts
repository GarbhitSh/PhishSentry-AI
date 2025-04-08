import { Detector, Finding, Trace } from "venn-sdk";
import { analyzeTransaction, checkExternalIntel } from "./phishingLogic";

export const handler: Detector = async (trace: Trace): Promise<Finding[]> => {
  const findings: Finding[] = [];

  const internalCheck = await analyzeTransaction(trace);
  const externalCheck = await checkExternalIntel(trace);

  if (internalCheck || externalCheck) {
    findings.push({
      alert_id: "PHISH-SENTRY-AI-DETECT",
      name: "Phishing Attempt Detected",
      description: "Suspicious transaction possibly from fake dApp",
      severity: "high",
      metadata: {
        source: trace.from,
        destination: trace.to,
        methodSig: trace.input?.slice(0, 10) || "N/A",
        externalAlert: externalCheck ? "Yes" : "No",
      },
    });
  }

  return findings;
};
