import axios from "axios";
import { Trace } from "venn-sdk";

export async function checkExternalIntel(trace: Trace): Promise<boolean> {
  try {
    const domain = await getDappOrigin(trace); // Optional enhancement
    const { data } = await axios.get(`https://api.phish.surf/check/${domain}`);
    return data?.block || false;
  } catch (err) {
    return false;
  }
}

async function getDappOrigin(trace: Trace): Promise<string> {
  return "example-phishing-site.xyz";
}
