import { NavLink } from "react-router-dom"

const SplashPage = () => {
    return (
        <div>
            <NavLink
                to="/sign-up"
                exact={true}
                className='signup-link'
            >
                SignUp
            </NavLink>
        </div>
    )
}

export default SplashPage