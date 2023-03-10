import useSWR from 'swr'
import { fetchJson } from '../lib/fetcher'

export const getJson = (...args) => {
    const { data, error, isLoading } = useSWR(args.join('/'), fetchJson)
    return { data, error, isLoading }
}
