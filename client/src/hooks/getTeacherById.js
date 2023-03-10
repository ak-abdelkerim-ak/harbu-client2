import useSWR from 'swr'
import { fetchjson } from '../lib/fetcher'
export default function getTeacherById(id) {
    const { data, error, isLoading } = useSWR(`http://localhost:3000/teacher/${id}`, fetchjson())
    return { data, error, isLoading }
}

