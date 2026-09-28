import {Button} from './styles.js'

function DefaultButton({children, ...props}){
    console.log(props)

    return(
        <Button {...props}>{children}</Button>
    )
}

export default DefaultButton