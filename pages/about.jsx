import React from "react";
import Link from "next/link";
import { MdClose, AiFillGithub } from "../components/icons";

const about = () => {
  return (
    <div className="h-full flex items-center justify-center">
      {/*  */}
      {/* window */}
      <div className="relative w-full h-full sm:w-10/12 sm:h-[82%] lg:w-9/12 xl:w-8/12 bg-white sm:rounded-b-2xl sm:rounded-t shadow-md p-2 sm:p-4">
        {/*  */}
        <span className="absolute space-x-4 flex top-2 right-2 cursor-pointer sm:-top-9">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/nikolav/demo-app-enyosolutions"
          >
            <AiFillGithub
              style={{ fontSize: 32 }}
              className="opacity-60 sm:opacity-20 hover:opacity-80 hover:scale-110 transition-transform duration-75"
            />
          </a>
          <Link href="/">
            <MdClose
              style={{ fontSize: 32 }}
              className="opacity-60 sm:opacity-20 hover:opacity-80 hover:scale-110 transition-transform duration-75"
            />
          </Link>
        </span>
        {/*  */}
        {/* content */}
        <div className="prose">
          <h2 className="text-center">Welcome!</h2>
          <p>This is a simple rss reader test application.</p>
          <p>It provides one endpoint for reading articles, </p>
          <div>
            <pre>GET /api/articles</pre>
          </div>
          <p>and one second endpoint for fetching new feeds.</p>
          <div>
            <pre>POST /api/articles/import/?siteRssUrl</pre>
          </div>
          <p>Enjoy. Take care. 👋🏻</p>
        </div>
      </div>
    </div>
  );
};

export default about;
