import React from 'react';
import { DOMMessage, DOMMessageResponse } from './types';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
        });
    });
  });

  return (
    <div className={"m-12"}>
      <div className={"mt-4 mb-4"}>
        <h1 className={"text-xl text-center text-slate-100"}>SEO Extension built with React!</h1>
      </div>
      <div className={"pl-2 pr-2"}>
        <ul className={"list-none"}>

          <li>
            <span className={"text-lg text-slate-50"}>Title</span>
            <span className={`text-lg ${title.length < 30 || title.length > 65 ? 'text-red-500' : 'text-slate-50'}`}>
              &nbsp;{title.length} Characters
            </span>
            <div className={"text-sm text-slate-100"}>{title}</div>
          </li>

          <li>
            <span className={"text-lg text-slate-50"}>Main Heading</span>
            <span className={`text-lg ${headlines.length !== 1 ? 'text-red-500' : 'text-slate-50'}`}>
              &nbsp;{headlines.length}
            </span>
            <div>
              <ul className={"p-2 list-decimal list-inside"}>
                {headlines.map((headline, index) => (<li key={index} className={"text-slate-100 text-sm"}>{headline}</li>))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
