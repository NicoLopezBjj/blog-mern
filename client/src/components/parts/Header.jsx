import '../../App.css';

function Header() {
  return (
    <header>
        <h1>blog mern.</h1>
        <div className="header-btns">
            <button className="header-btn signin-btn">Iniciar sesión</button>
            <button className="header-btn signup-btn">Crear cuenta</button>
        </div>
    </header>
  );
}

export default Header;