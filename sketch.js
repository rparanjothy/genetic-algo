// Ram Paranjothy

var label = "";
// var target = "all things are possible to him that believeth.";
var target = prompt(
  "Data to train for?",
  "all things are possible to him that believeth."
);
if (target === null) {
  noLoop();
}
var rndm = "";
// const data="abcdefghijklmnopqrstuvwxyz 0123456789."
const alpha = "abcdefghijklmnopqrstuvwxyz";
alpha.toUpperCase();
digits = "0123456789";
specialChars = " .,/;':\"[]{}+=-_)(*&^%$#@!~`?";

data = [alpha, digits, alpha.toUpperCase(), specialChars].join();
// data=alpha
var population = [];
// var populationSize = 150;
const populationSize = prompt("Enter Population Size", 150);

var gen = 0;
const perfectFit = 1;

// prompt();

const generateRandomGuess = x => {
  // generate a random 4 length string of int 0-10
  o = [];
  for (let _ = 0; _ < x; _++) {
    o.push(data[floor(random(data.length))]);
    // o.push(floor(random(10)));
  }
  return o.join("");
};

const calculateFitness = x => {
  // console.log(x.length);
  return x.map(e => {
    rndm = e;
    // console.log("processing", rndm);

    return { guess: e, fitness: fitness(e, target) };
  });
};

const computeNormProb = x => {
  s = x.reduce((o, e) => o + e.fitness, 0);
  return x.map(e => {
    return { prob: e.fitness / s, ...e };
  });
};

const fitness = (v, t) => {
  // if more digits match, closer you are to the target so the distance is small
  //  initialize with 1 so that if there are no matches, we dont end up with 1/0
  var score = 0;
  for (let idx in v) {
    score += v[idx] === t[idx] ? 1 : 0;
  }
  scorex = score / t.length;
  return scorex ** 2;
};

const createPopulation = ct => {
  for (let i = 0; i < ct; i++) {
    rndm = generateRandomGuess(target.length);
    // console.log(rndm)
    population.push(rndm);
    // sss;
  }
};

const nextGeneration = x => {
  // pick a
  gen += 1;
  best = gatherBest(x);

  const pickAndMutate = x => {
    a = pickOne(x);
    b = pickOne(x);
    // console.log(a, b);
    mi = floor(random(target.length));
    // console.log(a.guess,b.guess,mi,a.guess.substr(0, mi),b.guess.substr(mi))
    // if (a && b){
    dna = [a.guess.substr(0, mi), b.guess.substr(mi)].join("");
    idx = floor(random(dna.length));
    x = Array.from(dna);
    // console.log(idx, x);
    x[idx] = generateRandomGuess(1);
    mutated = x.join("");
    // console.log(mutated);
    return mutated;

    // console.log('dna',dna)
    // change one chr at a random position
  };
  // we map on population to get the same pp count items in the new list
  return population.map(e => pickAndMutate(best));
};

const pickOne = x => {
  idx = floor(random(x.length));
  o = x[idx];
  x.slice(idx, 1);
  return o;
};

const gatherBest = x => {
  mx = max(x.map(e => e.prob));
  // console.log(mx);
  closeToMax = x.filter(e => mx - e.prob <= 0.001);
  // take one from closeToMax
  // console.log(closeToMax);
  return closeToMax;
};

const getCurrentFittest = x => {
  currentMaxFit = max(x.map(e => e.fitness));

  currentMostFittest = x.filter(e => e.fitness === currentMaxFit)[0];

  console.log(currentMostFittest);

  return currentMostFittest;
};


const render = () => {
  let answer = currentMostFittest.guess;
  let statstext = "Total generations: " + gen + "<br>";
  statstext += "Total population: " + populationSize + "<br>";
  statstext += "Max Fitness:" + currentMaxFit.toFixed(2);
  document.getElementById("header").innerHTML = "<h2>Genetic Algorithm</h2>";
  document.getElementById("target").innerHTML = target;
  document.getElementById("statsData").innerHTML = statstext;
  document.getElementById("best").innerHTML = "<b>" + answer + "</b>";
  document.getElementById("guesses").innerHTML = population.reduce(
    (o, e) => o + "<div class=gg>" + e + "</div>",
    ""
  );
};

function setup() {
  createPopulation(populationSize);
  gen = 0;
}

function draw() {
  background(187);
  //calculate fitness for random guesses
  populationFitness = calculateFitness(population);

  // currentFittest=getCurrentFittest(populationFitness)
  currentMaxFit = max(populationFitness.map(e => e.fitness));

  currentMostFittest = populationFitness.filter(
    e => e.fitness === currentMaxFit
  )[0];


  if (currentMostFittest.fitness === perfectFit) {
    //this is our guy
    console.log("Done");
    noLoop();
  }

  // compute prob and normalize
  popProb = computeNormProb(populationFitness);
  //nextGen

  population = nextGeneration(popProb);

  render();

  // noLoop()
}
