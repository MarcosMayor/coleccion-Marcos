import React from 'react'
import Button from '@mui/material/Button'
import { Avatar, Box, Grid, Paper, TextField, } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux'
import { loginActions } from '../store/storelogin';


function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState({ user: '', pass: '' })

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.pass}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    /*
                    se puede hacer con if response.data.nombre == undefinded
                    */
                    if (Object.keys(response.data).length === 0) {
                        console.log('Datos incorrectos')
                    } else {
                        console.log(response)
                        dispatch(loginActions.login({
                            name: response.data.nombre,
                            rol: response.data.rol
                        }))
                        navigate('/home')
                    }

                }
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (login.user.length !== 0 && login.pass.length !== 0) {
            isVerifiedUser()
        } else {
            console.log(`El usuario o la contraseña estan vacios`)
        }

    }

    return <>
        <Grid container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3} md={3} l={2} xl={2}>
                <Paper id='paper'>
                    <Grid container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar >
                            <LockIcon color="error" />
                        </Avatar>
                        <Box id='caja' component='form' onSubmit={handleSubmit}>
                            <TextField
                                id='login'
                                label='Usuario'
                                variant='outlined'
                                fullWidth
                                autoFocus
                                onChange={(event) => { setLogin({ ...login, user: event.target.value }) }}
                            />
                            <br />
                            <TextField
                                id='password'
                                label='Contraseña'
                                variant='outlined'
                                type='password'
                                fullWidth
                                onChange={(event) => { setLogin({ ...login, pass: event.target.value }) }}
                            />
                            <Button
                                id='boton'
                                type="submit"
                                variant='contained'
                                fullWidth
                            >
                                Acceder
                            </Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>
}
export default Login

/*
<Container>
    <Typography variant="h1" component="h2">App con typography</Typography>
    <Button color="success" variant="contained"> Hola </Button>
</Container>

const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.pass}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response)
                }
            })
    }
*/