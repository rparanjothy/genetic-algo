// Ram Paranjothy

var label = "";
var  target;
var rndm = "";

var population = [];
var populationSize = prompt("Enter Population Size", 150)

var gen = 0;
const perfectFit = 1;

// prompt();

const generateRandomGuess = x => {
  // generate a random 4 length string of int 0-10
  o = [];
  for (let _ = 0; _ < x; _++) {
    o.push(floor(random(255)));
    // o.push(floor(random(10)));
  }
  return o;
};

const calculateFitness = x => {
  // console.log(x.length);
  return x.map(e => {
    rndm = e;
    // console.log("processing", rndm);
    return { guess: e.slice(), fitness:fitness(e, target) };
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
  return scorex;
};

const createPopulation = ct => {
  for (let i = 0; i < ct; i++) {
    rndm = generateRandomGuess(40000);
    // console.log(rndm)
    population.push(rndm);
    // sss;
  }
};

const nextGeneration = x => {
  gen += 1;
  best = gatherBest(x);

  const pickAndMutate = x => {
    a = pickOne(x);
    b = pickOne(x);

    mi = floor(random(target.length));
    dna = a.guess.slice(0, mi).concat(b.guess.slice(mi));
    
    // idx = floor(random(dna.length));
    
    // x = Array.from(dna);
    // x[idx] = generateRandomGuess(1);
    // mutated = x.join("");
    return dna;
  };
  // we map on population to get the same pp count items in the new list
  return population.map(e => pickAndMutate(best));
};

const pickOne = x => {
  idx = floor(random(x.length));
  return x[idx];
};

const gatherBest = x => {
  mx = max(x.map(e => e.prob));
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
  let img = createImage(10, 10);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      // img.set(i, j, color(floor(random(250)), floor(random(100)), floor(random(100))));
     var idx=(i + j *img.width) * 4;
    //  console.log(idx)
        img.pixels[idx+0] = currentMostFittest.guess[idx]
        img.pixels[idx + 1] = currentMostFittest.guess[idx]
        img.pixels[idx + 2] = currentMostFittest.guess[idx]
        img.pixels[idx + 3] = 255
    }
  }
  img.updatePixels();
  image(img, (width-10)/2, (height-10)/2);

};

function setup() {
  target=generateRandomGuess(400)

  createPopulation(populationSize);
  gen = 0;
  createCanvas(600,400)

  acurrentMostFittest=generateRandomGuess(10*10*4)

  
}

function draw() {
  background(255);
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
