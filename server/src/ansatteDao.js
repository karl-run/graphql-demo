const ansatteDatabase = [
  { navn: 'karl', sparken: false },
  { navn: 'daniel', sparken: false },
  { navn: 'tjuvradd', sparken: true },
];

const lønn = {
    karl: { arlig: 50, bonus: 20 },
    daniel: { arlig: 55, bonus: 25 },
    tjuvradd: { arlig: 700, bonus: 69 },
}

const getAnsatte = () => {
  console.info(new Date().toISOString(), 'Henter alle ansatte!');

  return ansatteDatabase;
};

const addAnsatt = (navn, sparken = false) => {
  console.info(new Date().toISOString(), `Legger til ny ansatt: ${navn}`);

  const ny = { navn, sparken };

  ansatteDatabase.push(ny);

  return ny;
};

const spark = navn => {
    const index = ansatteDatabase.findIndex(ansatt => ansatt.navn === navn);

    if (index < 0) {
        throw Error(`Fant ingen ansatt ved navn "${navn}"`)
    }

    ansatteDatabase[index].sparken = true;

    return ansatteDatabase[index];
}

const getLønn = ansatt => {
  console.info(
    new Date().toISOString(),
    `Henter lønn til ansatt: ${ansatt.navn}`,
  );

  if (ansatt.navn in lønn) {
      return lønn[ansatt.navn];
  }

  return { arlig: 40, bonus: 10 };
};

module.exports = {
  getAnsatte,
  addAnsatt,
  getLønn,
  spark,
};
