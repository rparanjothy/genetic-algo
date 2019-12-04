var label = "";
var target = "Deep in the heart of Texas";
var rndm = "";
// const data="abcdefghijklmnopqrstuvwxyz 0123456789."
const alpha="abcdefghijklmnopqrstuvwxyz"
alpha.toUpperCase()
digits="0123456789"
specialChars=" .,/;':\"[]{}+=-_)(*&^%$#@!~`"

data=[alpha,digits,alpha.toUpperCase(),specialChars].join()
// data=alpha
var population = [];
var populationSize = 100;
var gen = 0;
const perfectFit = 1;

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
  return scorex**2;
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
    mi=floor(random(target.length))
    // console.log(a.guess,b.guess,mi,a.guess.substr(0, mi),b.guess.substr(mi))
    // if (a && b){
      dna = [a.guess.substr(0, mi), b.guess.substr(mi)].join("");
      idx = floor(random(dna.length));
      x = Array.from(dna);
      // console.log(idx, x);
      x[idx] = generateRandomGuess(1);
      mutated = x.join("");
      // console.log(mutated);
      // ss;
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



const getCurrentFittest = (x) => {
    currentMaxFit=max(x.map(e=>e.fitness))

    currentMostFittest=x.filter((e)=>e.fitness===currentMaxFit)[0]
    // currentMostFittest=x.filter((e)=>e.fitness===currentMaxFit)
    
    console.log(currentMostFittest)
    
    return currentMostFittest
};
function displayInfo() {
  let answer = currentMostFittest.guess;
  ht="<div class=phrase>Best phrase:<br>" + answer+"<div>"
  bestPhrase.html(ht);

  let statstext = "Total generations:     " + gen + "<br>";
  statstext += "Total population:      " + populationSize + "<br>";

  stats.html("<div class=stats>"+ statstext+"</div>");

  allPhrases.html("<div> High Fitness Guesses:<br>" + population.reduce((o,e)=>o+"<br>"+e)+"</div>"
  )}


  function setup() {
    ToFind = createP("<div>Target: <br>"+target+"</div>");
    stats = createP("Stats");
    stats.class("stats");
    bestPhrase = createP("Best phrase: ");
    bestPhrase.class("best");
    allPhrases = createP("All phrases:");
    allPhrases.class("all");
  
    createPopulation(populationSize);
    gen=0
  }

function draw() {
  // console.log(gen);
  background(187);
  // textSize(20);
  // text("Target: "+target, width / 2, (height - 150) / 2);
  
  //calculate fitness for random guesses
  populationFitness = calculateFitness(population);

  // currentFittest=getCurrentFittest(populationFitness)
  currentMaxFit=max(populationFitness.map(e=>e.fitness))

  currentMostFittest=populationFitness.filter((e)=>e.fitness===currentMaxFit)[0]
  // currentMostFittest=x.filter((e)=>e.fitness===currentMaxFit)
  
  // console.log(currentMostFittest)

  // text(currentMostFittest.guess, width / 2, (height - 50) / 2);
  // text("Generation: "+gen, width / 2, (height - 100) / 2);
  
  if (currentMostFittest.fitness===perfectFit){
    //this is our guy
    console.log("Done")
    noLoop()
  }
  
  // compute prob and normalize
  popProb = computeNormProb(populationFitness);
  // console.log(popProb.reduce((o, e) => o + e.prob, 0.0));
  //nextGen

  temp = nextGeneration(popProb);
  population = temp;

  displayInfo()

  
  // noLoop()
}


