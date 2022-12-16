const container = d3.select("#container");
let gameOver = false;
let score = 0;

let playground = container
  .append("svg")
  .attr("height", container.style("height"))
  .attr("width", container.style("width"))
  .attr("id", "playground")
  .style("background", "yellowgreen")

let makeHomeScreen = () => {
  document.getElementById("click-here").setAttribute("style", "display: absolute");
  document.getElementById("curr-score").innerHTML = `Curr score : <span> ${0} </span>`;
  playground.selectAll('rect').remove();
  playground
    .append("rect")
    .attr("id", "home-screen")
    .attr("height", container.style("height"))
    .attr("width", container.style("width"))
    .attr("fill", "green")
    .attr("stroke", "white")
    .attr("stroke-width", "0.5rem")
  
  updateMaxScore();  
}

let removeHomeScreen = () => {
  document.getElementById("click-here").setAttribute("style", "display: none");
  playground.select("#home-screen").remove();
}

let makeObstacles = () => {
  let idx = 0;
  let colors = ["#e44d61", "#ffdc32", "#204cee", "#54d2eb", "	#cfa5e0"];
  let objInterval = setInterval(() => {
    // optimise 
    for (let i = 0; i < document.querySelectorAll("#playground > rect").length - 3; i++) {
      d3.select('#playground > rect').remove();
    }

    let x = Math.random() * parseInt(container.style("width"));
    if (x + 100 > parseInt(container.style("width"))) {
      x = parseInt(container.style("width")) - 100;
    }
    playground
      .append('rect')
      .attr("height", "100px")
      .attr("width", "100px")
      .attr("y", -100)
      .attr("x", x)
      .attr("fill", colors[idx++ % colors.length])
      .transition()
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    x = Math.random() * parseInt(container.style("width"));
    if (x + 100 > parseInt(container.style("width"))) {
      x = parseInt(container.style("width")) - 100;
    }
    playground
      .append('rect')
      .attr("height", "100px")
      .attr("width", "100px")
      .attr("y", -100)
      .attr("x", x)
      .attr("fill", colors[idx++ % colors.length])
      .transition()
      .ease(d3.easeLinear)
      .delay(700)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    x = Math.random() * parseInt(container.style("width"));
    if (x + 100 > parseInt(container.style("width"))) {
      x = parseInt(container.style("width")) - 100;
    }
    playground
      .append('rect')
      .attr("height", "100px")
      .attr("width", "100px")
      .attr("y", -100)
      .attr("x", x)
      .attr("fill", colors[idx++ % colors.length])
      .transition()
      .ease(d3.easeLinear)
      .delay(1400)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    if (gameOver) {
      clearInterval(objInterval);
      makeHomeScreen();
    }  
  }, 2500)
}

let runGraphics = () => {
  let grass = playground.append('g');

  let grassInterval = setInterval(() => {
    grass.select('rect').remove();
    grass
      .append('rect')
      .attr("height", parseInt(container.style("height")) / 4)
      .attr("width", parseInt(container.style("width")))
      .attr("fill", "#8cc751")
      .attr("y", (-1 * parseInt(container.style("height"))) / 4)
      .transition()
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    if (gameOver) {
      clearInterval(grassInterval);
      makeHomeScreen();
    }  
  }, 3000);
}

let checkCollision = () => {
  let football = document.querySelector("#football > svg").getBoundingClientRect();
  let objects = document.querySelectorAll("#playground > rect");
  let flag = false;
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i].getBoundingClientRect();
    flag = !(
      obj.left > football.right ||
      obj.right < football.left ||
      obj.top > football.bottom ||
      obj.bottom < football.top
    );

    if (flag) break;
  }
  return flag;
}

let runGame = () => {
  // Game Loop
  let gameLoop = setInterval(() => {
    gameOver = checkCollision(); // return true when collision is detected
    score++;
    document.getElementById("curr-score").innerHTML = `Curr score : <span> ${score} </span>`;
    if (gameOver) {
      alert("GAME OVER, SCORE : " + score);
      clearInterval(gameLoop);
      makeHomeScreen();
    }
  }, 500)
}

let updateMaxScore = () => {
  let myStorage = window.localStorage;
  let maxScore = { score: 0 };
  if (myStorage.getItem("score") != null) {
    maxScore = JSON.parse(myStorage.getItem("score"));
    if (score > maxScore.score) {
      maxScore.score = score;
    }
  }
  myStorage.setItem("score", JSON.stringify(maxScore));

  let maxS = document.getElementById("max-score");
  maxS.innerHTML = `Max score : <span> ${maxScore.score} </span>`;
}

let startGame = () => {
  makeObstacles();
  runGraphics();
  runGame();
}

document.getElementById("click-here").addEventListener("click", e => {
  e.preventDefault();
  gameOver = false;
  score = 0;
  startGame();
  removeHomeScreen();
})

makeHomeScreen();
