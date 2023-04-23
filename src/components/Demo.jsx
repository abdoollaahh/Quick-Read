import React from "react";
import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };
  return (
    <section className="mt-10 w-full max-w-xl">
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative mx-4 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="w-full rounded-md border px-2 py-3 text-xs shadow-md"
          />
          <button
            type="submit"
            className="m-2 rounded-md border border-orange-500 bg-transparent px-2 py-1 text-orange-500 shadow-sm transition duration-500 hover:bg-orange-500 hover:text-white hover:shadow-md"
          >
            Submit
          </button>
        </form>

        <div className="m-5  p-3">
          {isFetching ? (
            <p>Please wait while we summarize your article</p>
          ) : error ? (
            <p>Oops</p>
          ) : (
            article.summary && (
              <div>
                <h2 className="my-4 font-semibold">
                  Article{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Summary
                  </span>
                </h2>
                <div className="rounded-md bg-white/40 p-4 text-xs">
                  <p> {article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mx-5 overflow-auto ">
          <p className="font-semibold">History</p>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => {
                setArticle(item);
              }}
            >
              <p className="my-2 rounded-md bg-white p-2 text-xs text-sky-800 shadow-sm">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Demo;
