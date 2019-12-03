var label = "";
var target = "7284";
var rndm=""

var population = [];
var populationSize = 1000;
var populationBest=[]



const generateLabel = x => {
  o = [];
  for (let _ = 0; _ < x; _++) {
    o.push(floor(random(10)));
  }
  return o.join("");
};

const calculateFitness=(x)=>{
  console.log(x.length)
  ff=x.map(e=>{return {guess:e,distance:fitness(e,target)}})
  if (ff.includes(target)){
    noLoop()
  }
  return ff.filter(e=>e.distance<.9)

  // console.log(populationBest)
  
}



const fitness = (v, t) => {
  var score = 0;
  for (let idx in v) {
    score += v[idx] === t[idx] ? 1 : 0;
  }
  return 1/(score+1);
};


const createPopulation = (ct) => {
  for (let i=0; i < ct; i++){
    rndm=generateLabel(4)
    population.push(rndm);
    // score = fitness(rndm, target);

    // // score = fitness("rndm", "rndm");
    // text(target, width / 2, (height - 50) / 2);
    // text(score, width / 2, (height + 50) / 2);
    // populationx--;
    // stage1 = populationx <= 0 && !stage1;
  }
    
    // console.log("Stopped");
  };

// const generateFrom = (v, x, y) => {
//   console.log(x.guess, y.guess);
//   const x_ = x.guess.slice(0, 2);
//   const y_ = y.guess.slice(2);

//   potential.splice(potential.indexOf(x), 1);
//   potential.splice(potential.indexOf(y), 1);

//   ///mutate
//   n = x_ + y_;
//   score = fitness(n, target);
//   if (score > 2) {
//     potential.push({ guess: n, gen: v, score });
//   }

//   console.log(potential);
// };

const nextGeneration = (x) => {
  o=[]
  for (let c=0;c<x.length;c++){
    // pickFromBest(x)
    idx1=floor(random(x.length))
    idx2=floor(random(x.length))

    chosen1=x[idx1]
    // chosen2=x[idx2]
    console.log("removed",x.splice(idx1,1))
    // x.splice(idx2,1)
    // console.log("removed",x.splice(idx2,1))


    // console.log(chosen1,chosen2)


    // mutate()
    mutatedChoosen1=shuffle([...chosen1.guess]).join("")
    // mutatedChoosen2=shuffle([...chosen2.guess]).join("")
    // console.log(mutatedChoosen1,mutatedChoosen2)


    // crossover()
    // add back to populatioBest
    // chosen.guess=mutatedChoosen
    // console.log(chosen)

    // mutatect1=floor(random(3))
    // mutatect2=4-mutatect1
    // p1=mutatedChoosen1.slice(mutatect1)
    // p2=mutatedChoosen2.slice(mutatect2)
    // console.log(p1,p2)

    // console.log("Added",o.push([p1,p2].join("")))
    console.log("Added",o.push(mutatedChoosen1))

  }
  console.log("o",o.length)
  return o
  
  // remove original from populationBest
  // make populationBest population
  
  
};

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 20);
  createPopulation(populationSize)
}

const normalize=(x)=>{
  s=x.reduce((o,e)=>o+e.distance,0)
  // console.log(x.map(e=>{return {prob:1-e.distance/s,...e}}))
  
}


const pickFromBest=(x)=>{
  // find the high prob in the list and get one 
  x[floor(random(x.length-1))]

}

function draw() {

  background(187);
  textSize(20);
  text(target, width / 2, (height - 50) / 2);
  text(rndm, width / 2, height / 2);


  populationBest=calculateFitness(population)
  // normalize(populationBest)
  o=nextGeneration(populationBest)
  console.log("o is",o)
  if (o.length===0){
    createPopulation(populationSize)
  } 
  else{
    population=o

  }
}

