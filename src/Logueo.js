import React from "react";
import { app } from "./fb";
import { TextField, Button, Typography, Link, Box, Paper } from "@mui/material";

const Logueo = (props) => {
  const [isRegistrando, setIsRegistrando] = React.useState(false);

  const crearUsuario = (correo, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("usuario creado:", usuarioFirebase);
        props.setUsuario(usuarioFirebase);
      });
  };

  const iniciarSesion = (correo, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (isRegistrando) {
      crearUsuario(correo, password);
    }

    if (!isRegistrando) {
      iniciarSesion(correo, password);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={10} sx={{ p: 2, textAlign: 'center' }}>
        {/* Contenedor del logo centrado */}
        <div style={{ margin: '0 auto', width: '300px' }}>
          {/* Imagen del logo */}
          <img src="https://3dwarehouse.sketchup.com/warehouse/v1.0/content/public/1af08ee3-5267-459c-8467-9e4b2db48a66" alt="Logo" style={{ width: '100%', marginBottom: '-30px' }} />
        </div>

        <Typography variant="h4" align="center" gutterBottom>
          {isRegistrando ? "Regístrate" : "Inicia sesión"}
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            id="emailField"
            label="Correo"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="passwordField"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            {isRegistrando ? "Regístrate" : "Inicia sesión"}
          </Button>
        </form>
        <Button onClick={() => setIsRegistrando(!isRegistrando)} fullWidth sx={{ mt: 2 }}>
          {isRegistrando
            ? "¿Ya tienes cuenta? ¡Inicia sesión"
            : "¿No tienes cuenta? ¡Regístrate gratis!"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Logueo;