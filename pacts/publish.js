const { Publisher } = require("@pact-foundation/pact")
const path = require("path")

const opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
    pactBroker: "https://test.pact.dius.com.au",
    pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
    pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
    consumerVersion: '1'
};

new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log("Pact contract publishing complete!")
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })