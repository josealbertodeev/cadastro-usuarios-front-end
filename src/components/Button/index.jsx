import {Button} from './styles.js'
import PropTypes from 'prop-types'

function DefaultButton({children, tema, ...props}){

    return(
        <Button {...props} tema={tema}>{children}</Button>
    )
}

DefaultButton.propTypes = {
    children: PropTypes.node.isRequired,
    tema: PropTypes.string
}

export default DefaultButton