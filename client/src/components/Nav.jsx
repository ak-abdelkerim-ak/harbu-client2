import { useNavigate } from "react-router-dom"

export default function Nav() {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [menustyle, setMenustyle] = useState('max-md:animate-down')
    const { data: navconfig, isLoading } = getJson('navconfig')
    const handlemenu = () => {
        
    }
    return (
        <nav className={`${menustyle} ${menu ? 'max-md:flex' : 'max-md:hidden'}`}>
            {!isLoading
                ? navconfig == null
                    ? navigate('/login')
                    : navconfig
                        .map((data, index) =>
                            <button key={index}>
                                <NavLink
                                    to={`/app/${data[0]}`}
                                    onClick={() => {
                                        
                                    }}
                                >
                                    {data[1]}
                                </NavLink>
                            </button>)
                : null
            }
        </nav>
    )
}