import { createContext, useContext, useEffect, useState } from "react";
import { getUsdToKztRate } from "../services/currencyService";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRate() {
      if (currency === "USD") {
        setRate(1);
        return;
      }

      setLoading(true);
      try {
        const r = await getUsdToKztRate();
        setRate(r);
      } catch (e) {
        console.error("Failed to load currency rate", e);
        setRate(1);
      } finally {
        setLoading(false);
      }
    }

    loadRate();
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
