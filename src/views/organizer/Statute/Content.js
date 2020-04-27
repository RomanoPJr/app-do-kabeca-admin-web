import React from "react";
const Content = ({ data }) => {
  return (
    <div className="statute-suggestion-container">
      <div className="statute-suggestion-content">
        {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
      </div>
    </div>
  );
};

export default Content;
