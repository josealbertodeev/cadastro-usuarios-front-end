import api from "../../services/api"
import Button from '../../components/Button'
import TopBackground from '../../components/TopBackground'
import { useEffect, useState } from "react"
import { Container, Title, ContainerUsers, CardUsers, TrashIcon,  AvatarUser } from "./styles"
import Trash from '../../assets/trash.svg'
import { useNavigate } from "react-router"

function ListUsers() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            const { data } = await api.get("/usuarios")
            setUsers(data)
        }
        getUsers()
    }, [])

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)
    }

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuarios</Title>

            <ContainerUsers>
                {users.map(user => (
                    <CardUsers key={user.id}>
                        <AvatarUser
                            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`}
                            alt={`Avatar de ${user.name}`}
                        />
                        <div>
                            <h3>Nome: {user.name}</h3>
                            <p>Idade: {user.age}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <TrashIcon src={Trash} alt="Icone Excluir" onClick={() => deleteUsers(user.id)} />
                    </CardUsers>
                ))}
            </ContainerUsers>

            <Button type="button" onClick={()=> navigate("/")}>
                Voltar para Home
            </Button>
        </Container>
    )
}

export default ListUsers