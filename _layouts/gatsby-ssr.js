const React = require("react");

// Adds a class name to the body element
exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents([
    <script
      data-host="https://microanalytics.io"
      data-dnt="false"
      src="https://microanalytics.io/js/script.js"
      id="ZwSg9rf6GA"
      async
      defer
    />,
  ]);
};
