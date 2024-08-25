import { createContext, useState } from "react"

export const AuthContext = createContext()

function AuthContextProvider(props) {

    const [state, setState] = useState({
        authenticated: false,
        account: '',
        role: ''
    })

    const authenticate = (_account, _role) => {
        setState({
            ...state, ...{
                authenticated: true,
                account: _account,
                role: _role
            }
        })

    }

    const deauthenticate = () => {
        setState({
            ...state, ...{
                authenticated: false,
                account: '',
                role: ''
            }
        })
    }

    const updateAuth = (data) => {
        setState({ ...state, ...data })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state, ...{
                    authenticate,
                    deauthenticate,
                    updateAuth,

                }
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
