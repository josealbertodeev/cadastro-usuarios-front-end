import { Container, Form, Title, ContainerInputs, Input, InputLabel, ErrorMessage } from "./styles.js"
import Button from "../../components/Button"
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import api from "../../services/api"
import TopBackground from "../../components/TopBackground/"

function Home() {

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    async function registerNewUser() {
        const name = inputName.current.value.trim()
        const age = parseInt(inputAge.current.value)
        const email = inputEmail.current.value.trim()

        if (!name || !inputAge.current.value || !email) {
            setError("Preencha todos os campos.")
            return
        }
        if (Number.isNaN(age) || age <= 0) {
            setError("Informe uma idade válida.")
            return
        }
        if (!inputEmail.current.checkValidity()) {
            setError("Informe um e-mail válido.")
            return
        }

        setError("")
        try {
            await api.post("/usuarios", { email, age, name })
            navigate("/Lista-de-usuarios")
        } catch {
            setError("Não foi possível cadastrar o usuário. Tente novamente.")
        }
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
                {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
                <Button onClick={registerNewUser} type="button" tema="primario">Cadastrar Usuarios</Button>
            </Form>

            <Button type="button" onClick={()=> navigate("/Lista-de-usuarios")}>Ver Lista de Usuarios</Button>
        </Container>
    )
}

export default Home

