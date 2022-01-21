import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseconfig";

const Menu = () => {
  const historial = useHistory();
  const [usuario, setUsuario] = useState(null);
  const [isUsuarioLogueado, setIsUsuarioLogueado] = useState(false);

  const cerrarSesion = () => {
    signOut(auth);
    setUsuario(null);
    setIsUsuarioLogueado(false);
    historial.push("/login");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setIsUsuarioLogueado(true);
      } else {
        setUsuario(null);
        setIsUsuarioLogueado(false);
      }
    });
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          {!isUsuarioLogueado ? (
            <li className="nav-item" disabled={isUsuarioLogueado}>
              <Link
                className="nav-link"
                to="/login"
                disabled={isUsuarioLogueado}
              >
                Login
              </Link>
            </li>
          ) : (
            <li />
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
        </ul>
        <button
          className="btn btn-danger"
          disabled={!isUsuarioLogueado}
          onClick={cerrarSesion}
        >
          Cerrar Sesion
        </button>
      </nav>
    </div>
  );
};

export default Menu;
