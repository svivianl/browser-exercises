/*********** ex01 - table mountains **************/
const MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

window.addEventListener("load", () => {

  /*********** ex01 - table mountains **************/
  let tableElm = document.getElementById('mountains');

  if(tableElm !== null){
    var newTable = document.createElement("table");
    var newTableRow = document.createElement("tr");

    tableElm.appendChild(newTable);
    newTable.appendChild(newTableRow);

    var columns = Object.keys(MOUNTAINS[0]);
    columns.forEach(column => {
      newTableRow.appendChild(elt( "th", column));
    })

    MOUNTAINS.forEach((mountain, index) => {
      let tableLine = document.createElement("tr");
      tableLine.id = index;
      newTable.appendChild(tableLine);

      tableLine.appendChild(elt( "td", mountain.name));
      tableLine.appendChild(elt( "td", mountain.height));
      tableLine.appendChild(elt( "td", mountain.place));

    }) // end of MOUNTAIS.forEach

  }// end of IF


  /**************** mousemove *************************

  let lastX; // Tracks the last observed mouse X position
  let bar = document.querySelector("div");
  bar.addEventListener("mousedown", event => {
    if (event.button == 0) {
      lastX = event.clientX;
      window.addEventListener("mousemove", moved);
      event.preventDefault(); // Prevent selection
    }
  });

      // Create some content
  document.body.appendChild(document.createTextNode(
    "supercalifragilisticexpialidocious ".repeat(1000)));

  /**************** scroll *************************

  let bar2 = document.querySelector("#progress");
  window.addEventListener("scroll", () => {
    let max = document.body.scrollHeight - innerHeight;
    bar2.style.width = `${(pageYOffset / max) * 100}%`;
  });

  /*********** ex02 - tagNames **************
  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2

  /********** ex03 - cat animation *************
  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");
  let angle = Math.PI / 2;
  function animate(time, lastTime) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    hat.style.top = (Math.sin(angle + Math.PI) * 20) + "px";
    hat.style.left = (Math.cos(angle + Math.PI) * 200) + "px";
    requestAnimationFrame(newTime => animate(newTime, time));
  }

  requestAnimationFrame(animate);
  /********** ex04 - ballom **************/
  let ballomInitialSize = '20';
  let ballomMaxSize = '100';
  let ballom = document.getElementById('ballom');
  let ballomExplode = document.getElementById('explode');

  ballom.style.fontSize = ballomInitialSize  + 'px';
  ballomExplode.style.visibility = 'hidden';

  let handler = function ballomEvent(event){
    if(event.key == 'ArrowUp' || event.key == 'ArrowDown'){
      let ballom = document.getElementById('ballom');
      if(ballom !== undefined && ballom.style.visibility === ''){
        // substr(0,ballom.style.fontSize.length - 2) is used to take off the "px"
        let size = ballom.style.fontSize.substr(0,ballom.style.fontSize.length - 2);
        let newSize = 0;
        if (event.key == 'ArrowUp') {
          newSize = size * 1.1; // 10% more
          if(newSize >= ballomMaxSize){
            // hide ballom and show the explode
            ballom.style.fontSize = 0;
            ballom.style.visibility = 'hidden';
            let ballomExplode = document.getElementById('explode');
            ballomExplode.style.visibility = '';
            ballomExplode.style.fontSize = ballomMaxSize + 'px';
            ballomExplode.style.margin = 0;
            window.removeEventListener("keydown", handler);
          }else{
            ballom.style.fontSize = newSize + 'px';
            ballom.style.margin = 0;
          }
        } else{
          newSize = size * 0.9; // 10% smaller
          if(newSize >= ballomInitialSize){
            // change the size
            ballom.style.fontSize = newSize + 'px';
            ballom.style.margin = 0;
          }
        }
      }
    }
  }
  window.addEventListener("keydown", handler);
});


function elt(type, value){
  let tableCell = document.createElement(type);
  tableCell.innerHTML = value;
  tableCell.style.textAlign = "right";
  return tableCell;
}

  function moved(event) {
    if (event.buttons == 0) {
      window.removeEventListener("mousemove", moved);
    } else {
      let dist = event.clientX - lastX;
      let newWidth = Math.max(10, bar.offsetWidth + dist);
      bar.style.width = newWidth + "px";
      lastX = event.clientX;
    }
  }

/*********** ex02 - tagNames ***************/
function byTagName(node, tagName) {
  var nodes = [];
  byTagNameInner(node, tagName, nodes);
  return nodes;
}

function byTagNameInner(node, tagName, nodes) {
 if(node.childNodes.length !== 0){
    node.childNodes.forEach(child => {
      if(child.nodeName.toLowerCase() == tagName){
        nodes.push(child);
      }

      if(child.childNodes.length !== 0){
        byTagNameInner(child, tagName, nodes);
      }
    })
  }else{
    if(node.nodeName.toLowerCase() == tagName){
      nodes.push(node);
    }
  }
}

