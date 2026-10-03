import { Container, Form, Title, ContainerInputs, Input, InputLabel } from "./styles.js"
import Button from "../../components/Button"
import { useRef } from "react"
import { useNavigate } from "react-router"
import api from "../../services/api"
import TopBackground from "../../components/TopBackground/"

function Home() {

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()
    const navigate = useNavigate()

    async function registerNewUser() {
        await api.post("/usuarios", {
            email: inputEmail.current.value,
            age: parseInt(inputAge.current.value),
            name: inputName.current.value
        })
        navigate("/Lista-de-usuarios")
    }

    return (
        <Container>
            <TopBackground />
            <Form>
                <Title>Cadastrar Usuario</Title>
                <ContainerInputs>
                    <div>
                        <InputLabel>Nome<span>*</span></InputLabel>
                        <Input type="text" placeholder="Nome do usuario" ref={inputName} />
                    </div>

                    <div>
                        <InputLabel>Idade<span>*</span></InputLabel>
                        <Input type="number" placeholder="Idade do usuario" ref={inputAge} />
                    </div>
                </ContainerInputs>
                <div style={{ width: "100%" }}>
                    <InputLabel>E-mail<span>*</span></InputLabel>
                    <Input type="email" placeholder="E-mail do usuario" ref={inputEmail} />
                </div>
                <Button onClick={registerNewUser} type="button" tema="primario">Cadastrar Usuarios</Button>
            </Form>

            <Button type="button" onClick={()=> navigate("/Lista-de-usuarios")}>Ver Lista de Usuarios</Button>
        </Container>
    )
}

export default Home

