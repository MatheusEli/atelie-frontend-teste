import { useState, useEffect } from "react";
import Modal from "../Modal";
import { taxValidation } from "../../utils/utils";
import { NavLink } from 'react-router-dom';

export default function LogInForm() {
  const [dados, setDados] = useState({
    tax_id: "",
    password: "",
  });

  useEffect(() => {
    const { tax_id, password } = dados;

    const todosCamposPreenchidos =
      tax_id.trim() !== "" && password.trim() !== "";

    setEnvioHabilitado(todosCamposPreenchidos);
  }, [dados]);

  const handleChange = (name, value) => {
    if (name === "tax_id") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    setDados({
      ...dados,
      [name]: value,
    });
  };

  const [message, setMessage] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [envioHabilitado, setEnvioHabilitado] = useState(false);

  const closeModal = () => {
    setModalVisivel(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage("Logado com sucesso!");
      setModalVisivel(true);
      clear();
    } catch (error) {
      console.log(error);
      setMessage("Não foi entrar");
    }

    clear();
  };

  const clear = () => {
    setDados({
      tax_id: "",
      password: "",
    });
  };
  return (
    <>
      {modalVisivel && <Modal message={message} onClose={closeModal} />}
      <section className="form-section">
        <h3 className="form-section__title">LOGIN</h3>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-box">
            <input
              placeholder="Digite seu CPF"
              type="text"
              value={dados.tax_id}
              onChange={(event) => handleChange("tax_id", event.target.value)}
              className={
                dados.tax_id && taxValidation(dados.tax_id)
                  ? ""
                  : "campo-obrigatorio"
              }
            />

            {dados.tax_id && taxValidation(dados.tax_id) ? (
              ""
            ) : (
              <p
                style={{
                  marginTop: ".5rem",
                  color: "#e5a52c",
                  letterSpacing: ".5px",
                }}
              >
                Digite um CPF válido
              </p>
            )}
          </div>

          <div className="form__input-box" style={{ width: "100%" }}>
            <input
              placeholder="Digite sua senha"
              type="password"
              value={dados.password}
              onChange={(event) => handleChange("password", event.target.value)}
              className={dados.password ? "" : "campo-obrigatorio"}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              color: "#e5a52c",
            }}
          >
            <NavLink to="/signup"><p>Ainda não é cadastrado?</p></NavLink>
            <p>Esqueceu sua senha?</p>
          </div>

          <button
            className="header__button form__button"
            disabled={!envioHabilitado}
          >
            ENTRAR
          </button>
        </form>
      </section>
    </>
  );
}
