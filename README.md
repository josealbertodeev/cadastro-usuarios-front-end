<h1 align="center">Cadastro de Usuários (Frontend) 👥</h1>

<p align="center">
  Projeto de estudo em <b>React + Vite</b> para cadastrar, listar e excluir usuários, consumindo uma API REST.<br />
  O README segue a ordem do curso: cada seção explica o conceito e mostra onde ele aparece no código.
</p>

<p align="center">
  <img width="48%" alt="Tela de cadastro" src="https://github.com/user-attachments/assets/2b34cd18-41c6-4241-9999-3983812b002a" />
  <img width="48%" alt="Tela de listagem" src="https://github.com/user-attachments/assets/2031b1a1-c128-40a2-bbe3-cc933b137aec" />
</p>

## Funcionalidades

- Cadastrar usuário (nome, idade e e-mail) na tela **Home** (`/`)
- Listar usuários com avatar aleatório na tela **Lista de Usuários** (`/Lista-de-usuarios`)
- Excluir usuário clicando na lixeira

## Como rodar

```bash
yarn            # instala as dependências (ou: npm install)
yarn dev        # inicia o Vite em modo desenvolvimento
```

O frontend espera uma API em `http://localhost:3000` com as rotas `GET /usuarios`, `POST /usuarios` e `DELETE /usuarios/:id`. Ela precisa estar rodando para o app funcionar (veja [CORS](#16---cors)).

## Tecnologias

| Biblioteca | Para que serve |
| --- | --- |
| React 19 | Construir a interface com componentes |
| Vite | Servidor de desenvolvimento e build rápidos |
| styled-components | CSS escrito dentro do JavaScript |
| react-router | Navegação entre telas |
| axios | Requisições HTTP para a API |
| prop-types | Validação das props dos componentes |

## Estrutura de pastas

```
src/
├── assets/            # imagens e ícones
├── components/        # componentes reutilizáveis (Button, TopBackground)
├── pages/             # uma pasta por tela (Home, ListUsers)
│   └── Home/
│       ├── index.jsx  # lógica e JSX da tela
│       └── styles.js  # estilos da tela
├── services/api.js    # configuração do axios
├── styles/            # estilos globais
├── routes.jsx         # definição das rotas
└── main.jsx           # ponto de entrada
```

---

# Guia de estudo por tema

## 01 e 02 - Introdução ao React

**React** é uma biblioteca JavaScript para criar interfaces. Em vez de manipular o HTML diretamente, você descreve **como a tela deve ficar** para um dado estado, e o React atualiza o que mudou.

Ideias centrais:
- A interface é dividida em **componentes** (peças reutilizáveis).
- Os dados que mudam ficam em **estado**.
- Quando o estado muda, o React **re-renderiza** só o necessário.

## 03 e 04 - Yarn e iniciando o projeto

**Yarn** é um gerenciador de pacotes, assim como o npm. Ele baixa as bibliotecas listadas no `package.json`.

```bash
yarn add axios          # adiciona uma dependência
yarn dev                # roda o script "dev" do package.json
```

O projeto foi criado com **Vite**, que serve a aplicação com recarregamento instantâneo (HMR).

## 05 - Estrutura de um projeto React

- `index.html`: página única onde o React é montado.
- `src/main.jsx`: encontra o `<div id="root">` e renderiza o app nele.
- `package.json`: lista dependências e scripts.

## 08 - JSX e a estrutura de um componente

**JSX** é a sintaxe que mistura HTML dentro do JavaScript. Um componente é uma **função que retorna JSX**, com nome começando em maiúscula.

```jsx
function Home() {
    return (
        <Container>
            <Title>Cadastrar Usuario</Title>
        </Container>
    )
}
export default Home
```

Regras importantes:
- Um componente retorna **um único elemento raiz** (use um `<div>` ou `<>...</>`).
- Código JavaScript vai entre chaves: `<p>Nome: {user.name}</p>`.
- Atributos usam camelCase: `onClick`, `className`.
- Para exibir listas, use `.map()` e dê uma `key` única a cada item:

```jsx
{users.map(user => (
    <CardUsers key={user.id}>...</CardUsers>
))}
```

## 09 e 10 - CSS no React e estilos globais

Aqui o CSS é escrito com **styled-components**: cada estilo vira um componente.

```js
import styled from "styled-components"

export const Title = styled.h2`
    color: white;
`
```

Usa-se como qualquer componente: `<Title>Texto</Title>`.

**Estilos globais** valem para a aplicação toda. Ficam em [src/styles/GlobalStyles.js](src/styles/GlobalStyles.js) e usam `createGlobalStyle`:

```js
export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`
```

Esse componente é renderizado uma vez em [src/main.jsx](src/main.jsx), ao lado do `RouterProvider`.

## 11 e 12 - Tela de Cadastro

A tela [Home](src/pages/Home/index.jsx) tem um formulário com nome, idade e e-mail, e um botão que envia os dados à API. A parte visual (11) é feita com JSX, e a estilização (12) com styled-components em `styles.js`.

## 13 - Organizando o projeto

Regra prática adotada aqui:
- Cada **página** tem a própria pasta com `index.jsx` (lógica) e `styles.js` (estilo).
- O que se repete em várias telas vira **componente** em `components/` (ex.: `Button`, `TopBackground`).
- Código que fala com o servidor fica em `services/`.

Ter uma pasta por componente facilita achar e manter o código.

## 14 - useRef

`useRef` guarda uma **referência a um elemento do HTML** (ou qualquer valor) sem causar nova renderização. É usado aqui para ler o que foi digitado nos inputs:

```jsx
const inputName = useRef()

<Input type="text" ref={inputName} />

// depois, ao clicar em cadastrar:
inputName.current.value   // texto digitado
```

`.current` aponta para o elemento real do DOM.

## 15 - Conectando com a API

Usamos o **axios** para fazer requisições HTTP. Criamos uma instância com a URL base em [src/services/api.js](src/services/api.js):

```js
const api = axios.create({
    baseURL: "http://localhost:3000"
})
```

Os métodos seguem os verbos HTTP:

| Ação | Código | Requisição |
| --- | --- | --- |
| Listar | `api.get("/usuarios")` | `GET /usuarios` |
| Criar | `api.post("/usuarios", dados)` | `POST /usuarios` |
| Excluir | ``api.delete(`/usuarios/${id}`)`` | `DELETE /usuarios/1` |

Como são operações demoradas, usamos **`async/await`**: o `await` espera a resposta antes de continuar.

```jsx
async function registerNewUser() {
    await api.post("/usuarios", {
        email: inputEmail.current.value,
        age: parseInt(inputAge.current.value),
        name: inputName.current.value
    })
    navigate("/Lista-de-usuarios")
}
```

> `parseInt` converte a idade, que vem do input como texto, em número.

## 16 - CORS

**CORS** (Cross-Origin Resource Sharing) é uma regra de segurança do navegador. O frontend roda em uma origem (ex.: `localhost:5173`) e a API em outra (`localhost:3000`). Por padrão o navegador **bloqueia** essa chamada, a menos que a API diga que permite.

A correção é feita **no backend**, habilitando o CORS (por exemplo, com o pacote `cors` no Express). Se você vir o erro `blocked by CORS policy` no console, o problema está na configuração da API, não no React.

## 17 e 22 - Rotas e React Router

Rotas fazem cada **URL mostrar uma tela diferente**, sem recarregar a página (SPA, Single Page Application).

Em [src/routes.jsx](src/routes.jsx):

```jsx
const router = createBrowserRouter([
    { path: "/",                  element: <Home /> },
    { path: "/Lista-de-usuarios", element: <ListUsers /> }
])
```

No `main.jsx` o router é entregue ao app com `<RouterProvider router={router} />`.

Para navegar por código, usamos o hook `useNavigate`:

```jsx
const navigate = useNavigate()
navigate("/Lista-de-usuarios")
```

Na Home isso é usado após cadastrar, e na lista, para voltar com `navigate("/")`.

## 18 - Componentes

Componente é uma **peça de interface reutilizável**. Em vez de repetir o mesmo botão em todas as telas, criamos o `Button` uma vez e usamos em vários lugares.

Vantagens: menos repetição, manutenção em um só lugar e telas mais legíveis.

## 19 - Propriedades (props)

**Props** são os parâmetros de um componente. Quem usa passa os valores, e o componente os recebe como argumento:

```jsx
<Button type="button" tema="primario">Cadastrar Usuarios</Button>
```

```jsx
function DefaultButton({ children, tema, ...props }) {
    return <Button {...props} tema={tema}>{children}</Button>
}
```

- `children` é o conteúdo escrito entre as tags (aqui, o texto do botão).
- `...props` junta todas as outras props (`onClick`, `type`...) para repassá-las ao botão.

## 20 - PropTypes

**PropTypes** valida em tempo de desenvolvimento se as props recebidas têm o tipo esperado. Se algo vier errado, o console avisa.

```jsx
import PropTypes from 'prop-types'

DefaultButton.propTypes = {
    children: PropTypes.node.isRequired,  // obrigatório
    tema: PropTypes.string                // opcional
}
```

## 21 - Alterando props dos componentes (estilo condicional)

Uma prop pode mudar a **aparência** do componente. Aqui, `tema` é repassada ao styled-component e o CSS decide o visual com base nela ([Button/styles.js](src/components/Button/styles.js)):

```js
export const Button = styled.button`
    border: ${(props) => props.tema === "primario" ? "none" : "1px solid #fff"};
    background: ${(props) => props.tema === "primario"
        ? "linear-gradient(180deg, #FE7E5D 0%, #FF6378 100%)"
        : "transparent"};
`
```

Assim o mesmo `Button` tem variações (preenchido com gradiente ou apenas com borda) sem criar outro componente.

## 23 - useEffect

`useEffect` executa código **em momentos específicos do ciclo de vida** do componente, normalmente para efeitos colaterais como buscar dados.

```jsx
useEffect(() => {
    async function getUsers() {
        const { data } = await api.get("/usuarios")
        setUsers(data)
    }
    getUsers()
}, [])
```

O array no final (as **dependências**) controla quando roda:

| Dependências | Quando executa |
| --- | --- |
| `[]` | Uma vez, quando o componente aparece na tela |
| `[valor]` | Na primeira vez e sempre que `valor` mudar |
| omitido | A cada renderização (evite) |

Aqui, ao abrir a lista, os usuários são buscados uma única vez.

## 24 - useState

`useState` cria uma **variável de estado**. Ao alterá-la com a função setter, o React re-renderiza o componente.

```jsx
const [users, setUsers] = useState([])
//     valor  função que altera   valor inicial
```

Regras:
- Nunca altere o estado diretamente (`users.push(...)`). Use sempre o `setUsers`.
- Uma variável comum (`let`) **não** atualiza a tela. O estado, sim.

`useEffect` e `useState` trabalham juntos: o efeito busca os dados e o estado os guarda para a tela exibir.

## 25 - Aula chave (o fluxo completo)

Juntando tudo na lista de usuários:

1. A tela renderiza com `users = []`.
2. O `useEffect` roda e chama a API.
3. A resposta vai para o estado com `setUsers(data)`.
4. O React re-renderiza e o `.map()` desenha um card por usuário.

Esse padrão (**renderiza, busca, guarda no estado, renderiza de novo**) é a base da maioria das telas que consomem API.

## 26 - Estilizando a lista de usuários

Cada usuário é um card (`CardUsers`) com avatar, dados e ícone de lixeira, todos styled-components em [src/pages/ListUsers/styles.js](src/pages/ListUsers/styles.js).

O avatar é gerado por uma API pública (DiceBear), que recebe o `id` como `seed` e devolve sempre o mesmo desenho para ele:

```jsx
<AvatarUser
    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`}
    alt={`Avatar de ${user.name}`}
/>
```

## 27 - Deletando usuários

```jsx
async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    const updatedUsers = users.filter(user => user.id !== id)
    setUsers(updatedUsers)
}

<TrashIcon src={Trash} onClick={() => deleteUsers(user.id)} />
```

Passo a passo:
1. `api.delete` remove o usuário **no servidor**.
2. `filter` cria uma nova lista **sem** o usuário excluído (não altera a original).
3. `setUsers` atualiza o estado, e o card some da tela sem recarregar.

Atenção ao `onClick={() => deleteUsers(user.id)}`: a arrow function é necessária. Com `onClick={deleteUsers(user.id)}` a função rodaria durante a renderização, e não no clique.

---


