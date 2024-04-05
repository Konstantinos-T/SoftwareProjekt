import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import Topbar from "../TopBotBars/Topbar.js";

export class Datenschutz extends Component {
  render() {
    return (
      <div>
        <Topbar title={"Datenschutz"}></Topbar>
        <div
          style={{
            width: "50%",
            "margin-left": "10%",
          }}
        >
          <div style={{ "padding-bottom": "20px" }}>
            <h1>Datenschutz</h1>
            <span>
              <strong>Einleitung</strong>{" "}
            </span>
            <p>
              Dieses Datenschutzkonzept beruht auf den in Art 5 Z 1 DSGVO
              formulierten Grundsätzen wie Zweckbindung, Datenminimierung,
              Speicherbegrenzung sowie Integrität, Recht auf Vergessenwerden und
              Vertraulichkeit und ist rechtmäßig (Art 6 DSGVO). Die von der
              DSGVO geforderte Einhaltung der Verordnungskonformität (Art. 5 Z
              2; Art 24 Z 1), der Einhaltung der Betroffenenrechte (Art 13-20),
              der Meldepflicht bei Datenschutzverletzung (Art 33-34), der
              Nachweis- und Rechenschaftspflicht (Art 5 Z 2, Art 24 Z 1) ist
              gewährleistet. Ein Kontroll- und Verbesserungsprozess wird
              mindestens 1x jährlich durchgeführt (Art 32 Z 1).
            </p>
            <span>
              <strong>Rechtsgrundlage für die Datenverarbeitung</strong>{" "}
            </span>
            <p>
              {" "}
              Insofern wir für die Verarbeitung der personenbezogenen Daten eine
              Einwilligung der Betroffenen eingeholt haben, gilt Artikel 6
              Absatz 1 Unterabsatz 1a der DSGVO als rechtliche Grundlage.
            </p>
            <span>
              <strong>Betroffenenrechte</strong>{" "}
            </span>
            <p>
              Im Sinne der DSGVO zählen Sie als Betroffener, wenn
              Personenbezogene Daten, die Sie betreffen, von uns verarbeitet
              werden. Aus diesem Grund können Sie von verschiedenen
              Betroffenenrechte gebrauch machen, die in der Datenschutz Grund
              Verordnung verankert sind. Hierbei handelt es sich um:
              <li>Recht auf Auskunft (Art 15 DSGVO) </li>
              <li>Recht auf Berichtigung (Art 16 DSGVO)</li>
              <li>Recht auf Löschung (Art 17 DSGVO) </li>
              <li>Recht auf Einschränkung (Art 18 DSGVO) </li>
              <li>Recht auf Übertragbarkeit (Art 20 DSGVO) </li>
              <li>Recht auf Widerspruch (Art 21 DSGVO) </li>
              <li>Recht auf Beschwerde bei der Datenschutzbehörde</li>
            </p>
            <span>
              <strong>Datenverarbeitungszweck</strong>{" "}
            </span>
            <p>
              Um Ihren Besuch so benutzerfreundlich wie möglich zu gestalten und
              sämtliche verfügbaren Funktionen anbieten zu können erheben wir
              eine Reihe von Daten und Informationen.
            </p>
            <ul>
              <strong>Profil:</strong>
              <li>
                Das Profil erfordert eine eindeutige ID, die wir aus der
                Anmeldung durch den Hochschule Account erheben. Diese werden auf
                einer extern gehosteten Datenbank, für maximal sechs Monate,
                nach dem letzten Login, gespeichert.
              </li>
              <li>
                Weitere Angaben zur Person sowie dem eigenen Fahrzeug sind nicht
                erforderlich jedoch möglich. Diese werden auf einer extern
                gehosteten Datenbank für maximal sechs Monate, nach dem letzten
                Login gespeichert.
              </li>
              <li>
                Einbindung von eigenen Profilbildern. Der Betroffene registriert
                sich freiwillig bei „GroupUp“ und hinterlegt dort freiwillig
                sein Profilbild. Die Profilbilder werden aktuell beim Aufruf
                geladen und nicht auf der Webseite gespeichert.
              </li>
            </ul>
            <ul>
              <strong>Fahrten</strong>
              <li>
                Das Anbieten einer Fahrt erfordert die eindeutige ID des
                Betroffenen, sowie den Start und Ziel Ort. Dabei wird empfohlen
                den Start auf einen Ort in der Nähe zu setzen und nicht auf die
                Privatadresse.
              </li>
              <li>
                Das Suchen nach einer Fahrt ermöglicht es nicht nach
                personenbezogenen Daten sowie der ID eines dritten zu filtern.
              </li>
              <li>
                Diese Daten werden auf einer extern gehosteten Datenbank bis zur
                Beendigung der angebotenen Fahrt gespeichert.
              </li>
            </ul>
            <ul>
              <strong> Chat</strong>
              <li>
                Der Betroffene hat die Möglichkeit, nachdem er bei einer
                Mitfahrt angenommen wurde, einem Privaten Chatraum beizutreten
                indem sich nur Mitfahrer und Fahrer befinden. Es werden dabei
                nur die notwendigsten persönliche Daten, wie Benutzername und
                Profilbild angezeigt. Ausgetauschte Nachrichten sind nur für die
                betroffenen Personen sichtbar, werden nicht zwischengespeichert
                und sind nur so lange persistent wie der Chatraum selbst.
              </li>
            </ul>
            <p>
              Insbesondere durch Aufrufe unserer Internetseite durch Dritte
              können wir nicht ausschließen, dass Ihre bereitgestellten Angaben
              (Benutzer ID, Vorname, Nachname, Hochschule, Studiengang,
              Semester, Fahrzeug, Geschlecht, Wohnort, Profilbild) kopiert,
              vervielfältigt, gespeichert oder weitergegeben werden. <br />
              <br />
              Widerspruchsmöglichkeiten: Sofern keine erforderlichen Gründe im
              Zusammenhang mit einer Geschäftsabwicklung bestehen, können Sie
              jederzeit die zuvor erteilte Einwilligung Ihrer persönlichen
              Datenspeicherung mit sofortiger Wirkung schriftlich (per E-Mail,
              Post) widerrufen (gem. Art. 21 DSGVO). <br />
              <br />
              Zur Gewährleistung der Datensicherheit für unsere Kunden ist es im
              Falle eines Widerrufes erforderlich, dass die widerrufende Person
              sich mittels aussagekräftigen Identifikationsnachweisen
              authentifiziert. Ihre persönlichen Daten (Benutzer ID, Vorname,
              Nachname, Hochschule, Studiengang, Semester, Fahrzeug, Geschlecht,
              Wohnort, Profilbild) werden dann unverzüglich aus unserem System
              gelöscht. <br />
              <br />
            </p>
          </div>
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
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
}
export default Datenschutz;
