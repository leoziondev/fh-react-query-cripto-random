import { useEffect, useReducer, useState } from "react"
import { useQuery } from  '@tanstack/react-query'

const getRandomNumberFromApi = async ():Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text()

  throw new Error('Error!')

  return +numberString
}

export const App = () => {
  const query = useQuery(
    ['randomNumber'],
    getRandomNumberFromApi,
  )

  return (
    <div className="bg-slate-900 text-slate-300 flex flex-col items-center justify-center min-h-screen">
      {query.isFetching 
        ? (<h2>Carregando...</h2>)
        : (<h1>Número Aleatório: {query.data}</h1>)
      }      

      {!query.isLoading && query.isError && <h3 className="text-red-500">{`${query.error}`}</h3>}

      <button
        onClick={() => query.refetch()}
        className="flex items-center gap-2 bg-teal-500 text-white py-2 px-4 mt-4 text-sm tracking-wider font-semibold disabled:opacity-60"
        disabled={query.isFetching}
      >
        {query.isFetching && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="animate-spin w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        )}
        Novo número
      </button>
    </div>
  )
}
