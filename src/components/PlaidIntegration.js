import axios from "axios";
import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

const PlaidIntegration = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [publicToken, setPublicToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userID, setUserID] = useState();

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      console.log("onSuccess: public_token", public_token);
      setPublicToken(public_token);

      try {
        const response = await axios.post(
          "https://incline-ten.vercel.app/get-access-token",
          { public_token, user_id: userID }
        );
        const data = response.data;
        setAccessToken(data.access_token);

        // Optionally, fetch accounts and transactions here if needed
        // const accountsResponse = await axios.get('/path-to-fetch-accounts', { params: { user_id: userID } });
        // setAccounts(accountsResponse.data.accounts);
        // const transactionsResponse = await axios.get('/path-to-fetch-transactions', { params: { user_id: userID } });
        // setTransactions(transactionsResponse.data.transactions);

      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
  });

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await axios.post(
          "https://incline-ten.vercel.app/create-link-token"
        );
        const data = response.data;
        console.log("createLinkToken: data", data);
        setLinkToken(data.link_token);
        setUserID(data.user_id);
      } catch (error) {
        console.error("Error creating Link token:", error);
      }
    };

    createLinkToken();
  }, []);

  useEffect(() => {
    console.log("linkToken:", linkToken);
    console.log("ready:", ready);
  }, [linkToken, ready]);

  return (
    <div>
      <h1>Incline: Plaid Integration</h1>
      <button onClick={open} disabled={!ready}>
        Link your bank account
      </button>
      <p>
        Public Token: <span>{publicToken}</span>
      </p>
      <p>
        Access Token: <span>{accessToken}</span>
      </p>

      <h2>Accounts</h2>
      <div>
        {accounts.map((account, index) => (
          <div key={index}>
            <p>Name: {account.name}</p>
            <p>Type: {account.type}</p>
            <p>Subtype: {account.subtype}</p>
            <p>Mask: {account.mask}</p>
          </div>
        ))}
      </div>

      <h2>Transactions</h2>
      <div>
        {transactions.map((transaction, index) => (
          <div key={index}>
            <p>Name: {transaction.name}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaidIntegration;
