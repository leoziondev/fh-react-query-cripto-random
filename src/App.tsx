import { useEffect, useState } from "react"

const getRandomNumberFromApi = async ():Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text()

  return +numberString
}

export const App = () => {
  const [number, setNumber] = useState<number>()

  useEffect(() => {
    getRandomNumberFromApi().then((num) => setNumber(num))
  }, [])

  return (
    <div className="bg-slate-900 text-slate-300 flex items-center justify-center min-h-screen">
      <h1>Número Aleatório: {number}</h1>
    </div>
  )
}
