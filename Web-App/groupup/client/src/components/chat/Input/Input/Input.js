import React from "react";
import { Button } from "@material-ui/core";

import "./Input.css";

//input Textfeld
const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Schreibe eine Nachricht"
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <Button
      color="primary"
      variant="contained"
      className="sendButton"
      onClick={(e) => sendMessage(e)}
    >
      Senden
    </Button>
  </form>
);

export default Input;
