const ansatteDatabase = [
  { id: '1', navn: 'karl', sparken: false },
  { id: '2', navn: 'daniel', sparken: false },
  { id: '3', navn: 'tjuvradd', sparken: true },
];

const lønn = {
  karl: { id: '11', arlig: 50, bonus: 20 },
  daniel: { id: '12', arlig: 55, bonus: 25 },
  tjuvradd: { id: '13', arlig: 700, bonus: 69 },
};

const getAnsatte = () => {
  console.info(new Date().toISOString(), 'Henter alle ansatte!');

  return ansatteDatabase;
};

const addAnsatt = (navn, sparken = false) => {
  console.info(new Date().toISOString(), `Legger til ny ansatt: ${navn}`);

  if (ansatteDatabase.some(ansatt => ansatt.navn === navn)) {
    throw Error(`"${navn} er allerede ansatt"`);
  }

  const ny = { id: `${Math.random() * 1000}`, navn, sparken };

  ansatteDatabase.push(ny);

  return ny;
};

const spark = navn => {
  const index = ansatteDatabase.findIndex(ansatt => ansatt.navn === navn);

  if (index < 0) {
    throw Error(`Fant ingen ansatt ved navn "${navn}"`);
  }

  ansatteDatabase[index].sparken = true;

  return ansatteDatabase[index];
};

const getLønn = ansatt => {
  console.info(
    new Date().toISOString(),
    `Henter lønn til ansatt: ${ansatt.navn}`,
  );

  if (ansatt.navn in lønn) {
    return lønn[ansatt.navn];
  }

  return { id: `${Math.random() * 1000}`, arlig: 40, bonus: 10 };
};

module.exports = {
  getAnsatte,
  addAnsatt,
  getLønn,
  spark,
};
