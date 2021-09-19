import React, { useState, useEffect } from "react";
import { view, invoke } from "@forge/bridge";
import Button from "@atlaskit/button";

const Layout = ({ children, description, summary, issueKey }) => {
  const [context, setContext] = useState({});

  useEffect(() => {
    view.getContext().then(setContext);
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        flex: 1,
        height: "90vh",

        position: "relative",
      }}
    >
      <h1 className="modal-header">{"Sample App"}</h1>
      {children}
      <div
        style={{
          float: "right",
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: "1rem 1rem",
        }}
      >
        <div>
          <Button
            onClick={() => view.close()}
            appearance="subtle"
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>

          <Button
            onClick={async () => {
              await invoke("updateIssue", { description, summary, issueKey });
              view.close();
            }}
            appearance="primary"
            autoFocus
            // isDisabled={isAnnotating && isDisabled}
          >
            Save & Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
