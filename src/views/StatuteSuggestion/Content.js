import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";
const Content = ({ list }) => {
  return (
    <div className="statute-suggestion-container">
      <div className="statute-suggestion-content">
        {list && <div dangerouslySetInnerHTML={{ __html: list }} />}
      </div>
    </div>
  );
};

export default Content;
