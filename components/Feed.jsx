"use client";

import { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-1 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Estados de pesquisa
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [showReloadButton, setShowReloadButton] = useState(true);

  const fetchPosts = async () => {
    // Simulando o atraso na obtenção dos dados
    setTimeout(async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setAllPosts(data);
        setLoading(false); // Marca o carregamento como concluído após obter os dados
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
        setLoading(false); // Marca o carregamento como concluído, mesmo em caso de erro
      }
    }, 1500);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleReloadPromptCardList = () => {
    try {
      window.location.reload(); // Tentar recarregar a página
    } catch (error) {
    } finally {
      setShowReloadButton(false); // Ocultar o botão de recarregamento após o clique
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Pesquise uma tag ou um nome de usuário"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/*Prompts*/}
      <div className="black_btn mt-5">
        {!loading && showReloadButton && (
          <button onClick={handleReloadPromptCardList}>
            Recarregar Prompts
          </button>
        )}
      </div>
      {loading ? ( // Renderiza o ContentLoader enquanto os dados estão sendo carregados
        <ContentLoader
          viewBox="0 0 400 300"
          speed={2}
          backgroundColor="#b6b6b6  "
          foregroundColor="#ecebeb"
          style={{ marginTop: "90px", width: "100%" }}
        ></ContentLoader>
      ) : searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
