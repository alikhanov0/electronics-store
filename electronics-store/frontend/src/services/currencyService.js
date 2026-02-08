export async function getUsdToKztRate() {
  const res = await fetch(
    "https://api.exchangerate.host/latest?base=USD&symbols=KZT"
  )
  const data = await res.json()
  return data.rates.KZT
}

export async function getKztToUsdRate() {
  const res = await fetch(
    "https://api.exchangerate.host/latest?base=KZT&symbols=USD"
  )
  const data = await res.json()
  return data.rates.USD
}
