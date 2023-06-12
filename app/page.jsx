import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="w-full head_text text-center">
      Descubra & Compartilhe
      <div className="w-full orange_gradient text-center">
        Prompt alimentado por IA
      </div>
    </h1>
    <p className="desc text-center">
      Prompts é uma ferramenta de solicitação de IA de código aberto para o
      mundo moderno descobrir, criar e compartilhar solicitações criativas
    </p>
    <Feed />
  </section>
);

export default Home;
