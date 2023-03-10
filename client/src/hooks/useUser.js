import useSWR from 'swr'
import { fetchAny } from '../lib/fetcher'
export default () => {
    const { data, error, isLoading } = useSWR('http://localhost:3000/user', fetchAny )
    return { data, error, isLoading }
}