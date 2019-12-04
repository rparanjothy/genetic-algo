var label = "";
var target = "7284";
var rndm = "";

var population = [];
var populationSize = 100;
var popBest = [];
var gen = 0;
const perfectFit = 1;

const generateRandomGuess = x => {
  // generate a random 4 length string of int 0-10
  o = [];
  for (let _ = 0; _ < x; _++) {
    o.push(floor(random(10)));
  }
  return o.join("");
};

const calculateFitness = x => {
  // console.log(x.length);
  return x.map(e => {
    rndm = e;
    console.log("processing", rndm);

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
  if (scorex === perfectFit) {
    noLoop();
  }

  return scorex;
};

const createPopulation = ct => {
  for (let i = 0; i < ct; i++) {
    rndm = generateRandomGuess(4);
    population.push(rndm);
    // sss;
  }
};

const nextGeneration = x => {
  // pick a
  gen += 1;
  _ = [];
  best = gatherBest(x);

  const pickAndMutate = x => {
    a = pickOne(x);
    b = pickOne(x);
    console.log(a, b);
    dna = [a.guess.substr(0, 2), b.guess.substr(2)].join("");
    // change one chr at a random position
    idx = floor(random(dna.length - 1));
    x = Array.from(dna);
    console.log(idx, x);
    x[idx] = generateRandomGuess(1);
    mutated = x.join("");
    console.log(mutated);
    // ss;
    return mutated;
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
  console.log(mx);
  closeToMax = x.filter(e => mx - e.prob <= 0.001);
  // take one from closeToMax
  console.log(closeToMax);
  return closeToMax;
};

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 20);
  createPopulation(populationSize);
}

const areWeDone = () => {};

function draw() {
  console.log(gen);
  background(187);
  textSize(20);
  text(target, width / 2, (height - 50) / 2);
  text(rndm, width / 2, height / 2);
  //  see if we have our guy in population

  //calculate fitness for random guesses
  populationFitness = calculateFitness(population);
  // compute prob and normalize
  popProb = computeNormProb(populationFitness);
  // console.log(popProb.reduce((o, e) => o + e.prob, 0.0));
  //nextGen

  temp = nextGeneration(popProb);
  population = temp;
}
