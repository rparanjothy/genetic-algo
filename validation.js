createPopulation(populationSize);

createPopulation(populationSize);
createPopulation(populationSize);

createPopulation(populationSize);
populationFitness = calculateFitness(population);

populationFitness.filter(e => e.guess.length !== target.length);

currentMaxFit = max(populationFitness.map(e => e.fitness));
populationFitness.filter(e => e.fitness === currentMaxFit);

currentMostFittest = populationFitness.filter(
  e => e.fitness === currentMaxFit
)[0];

popProb = computeNormProb(populationFitness);

popProb.filter(e => e.guess.length !== target.length);

x = [...popProb];

best = gatherBest([...x]);
a = pickOne([...best]);
b = pickOne([...best]);
mi = floor(random(target.length));
dna = a.guess.splice(0, mi).concat(b.guess.splice(mi));

aa = { ...a };
bb = { ...b };
