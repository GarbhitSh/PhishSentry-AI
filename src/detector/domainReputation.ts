import axios from 'axios';

export class DomainReputation {
  private phishingDomains: Set<string>;

  constructor() {
    this.phishingDomains = new Set([
      'uniswap-airdrop.eth',
      'airdrops-claim.com',
      // Add more known phishing domains here
    ]);
  }

  public async isMaliciousDomain(domain: string): Promise<boolean> {
    return this.phishingDomains.has(domain);
  }
}
