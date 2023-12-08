import LogoCampanhaRed from "../../assets/logo-campanha-red.svg";

export default function Info() {
  return (
    <section className="info-section">
      <div className="info-section__text-box">
        <h6 className="info-section__title">
          Só quem vende curte as experiências mais diferentonas!
        </h6>
        <p className="info-section__text">
          *Campanha válida de 01/02 e 31/03/2020. Vendas via Business Center e
          para o Setor Público não serão válidas. A apuração do mês de agosto
          será retroativa. Imagens meramente ilustrativas. Realizamos todos os
          esforços para garantir a precisão das informações, mas não somos
          responsáveis por qualquer conteúdo editorial fotográfico ou por erros
          tipográficos. Todas as imagens são apenas para fins ilustrativos. Para
          especificações completas de produto informações de serviços e
          garantias visite www.umbrindenaeuropa.com/saiba. Não fazemos nenhuma
          representação ou garantia em relação a produtos ou serviços de
          terceiros. Outros nomes de empresas produtos e serviços podem ser
          marcas registradas ou marcas de serviços de terceiros &copy; 2020.
          Todos os direitos reservados.
        </p>
      </div>

      <img src={LogoCampanhaRed} alt="Logo Campanha" />
    </section>
  );
}
