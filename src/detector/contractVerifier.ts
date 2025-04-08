import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class ContractVerifier {
  private etherscanApiKey: string;
  private network: string;

  constructor() {
    this.etherscanApiKey = process.env.ETHERSCAN_API_KEY || '';
    this.network = process.env.NETWORK || 'mainnet';
  }

  public async isVerifiedContract(address: string): Promise<boolean> {
    const url = `https://api${this.network === 'mainnet' ? '' : `-${this.network}`}.etherscan.io/api`;
    const params = {
      module: 'contract',
      action: 'getabi',
      address: address,
      apikey: this.etherscanApiKey,
    };

    try {
      const response = await axios.get(url, { params });
      return response.data.status === '1';
    } catch (error) {
      console.error('Error verifying contract:', error);
      return false;
    }
  }
}
