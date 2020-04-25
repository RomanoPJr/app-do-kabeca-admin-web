import React from "react";
const Content = ({ list }) => {
  return (
    <div className="">
      <div className="">
        {list && <div dangerouslySetInnerHTML={{ __html: list }} />}
      </div>
    </div>
  );
};

export default Content;
