import * as React from "react";
const { useEffect, useState } = React;

export const sleep = (time: number): Promise<unknown> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });

export const App = () => {
  const [text, setText] = useState("...");

  useEffect(() => {
    sleep(1000).then(res => {
      setText("React Typescript w/ Rollup");
    });
  }, []);

  return (
    <div>
      <div>
        <a
          href="https://github.com/peterDijk/react-typescript-rollup-starter"
          target="_blank"
        >
          <img src="images/GitHub-Mark-Light-32px.png" />
        </a>
      </div>
      {text}
    </div>
  );
};
