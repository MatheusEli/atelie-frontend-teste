import { useState, useEffect } from "react";
import Modal from "../Modal";
import axios from "axios";
import { taxValidation } from "../../utils/utils";

export default function SignUpForm() {
  const [dados, setDados] = useState({
    name: "",
    email: "",
    tax_id: "",
    password: "",
    password_confirmation: "",
    company: "",
    segment: "",
  });

  useEffect(() => {
    const {
      name,
      email,
      tax_id,
      password,
      password_confirmation,
      company,
      segment,
    } = dados;

    const todosCamposPreenchidos =
      name.trim() !== "" &&
      email.trim() !== "" &&
      tax_id.trim() !== "" &&
      password.trim() !== "" &&
      password_confirmation.trim() !== "" &&
      company.trim() !== "" &&
      segment.trim() !== "";

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
      await axios.post(
        process.env.REACT_APP_ATELIE_URL,
        {
          name: dados.name,
          email: dados.email,
          tax_id: dados.tax_id.replace(/[.-]/g, ""),
          password: dados.password,
          password_confirmation: dados.password_confirmation,
          company: dados.company,
          segment: dados.segment
        }
      );
      setMessage("Cadastro realizado com sucesso!");
      setModalVisivel(true);
      clear();
    } catch (error) {
      console.log(error)
      setMessage("Não foi possível realizar o cadastro");
    }

    clear();
  };

  const clear = () => {
    setDados({
      name: "",
      email: "",
      tax_id: "",
      password: "",
      password_confirmation: "",
      company: "",
      segment: "",
    });
  };

  return (
    <>
      {modalVisivel && <Modal message={message} onClose={closeModal} />}
      <section className="form-section">
        <h3 className="form-section__title">CADASTRE-SE</h3>
        <p className="form-section__text">
          Preencha os campos abaixo para validar sua participação na campanha e
          concorrer aos prêmios.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-box">
            <label className="">Nome</label>
            <input
              type="text"
              value={dados.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className={dados.name ? "" : "campo-obrigatorio"}
            />
          </div>

          <div className="form__input-box">
            <label className="">CPF</label>
            <input
              placeholder="000.000.000-00"
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

          <div className="form__input-box">
            <label className="">E-mail</label>
            <input
              type="email"
              value={dados.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className={dados.email ? "" : "campo-obrigatorio"}
            />
          </div>

          <div className="form__input-box">
            <label className="">Senha</label>
            <input
              placeholder="Digite sua senha"
              type="password"
              value={dados.password}
              onChange={(event) => handleChange("password", event.target.value)}
              className={dados.password ? "" : "campo-obrigatorio"}
            />
            {dados.password === dados.password_confirmation ? (
              ""
            ) : (
              <p
                style={{
                  marginTop: ".5rem",
                  color: "$color-yellow",
                  letterSpacing: ".5px",
                }}
              >
                As senhas não correspondem
              </p>
            )}
          </div>

          <div className="form__input-box">
            <label className="">Senha</label>
            <input
              placeholder="Confirme sua senha"
              type="password"
              value={dados.password_confirmation}
              onChange={(event) =>
                handleChange("password_confirmation", event.target.value)
              }
              className={dados.password_confirmation ? "" : "campo-obrigatorio"}
            />
            {dados.password === dados.password_confirmation ? (
              ""
            ) : (
              <p
                style={{
                  marginTop: ".5rem",
                  color: "$color-yellow",
                  letterSpacing: ".5px",
                }}
              >
                As senhas não correspondem
              </p>
            )}
          </div>

          <div className="form__input-box">
            <label className="">Empresa</label>
            <input
              placeholder="Empresa"
              type="text"
              value={dados.company}
              onChange={(event) => handleChange("company", event.target.value)}
              className={dados.company ? "" : "campo-obrigatorio"}
            />
          </div>

          <div className="form__input-box">
            <label className="">Classificação</label>
            <select
              onChange={(event) => handleChange("segment", event.target.value)}
              className={dados.segment ? "" : "campo-obrigatorio"}
              value={dados.segment}
            >
              <option hidden={true}>Escolha sua categoria</option>
              <option>Gerente</option>
              <option>Revendedor</option>
              <option>Distribuidor</option>
            </select>
          </div>

          <button
            className="header__button form__button"
            disabled={!envioHabilitado}
          >
            Enviar
          </button>
        </form>
      </section>
    </>
  );
}
