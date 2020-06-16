/* eslint-env browser */
import { data } from './data-example.js';
import ComponentDisplay from './componentDisplay';
import { createTree } from './createTree';
import * as d3 from '../../libraries/d3.js';

// Instantiate the Panel

const theInfoPanel = document.getElementById('info-panel');
const CompDisplay = new ComponentDisplay(theInfoPanel);

// ########################################## CREATE PORT CONNECTION WITH BACKGROUND.JS
const port = chrome.runtime.connect({ name: 'test' });
port.postMessage({
  name: 'connect',
  tabID: chrome.devtools.inspectedWindow.tabId,
});

port.onMessage.addListener((message) => {
  // if (!message.data) return;
  console.log('message received by panel ', message);
  if (typeof message === 'object') {
    createTree(message, CompDisplay);
  } else {
    d3.select('#error-message')
      .style('visibility', 'visible')
      .text(message)
  }
  
});

chrome.runtime.sendMessage({
  name: 'inject-script',
  tabID: chrome.devtools.inspectedWindow.tabId,
});

// For testing
// createTree(data[0], CompDisplay)
