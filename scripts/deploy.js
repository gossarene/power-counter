// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
import { useState } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //We get the whitelist from db

  const [whitelists, setWhitelists] = useState([]);
  const data = await getDocs(whitelistsCollectionRef);
  setWhitelists(data.docs.map((doc) => ({ ...doc.data() })))

  // We get the contract to deploy
  const PowerCounter = await hre.ethers.getContractFactory("PowerCounter");
  const powerCounter = await PowerCounter.deploy(whitelists);

  await powerCounter.deployed();

  console.log("PowerCounter deployed to:", powerCounter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
