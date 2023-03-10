import useSWR from 'swr'
import { fetchurl } from '../lib/fetcher'
export const getPofile = () => ({ data: profile, error, isLoading } = useSWR('http://localhost:3000/user/profile', fetchurl))
