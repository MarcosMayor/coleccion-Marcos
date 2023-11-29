import { Grid,Toolbar,AppBar,Container, Button, Typography, Tooltip } from "@mui/material"
import { Link } from "react-router-dom"
import AdbIcon from '@mui/icons-material/Adb'
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginActions } from "../store/storelogin";


function TopBar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)

    const logout = (e) => {
        e.preventDefault()
        dispatch(loginActions.logout())
        navigate('/')
    }

    return<>
    <AppBar position='relative' >
                <Container>
                    <Toolbar >
                        <Grid container style={{height:'70px'}}>
                            <Grid item xs={2} md={2} lg={2} style={{ paddingTop:20, }}>
                                {/*AdbIcon es un componente de la librería '@mui/icons-material/Adb' Elige uno diferente*/}
                                {userData.userRol === 'admin'? <AdbIcon /> : userData.userRol === 'user' && <AccessibilityIcon/>}
                                <Typography sx={{ display: 'inline' }}>Hola, {userData.userName}</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1} style={{paddingTop:20 }}>
                                {/*El componente <Link> es de la librería: react-router-dom*/}
                                {/*Sirve para ir a una página.*/}
                                <Link to='/home'>Inicio</Link>
                            </Grid>
                            {userData.userRol === 'admin'&&
                            <Grid item xs={1} md={1} lg={1} style={{paddingTop:20 }}>
                                <Link to='/informe'>Informe</Link>
                            </Grid>
                            }
                            <Grid item xs={1} md={1} lg={1} style={{ paddingTop:20 }}>
                                <Link to=''>Ayuda</Link>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} />
                            <Grid item xs={1} md={1} lg={1} style={{paddingTop:20}}>
                                <Tooltip title="Desconectar" arrow placement="bottom">
                                    <Button variant='contained' color="secondary" onClick={logout}>Salir</Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar >
    </>
}export default TopBar;