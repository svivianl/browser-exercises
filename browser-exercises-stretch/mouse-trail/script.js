window.addEventListener("load", () => {
  /************** mouse trail ********************
  let numTrails = 10;
      dots = [], // dots and initial positions
      mouse = { // mouse position
        x: 0,
        y: 0
      };

  // The Dot object used to scaffold the dots
  let Dot = function() {
    this.x = 0;
    this.y = 0;
    this.node = (function(){
      let n = document.createElement("div");
      n.className = "trail";
      document.body.appendChild(n);
      return n;
    }()); // end of function
  };// end of Dot function

  // The Dot.prototype.draw() method sets the position of
  // the object's <div> node
  Dot.prototype.draw = function() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
  };// end of prototype.draw

  // Creates the Dot objects, populates the dots array
  for (let i = 0; i < numTrails; i++) {
    let dot = new Dot();
    dots.push(dot);
  } // end of for

  // screen redraw function
  function draw() {
    // set mouse position everytime draw() is called
    let x = mouse.x,
        y = mouse.y;

    // position and draw the dots
    dots.forEach((dot, index, dots) => {
      let nextDot = dots[index + 1] || dots[0];

      dot.x = x;
      dot.y = y;
      dot.draw();
      x += (nextDot.x - dot.x) * .6;
      y += (nextDot.y - dot.y) * .6;

    }); // end of forEach
  }// end of function draw

  addEventListener("mousemove", event =>{
    //event.preventDefault();
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  }); // end function addEventListener

  // animate() calls draw() then recursively calls itself
  // everytime the screen repaints via requestAnimationFrame().
  function animate() {
    draw();
    requestAnimationFrame(animate);
  } // end function animate

  // And get it started by calling animate().
  animate();

  /*************** tabs ****************/
  function asTabs(node) {
    // create eventListener for the buttons
    let tabs = Array.from(node.children).map(node => {
      let button = document.createElement("button");
      button.textContent = node.getAttribute("data-tabname");
      let tab = {node, button};
      button.addEventListener("click", () => selectTab(tab));
      return tab;
    });
    // create html tab buttons
    let tabList = document.createElement("div");
    for (let {button} of tabs) tabList.appendChild(button);
    node.insertBefore(tabList, node.firstChild);

    // set tab selected as active and set the rest of the tabs
    // as unselected
    function selectTab(selectedTab) {
      for (let tab of tabs) {
        let selected = tab == selectedTab;
        tab.node.style.display = selected ? "" : "none";
        tab.button.style.color = selected ? "red" : "";
      }
    }
    selectTab(tabs[0]);
  }
  asTabs(document.querySelector("tab-panel"));

})

