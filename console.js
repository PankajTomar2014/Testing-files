const myConsole = (msg, color, bgcolor)=> {
  console.log(`%c ${JSON.stringify(msg)}`, `color: ${'#bada55'};background: ${bgcolor};`+ ";font-weight:bold;");
};
