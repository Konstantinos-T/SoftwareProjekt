import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import Topbar from "../TopBotBars/Topbar.js";

export class Impressum extends Component {
  render() {
    return (
      <div>
        <Topbar title={"Impressum"}></Topbar>
        <div
          style={{
            width: "50%",
            "margin-left": "10%",
            paddingBottom: "20px",
          }}
        >
          <div style={{}}>
            <h1>Impressum</h1>
            <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>
              Future Drivers
              <br />
              Flandern-Stra&szlig;e 101
              <br />
              73732 Esslingen
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: ***********
              <br />
              E-Mail: future@drivers.com
            </p>
            <p>
              <strong>Copyright (c) 2021, Future Drivers</strong>
            </p>
            <p>
              {" "}
              Permission to use, copy, modify, and/or distribute this software
              for any purpose with or without fee is hereby granted, provided
              that the above copyright notice and this permission notice appear
              in all copies.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
              WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
              WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
              AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
              CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
              LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
              NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
              CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            </p>
          </div>
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
}
export default Impressum;
