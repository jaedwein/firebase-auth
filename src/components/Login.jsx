import React, { useState } from "react";
import { auth } from "../firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const historial = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState(null);

  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      //      console.log(auth);
      await createUserWithEmailAndPassword(auth, email, password);
      setMensajeError(null);
      alert("Usuario Creado");
      historial.push("/");
    } catch (e) {
      //      console.log(e.code);
      switch (e.code) {
        case "auth/email-already-in-use":
          setMensajeError("El mail ya está en uso");
          //          console.log("El mail ya está en uso");
          break;
        case "auth/invalid-email":
          setMensajeError("Mail inválido");
          //        console.log("Mail inválido");
          break;
        case "auth/weak-password":
          setMensajeError("Contraseña muy simple");
          //      console.log("Contraseña muy simple");
          break;
        case "auth/internal-error":
          setMensajeError("Error interno del servidor");
          //    console.log("Error interno del servidor");
          break;
        default:
          console.log(e.code);
          break;
      }
    }
  };

  const iniciarSesion = () => {
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setMensajeError(null);
        historial.push("/");
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/internal-error":
            setMensajeError("Error de autenticacion");
            break;
          case "auth/wrong-password":
            setMensajeError("Password incorrecto");
            break;
          case "auth/user-not-found":
            setMensajeError("Usuario no encontrado");
            break;
          case "auth/invalid-email":
            setMensajeError("Mail invalido");
            break;
          default:
            break;
        }
      });
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col mb-3">
        <form
          onSubmit={(e) => {
            registrarUsuario(e);
          }}
          className="form-group"
        >
          <div className="mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Ingresa el email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="form-control mt-4"
            />
          </div>
          <div className="mb-3 d-grid gap-2">
            <input
              type="submit"
              value="Registrar Usuario"
              className="btn btn-secondary mt-4 btn-block"
            />
          </div>
        </form>
        <div className="mb-3 d-grid gap-2">
          <button
            onClick={() => iniciarSesion()}
            className="btn btn-success btn-block"
          >
            Iniciar Sesion
          </button>
        </div>
        {mensajeError ? (
          <div
            class="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>{mensajeError}</div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
