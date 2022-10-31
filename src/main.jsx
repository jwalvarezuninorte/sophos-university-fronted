import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App";
import "./index.css";

axios.defaults.baseURL = "https://localhost:7111/api";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
