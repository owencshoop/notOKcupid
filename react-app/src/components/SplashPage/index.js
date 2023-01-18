import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import SignUpForm from "../SignUpUpdateForm/SignUpForm"
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div className="splash-page">
           <div className="splash-left">
            <div className="splash-banner">
                <h1>LOOKING FOR SOMEBODY</h1>
                <h1>COMPLETELY DIFFERENT?</h1>
            </div>
            <div className="splash-text">
                <h2>
                    Tired of talking to the same kinds of people?
                    Wanting a break from the same feeback loops of 
                    mainstream dating sites?
                    Are you a superhero in search of your arch-nemesis?
                </h2>
            </div>
            {/* <NavLink
                to="/sign-up"
                exact={true}
                className='signup-link'
            >
            Join notOKcupid
            </NavLink> */}
                <OpenModalButton
                    buttonText="Join notOKcupid"
                    modalComponent={<SignUpForm />}
                    className="login-open-button"
                />
           </div>
           <div className="splash-right">
                {/* <img alt='splash' src='../../assets/image.png' /> */}
           </div>

        </div>
    )
}

export default SplashPage