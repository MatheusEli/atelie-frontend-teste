import { NavLink } from "react-router-dom";
export default function Header({resultRef}) {
  const form = () => {
    resultRef.current.scrollIntoView({ behavior: "smooth"});
  };

  return (
    <header className="header">
      <div className="header__button-box">
        <NavLink to="/">
          <button className="header__button" onClick={form}>LOGIN</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="header__button" onClick={form}>CADASTRE-SE</button>
        </NavLink>
      </div>
    </header>
  );
}
