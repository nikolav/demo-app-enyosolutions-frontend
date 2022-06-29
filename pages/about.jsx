import React from "react";
import Link from "next/link";

const about = () => {
  return (
    <div>
      <Link href="/">
        <a className="">home</a>
      </Link>
      <p>@about</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        accusantium. Accusamus iure sed et adipisci nihil modi ut error possimus
        minus culpa corrupti ab provident, voluptatem alias consectetur
        assumenda perferendis.
      </p>
    </div>
  );
};

export default about;
