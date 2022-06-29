import { useRef, useEffect } from "react";
import Link from "next/link";
import { prevent, sortByTimestampDesc } from "../src/util";
import useInputSynced from "../src/hooks/use-input-synced";
import { AiFillGithub, HiOutlineExternalLink } from "../components/icons";
import Modal from "../components/Modal/Modal";
import {
  useAppData,
  useFlags,
  useArticles,
  //
  API_URL,
  APP_NOTIFICATION,
  DISPAY_ARTICLE,
  FLAG_FEEDS_LOADING,
} from "../app/store";
import axios from "axios";
import { useQueryClient } from "react-query";
////
////
export default function Index() {
  //
  const refInput = useRef();
  const qClient = useQueryClient();
  const { inputs, sync, setInput } = useInputSynced({ feed: "" });
  const { articles } = useArticles();
  const resetInput = () => setInput("feed", "");
  //
  const flags = useFlags();
  const flagFeedsLoading = flags(FLAG_FEEDS_LOADING);
  //
  const appdata = useAppData();
  const displayArticle = appdata(DISPAY_ARTICLE);
  const isOpenArticleModal = null != displayArticle;
  const closeArticleModal = () => appdata.set(DISPAY_ARTICLE, null);

  //
  const onSubmit = async () => {
    // skip if there is a request pending
    if (flagFeedsLoading) return;
    //
    const feed = String(inputs?.feed || "").trim();
    // try loading whaterver input
    // display loaded articles
    // ignore invalid input
    // fetch new feeds @/api/import?siteRssUrl=feed
    flags.on(FLAG_FEEDS_LOADING);
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/articles/import/?siteRssUrl=${encodeURI(feed)}`,
      });
      //
      // handle load success
      // ignore invalid inputs
      // refresh view
      if (
        "ok" === String(res?.statusText).toLocaleLowerCase() &&
        0 === res?.data?.error
      ) {
        // articles loaded
        // refresh view
        qClient.invalidateQueries("articles");
        appdata.set(APP_NOTIFICATION, {
          key: Date.now(),
          notification: "✅ | Default feeds have been successfully loaded.",
        });
      } else {
        //
        // debug networking
        console.log(res);
        appdata.set(APP_NOTIFICATION, {
          key: Date.now(),
          notification: "💣 404 | Failed to load rss feed.",
        });
      }
    } finally {
      flags.off(FLAG_FEEDS_LOADING);
      resetInput();
    }
  };
  //
  useEffect(() => {
    refInput.current.focus();
  }, []);
  //
  return (
    <>
      {/* AppBar */}
      <div
        style={{ zIndex: 1 }}
        className="fixed top-0 inset-x-0 bg-gradient-to-b from-slate-600 to-slate-700 shadow"
      >
        <form
          className="p-1 py-2 sm:w-11/12 md:w-10/12 mx-auto"
          noValidate
          autoComplete="off"
          onSubmit={prevent(onSubmit)}
        >
          <div className="flex">
            <input
              onChange={sync}
              value={inputs.feed}
              type="text"
              name="feed"
              className="text-white sm:pl-12 inputRss input-underline placeholder:italic placeholder:text-white/70"
              placeholder="load rss url..."
              ref={refInput}
            />
            <button
              className={`text-sm sm:text-base text-slate-500 active:bg-slate-500 active:text-white italic ml-2 md:ml-4 lg:ml-8 bg-slate-100 hover:bg-slate-200 px-2 sm:px-4 w-48 sm:w-64 rounded-t-2xl ${
                flagFeedsLoading ? "cursor-not-allowed !opacity-50" : ""
              }`}
              type="submit"
            >
              load articles
            </button>
            <Link href="/about">
              <button
                className="text-sm sm:text-base text-slate-400 active:bg-slate-500 active:text-white italic ml-px bg-slate-100 hover:bg-slate-200 px-4 w-24 sm:w-32 rounded-t-2xl"
                type="button"
              >
                about
              </button>
            </Link>
            <a
              className="flex items-center justify-center text-slate-400 italic ml-px sm:ml-4 bg-slate-100 hover:bg-slate-200 px-2 sm:px-4 rounded-t-2xl"
              href="https://github.com/nikolav/demo-app-enyosolutions"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AiFillGithub style={{ fontSize: 24 }} />
            </a>
          </div>
        </form>
      </div>
      {/*  */}
      {/* show articles */}
      {articles ? (
        0 == articles.length ? (
          <p>no articles</p>
        ) : (
          <ul className="px-2 sm:px-6 sm:pt-24 md:px-8 lg:px-12 xl:px-24 pt-20 list-none space-y-2 sm:space-y-4 p-1">
            {articles
              .sort(sortByTimestampDesc("publicationDate"))
              .map((article) => (
                <ArticleItem key={article.id} article={article} />
              ))}
          </ul>
        )
      ) : (
        <p>loading...</p>
      )}
      {/*  */}
      <h1 className="hidden">welcome</h1>
      {/*  */}
      {/* display selected article from context */}
      <Modal isOpen={isOpenArticleModal} onClose={closeArticleModal}>
        <div className="h-full overflow-y-auto">
          <div className="prose p-2 sm:p-6">
            <h4>{displayArticle?.title}</h4>
            <article
              dangerouslySetInnerHTML={{ __html: displayArticle?.description }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

function ArticleItem({ article }) {
  const appdata = useAppData();
  const openArticleModal = () => appdata.set(DISPAY_ARTICLE, article);
  //
  return (
    <li
      onClick={openArticleModal}
      className="shadow bg-slate-100/50 hover:bg-slate-100 flex items-start rounded-xl overflow-hidden cursor-zoom-in relative"
    >
      <a href={article.link} target="_blank" rel="noreferrer noopener">
        <HiOutlineExternalLink
          style={{
            fontSize: 20,
          }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-10 hover:opacity-40 hover:scale-110 transition-transform duration-75"
        />
      </a>
      <div className="w-32 shrink-0">
        <img
          className="w-full h-full block object-cover"
          src={article.mainPicture}
          alt=""
        />
      </div>
      <div className="p-2 pl-4 truncate">
        <h2 className="text-sm">{article.title}</h2>
        <small className="text-xs opacity-30 italic">
          {dateFormated(article.publicationDate)}
        </small>
      </div>
    </li>
  );
}
function dateFormated(pubDate) {
  return new Date(pubDate).toLocaleDateString();
}
/*

  id               int not null auto_increment primary key, 
  description      text, 
  externalId       varchar(500),
  importDate       datetime not null default current_timestamp,
  link             text, 
  mainPicture      text,
  publicationDate  datetime,
  title            text,


*/
