// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { usePlaidLink } from "react-plaid-link";

// const PlaidIntegration = () => {
//   const [linkToken, setLinkToken] = useState(null);
//   const [publicToken, setPublicToken] = useState("");
//   const [accessToken, setAccessToken] = useState("");
//   const [accounts, setAccounts] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [userID, setUserID] = useState();

//   const { open, ready } = usePlaidLink({
//     token: linkToken,
//     onSuccess: async (public_token, metadata) => {
//       console.log("onSuccess: public_token", public_token);
//       setPublicToken(public_token);

//       try {
//         const response = await axios.post(
//           "https://incline-ten.vercel.app/get-access-token",
//           { public_token, user_id: userID }
//         );
//         const data = response.data;
//         setAccessToken(data.access_token);

//         // Optionally, fetch accounts and transactions here if needed
//         // const accountsResponse = await axios.get('/path-to-fetch-accounts', { params: { user_id: userID } });
//         // setAccounts(accountsResponse.data.accounts);
//         // const transactionsResponse = await axios.get('/path-to-fetch-transactions', { params: { user_id: userID } });
//         // setTransactions(transactionsResponse.data.transactions);

//       } catch (error) {
//         console.error("Error exchanging public token:", error);
//       }
//     },
//   });

//   useEffect(() => {
//     const createLinkToken = async () => {
//       try {
//         const response = await axios.post(
//           "https://incline-ten.vercel.app/create-link-token"
//         );
//         const data = response.data;
//         console.log("createLinkToken: data", data);
//         setLinkToken(data.link_token);
//         setUserID(data.user_id);
//       } catch (error) {
//         console.error("Error creating Link token:", error);
//       }
//     };

//     createLinkToken();
//   }, []);

//   useEffect(() => {
//     console.log("linkToken:", linkToken);
//     console.log("ready:", ready);
//   }, [linkToken, ready]);

//   return (
//     <div>
//       <h1>Incline: Plaid Integration</h1>
//       <button onClick={open} disabled={!ready}>
//         Link your bank account
//       </button>
//       <p>
//         Public Token: <span>{publicToken}</span>
//       </p>
//       <p>
//         Access Token: <span>{accessToken}</span>
//       </p>

//          </div>
//   );
// };

// export default PlaidIntegration;



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
    <div style={{ backgroundColor: "#001f3f", padding: "20px", minHeight: "100vh", color: "#fff" }}>
      <header style={{ padding: "0 0", textAlign: "center" }}>
        <a href="/" style={{ display: "inline-block" }}>
          <img src="https://www.inclineanalytics.com/wp-content/uploads/2020/04/Incline-Analytics5-01.png" alt="Incline Analytics Logo" style={{ width: "150px", height: "auto" }} />
        </a>
      </header>

      <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 100px)" }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: "1200px", width: "100%" }}>
          <div style={{ flex: "1", paddingRight: "20px" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "48px", lineHeight: "1.2" }}>
              Leverage your data <br />
              <span style={{ color: "#ff6f61" }}>elevate&nbsp;your business</span>
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.5", marginTop: "20px" }}>
              We specialize in advanced analytics tailored for multi-site healthcare companies. We equip our clients with insights and tools to stimulate revenue growth, improve operational efficiencies, streamline cost management, and fortify managerial controls for scalable operations. Through customized analytics solutions, we offer valuable insights that support strategic decision-making, optimize overall performance, and fortify investor relations.
            </p>
            <button
              onClick={open}
              disabled={!ready}
              style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#ff6f61", color: "#fff", textDecoration: "none", border: "none", borderRadius: "5px", marginTop: "20px" }}
            >
              Link your bank account
            </button>
          </div>
          <div style={{ flex: "1" }}>
            <img src="https://www.inclineanalytics.com/wp-content/uploads/2024/01/IA-Graphic-Bars-Wave-and-Grid-Daniel-Shea-min.png" alt="IA Graphic Bars Wave and Grid Daniel Shea-min" style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaidIntegration;
