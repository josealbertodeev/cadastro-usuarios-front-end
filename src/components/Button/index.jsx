import {Button} from './styles.js'
import PropTypes from 'prop-types'

function DefaultButton({children, ...props}){

    return(
        <Button {...props}>{children}</Button>
    )
}

DefaultButton.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultButton