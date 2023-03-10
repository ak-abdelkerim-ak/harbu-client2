import useSWR from 'swr'
import { fetchjson } from '../lib/fetcher'
export const getTeachers = (datatype) => {
    const { data: teachers, error, isLoading } = useSWR(`http://localhost:3000/${datatype}`, fetchjson)
    return { teachers, error, isLoading }
}