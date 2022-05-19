import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PowerCounter from './artifacts/contracts/PowerCounter.sol/PowerCounter.json';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const PoCAdress = `${process.env.REACT_APP_PCADDRESS}`;

function App() {
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [userAccount, setUserAccount] = useState('');

  const [whitelists, setWhitelists] = useState([]);
  const whitelistsCollectionRef = collection(db, "whitelists");


  useEffect(() => {
    fetchContractData();
    fetchWhiteListsData();
  }, []);



  async function fetchWhiteListsData() {
    const data = await getDocs(whitelistsCollectionRef);
    setWhitelists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  };
  async function fetchContractData() {
    if (window.ethereum) {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PoCAdress, PowerCounter.abi, provider); //get the contract
      try {
        const counter = await contract.getCounter();
        const object = { "counter": String(counter) };
        setData(object);
        console.log(data);
      }
      catch (err) {
        setError(err.message);
      }

    } else {
      setError('NO_CRYPTO_WALLET_AVAILABLE');
    }
  };

  async function increase() {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(PoCAdress, PowerCounter.abi, signer);

      try {

        const transaction = await contract.increase_counter();

      } catch (err) {
        setError(err.error.message);
      }
    }
  };

  async function decrease() {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(PoCAdress, PowerCounter.abi, signer);

      try {

        const transaction = await contract.decrease_counter();

      } catch (err) {
        setError(err.error.message);
      }
    }
  };


  return (

    <div className="overflow-hidden text-white App">

      <Header />
      <div className="wrapper bg-[#081730] flex items-center justify-between px-[2.9rem] rounded-b-[5rem] w-[100%] h-[35rem] relative z-[3]">
        {/* left side */}


        <div className="headings flex flex-col items-center justify-center text-center h-[100%] text-[3rem] md:ml-14">
          <span>Let's play    </span>
          <br></br>
          <span>
            <b>{data.counter} </b>
          </span>
          <br>
          </br>
          <div>
            <div className="">
              <div></div>
              {whitelists.find(({ address }) => address.toLowerCase() === userAccount) &&
                <div className="flex text-[1rem] ">

                  <button onClick={increase} className="bg-blue-700 hover:bg-blue-900 text-white  font-bold py-2 px-4   rounded-full"> Increase </button>


                  <button onClick={decrease} className="bg-pink-700 hover:bg-pink-500 text-white font-bold py-2 px-4 ml-5 rounded-full" > Decrease </button>

                </div>
              }
              <div className='text-[0.7rem] text-red-700 mt-10'>
                {error.includes('NO_CRYPTO_WALLET_AVAILABLE') && <span> No crypto wallet found. Please intall it ! </span>}
                {error.includes('DOES_NOT_IN_WHITELISTS') && <span> Only whitelist addresses are allowed </span>}
              </div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="images relative w-[70%]">
          <img
            src={require("./img/backgroung.png")}
            alt=""
            className="absolute top-[-20rem] h-[34rem] left-[5rem]"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
