import { DetectionRequest } from '../dtos/detectionRequest';
import { ContractVerifier } from './contractVerifier';
import { ThreatIntelFetcher } from './threatIntelFetcher';
import { DomainReputation } from './domainReputation';

export class DetectionService {
  private contractVerifier: ContractVerifier;
  private threatIntelFetcher: ThreatIntelFetcher;
  private domainReputation: DomainReputation;

  constructor() {
    this.contractVerifier = new ContractVerifier();
    this.threatIntelFetcher = new ThreatIntelFetcher();
    this.domainReputation = new DomainReputation();
  }

  public async detect(request: DetectionRequest): Promise<{ detected: boolean; reason: string }> {
    // Check for interactions with known malicious addresses
    const isMaliciousAddress = await this.threatIntelFetcher.isMaliciousAddress(request.to);
    if (isMaliciousAddress) {
      return { detected: true, reason: 'Transaction targets a known malicious address.' };
    }

    // Verify contract authenticity
    const isVerifiedContract = await this.contractVerifier.isVerifiedContract(request.to);
    if (!isVerifiedContract) {
      return { detected: true, reason: 'Transaction interacts with an unverified contract.' };
    }

    // Analyze function signatures for high-risk operations
    const highRiskFunctions = ['0x095ea7b3', '0xd505accf']; // approve(), permit()
    if (highRiskFunctions.includes(request.input.slice(0, 10))) {
      return { detected: true, reason: 'Transaction calls a high-risk function.' };
    }

    // Evaluate domain reputation if available
    if (request.domain) {
      const isMaliciousDomain = await this.domainReputation.isMaliciousDomain(request.domain);
      if (isMaliciousDomain) {
        return { detected: true, reason: 'Transaction originates from a known phishing domain.' };
      }
    }

    return { detected: false, reason: 'No phishing indicators detected.' };
  }
}
