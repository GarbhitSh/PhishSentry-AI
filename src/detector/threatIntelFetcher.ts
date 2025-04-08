import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class ThreatIntelFetcher {
  private chainabuseApiKey: string;

  constructor() {
    this.chainabuseApiKey = process.env.CHAINABUSE_API_KEY || '';
  }

  public async isMaliciousAddress(address: string): Promise<boolean> {
    const url = `https://api.chainabuse.com/v1/addresses/${address}`;
    const headers = {
      'Authorization': `Bearer ${this.chainabuseApiKey}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data.isMalicious;
    } catch (error) {
      console.error('Error fetching threat intelligence:', error);
      return false;
    }
  }
}
