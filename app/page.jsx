import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Descubra & Compartilhe
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        Prompt alimentado por IA
      </span>
    </h1>
    <p className="desc text-center">
      Prompts é uma ferramenta de solicitação de IA de código aberto para o
      mundo moderno descobrir, criar e compartilhar solicitações criativas
    </p>
    <Feed />
  </section>
);

export default Home;
