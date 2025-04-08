const knownDrainers = [
    "0xdeadbeef...", // Real examples from chainabuse
  ];
  
  const suspiciousSignatures = [
    "0xd9caed12", // `approve(address,uint256)`
    "0x095ea7b3", // `permit(...)`
  ];
  
  export function isKnownDrainer(address: string): boolean {
    return knownDrainers.includes(address.toLowerCase());
  }
  
  export function hasSuspiciousCallPattern(sig: string): boolean {
    return suspiciousSignatures.includes(sig);
  }
  