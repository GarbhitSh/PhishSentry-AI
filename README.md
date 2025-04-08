# PhishSentry AI – Phishing Custom Detector for the Venn Network

**PhishSentry AI** is a cutting-edge phishing detection engine purpose-built for the **Venn Network**. It stops malicious dApp interactions in real-time, protecting users from signing deceptive or harmful blockchain transactions.

By combining **on-chain behavioral heuristics**, **off-chain threat intelligence**, and **smart contract profiling**, PhishSentry AI flags suspicious wallet activity, impersonation scams, and contract drainers—**before the damage is done**.

---

## What Does It Detect?

PhishSentry AI analyzes enriched transactions and triggers alerts if:

- Dangerous functions like `approve()` or `permit()` are called
- Transactions interact with **unverified or recently deployed contracts**
- The destination wallet matches a **known drainer or scammer**
- The transaction originates from a **phishing domain** (via Chainabuse, Phish.Surf, ScamSniper)
- Suspicious value transfers (zero-ETH calls, approval-only flows) are detected
- Behavior mimics **known phishing signatures** like fake airdrops or claim scams

---

## Key Features

| Module            | Capability                                                                 | 
|-------------------|-----------------------------------------------------------------------------|
| **Transaction Scanner**  | Analyzes gas, calldata, opcodes, and value transfer flows                 | 
| **Signature Inspector**  | Detects calls to dangerous ERC-20/ERC-721 function selectors             | 
| **Contract Verifier**    | Uses Etherscan API to verify contract age, status, and audit metadata   | 
| **Threat Intel Fetcher** | Pulls scam address lists and malicious dApp domains via public APIs     | 
| **Domain Reputation**    | Flags UI-signed txs from known scam websites or ENS name-spoofing       | 

---

## How It Works

When a transaction enters the Venn Detection Pipeline:

1. Parse transaction: Extracts `to`, `from`, `input`, `value`, `calldata`, and `contract status`
2. Scam address match: Looks up known drainers and flagged wallet addresses
3. Function analysis: Inspects whether high-risk methods like `approve()` or `delegatecall()` are used
4. Domain fingerprint: (Optional) Detects phishing UIs via referrer header / ENS domain spoofing
5. Final decision: Triggers an alert with full reasoning, confidence, and metadata

---

## Example Triggers

### Approve() to Scam Wallet
```json
{
  "triggerId": "PHISHSENTRY-TRIGGER-APPROVE-SCAM",
  "detected": true,
  "severity": "HIGH",
  "reason": "approve() called to known malicious wallet",
  "metadata": {
    "to": "0x111fakeDrainer...",
    "method": "0x095ea7b3",
    "domain": "uniswap-airdrop.eth"
  }
}
```

### Permit() from Fake Airdrop
```json
{
  "triggerId": "PHISHSENTRY-TRIGGER-PERMIT-DAPP",
  "detected": true,
  "severity": "CRITICAL",
  "reason": "Transaction uses permit() from known phishing domain",
  "metadata": {
    "method": "0xd505accf",
    "sourceDomain": "airdrops-claim.com"
  }
}
```

### Real-World Examples

| Attack Type | Transaction | Reason Triggered |
|-------------|-------------|------------------|
| Fake Uniswap Airdrop | Link | approve() to blacklisted drainer |
| WalletConnect Scam | Link | permit() from scam website |
| ENS Spoofing Phishing | Link | Fake ENS dApp initiated blind approval |

---

## Getting Started

### Installation
```bash
git clone https://github.com/gabhitsh/phishsentry-ai.git
cd phishsentry-ai
npm install
cp .env.example .env
```

### Environment Variables
Edit `.env` and add:
```ini
ETHERSCAN_API_KEY=your_api_key
CHAINABUSE_API_KEY=optional
NETWORK=mainnet
```

### Usage with Venn Detection SDK
```typescript
import { DetectionService } from './src/modules/service';
import { DetectionRequest } from './src/modules/dtos';

const request = new DetectionRequest();
request.trace = {
  to: '0x...',
  from: '0x...',
  input: '0x095ea7b3...', // approve()
  value: '0x00',
  gas: '0x5208',
  pre: {},
  post: {},
  calls: []
};

const result = await DetectionService.detect(request);
console.log(result.detected, result.reason);
```

---

## Testing
Run unit tests for all detection flows:
```bash
npm test
```
Tests include:

- Function signature detection
- Address and contract blacklist triggers
- Real-world phishing pattern simulation
- False positive protection
- Threat Intel mocking

---

## Project Structure
```bash
phishsentry-ai/
├── src/
│   ├── modules/
│   │   ├── service.ts
│   │   ├── drainers.ts
│   │   ├── signatures.ts
│   │   ├── threatIntel.ts
│   └── dtos/
├── test/
├── .env.example
└── README.md
```

---



![HLD](https://github.com/GarbhitSh/PhishSentry-AI/blob/main/xdm.png)


---

## License
MIT License. Open for forks, bounties, and future protocol integration.

---

## Credits & Data Sources
* Venn Network – Custom Detector Infra
* Etherscan – Contract Verification
* Phish.Surf – dApp Phishing Intel
* Chainabuse – Scam Reporting Feeds
* ScamSniper – Address Detection

##  Enhancements

* ML-based phishing pattern clustering
* DNS-based dApp domain risk scoring
* Drainer behavior graph visualization
* CI-integrated signature feed updates
* ZKP-backed wallet consent validation
