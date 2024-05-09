import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL, NetWork } from '../../common/apiKey'
import { GET } from '../../common/contants'
import { axiosBaseQuery } from '../baseQuery'

export const pokemonApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  //   tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => ({ method: GET, url: NetWork.pokemon + `pokemon/${name}` })
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    })
  })
})

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApi
