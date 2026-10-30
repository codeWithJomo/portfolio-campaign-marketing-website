import React, { createContext, useContext, useEffect, useState } from 'react';

export type PriceRegion = 'nigeria' | 'international';

const NIGERIAN_TIME_ZONES = new Set(['Africa/Lagos']);

const PricingContext = createContext<PriceRegion>('nigeria');

export function getPriceRegion(timeZone?: string): PriceRegion {
  return timeZone && NIGERIAN_TIME_ZONES.has(timeZone) ? 'nigeria' : timeZone ? 'international' : 'nigeria';
}

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<PriceRegion>('nigeria');

  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setRegion(getPriceRegion(timeZone));
    } catch {
      setRegion('nigeria');
    }
  }, []);

  return <PricingContext.Provider value={region}>{children}</PricingContext.Provider>;
}

export function usePrice() {
  const region = useContext(PricingContext);
  return {
    region,
    amount: region === 'nigeria' ? '₦5,000' : '$5',
    oneTimeAmount: region === 'nigeria' ? '₦5,000 one-time' : '$5 one-time',
  };
}
