import ImageUsuarios from "../../assets/users.png"
import { Background } from "./styles.js"

function TopBackground() {
    return (
        <Background>
            <img src={ImageUsuarios} alt="Imagem de usuarios"></img>
        </Background>
    )
}

export default TopBackground