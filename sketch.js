var label = "";
var target = "7284";

var potential = [];
var population = 100;
var populationx = population;

var stage1 = false;

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 20);
}

const generateLabel = x => {
  o = [];
  for (let _ = 0; _ < x; _++) {
    o.push(floor(random(10)));
  }
  return o.join("");
};

const fitness = (v, t) => {
  var score = 0;
  for (let idx in v) {
    score += v[idx] === t[idx] ? 1 : 0;
  }
  if (score) {
    potential.push({ guess: v, score, prob: parseFloat(score / t.length) });
  }
  return score;
};

const stopLoop = () => (stage1 = false);

const createPopulation = () => {
  if (!stage1) {
    rndm = generateLabel(4);
    score = fitness(rndm, target);

    // score = fitness("rndm", "rndm");
    text(target, width / 2, (height - 50) / 2);
    text(rndm, width / 2, height / 2);
    text(score, width / 2, (height + 50) / 2);
    console.log(rndm, target, score, stage1, populationx);
    populationx--;
    stage1 = populationx <= 0 && !stage1;
    // console.log("Stopped");
  }
};

const generateFrom = (v, x, y) => {
  console.log(x.guess, y.guess);
  const x_ = x.guess.slice(0, 2);
  const y_ = y.guess.slice(2);

  potential.splice(potential.indexOf(x), 1);
  potential.splice(potential.indexOf(y), 1);

  ///mutate
  n = x_ + y_;
  score = fitness(n, target);
  if (score > 2) {
    potential.push({ guess: n, gen: v, score });
  }

  console.log(potential);
};

const nextGeneration = () => {
  if (stage1) {
    console.log(potential.length);
    potential.map(e => console.log(e));

    // now we need to create another population by breeding between potentials and generate random

    gap = population - potential.length;
    console.log(gap);
    //breeding

    for (let v = 0; v <= 30; v++) {
      generateFrom(
        v,
        potential[floor(random(potential.length))],
        potential[floor(random(potential.length))]
      );
    }
    //mutate

    noLoop();
  }
};

function draw() {
  background(187);
  textSize(20);
  createPopulation();
  nextGeneration();
}
