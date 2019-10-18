import * as React from "react";
const { useEffect, useState } = React;

export const sleep = (time: number): Promise<unknown> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });

export const App = () => {
  const [text, setText] = useState("wait for it ...");

  useEffect(() => {
    sleep(1000).then(res => {
      setText("Hello world!");
    });
  }, []);

  return <div>{text}</div>;
};
