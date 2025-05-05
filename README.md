Tämä dokumentaatio kuvaa projektin tämänhetkistä tilaa ja suunnitelmaa. Kyseessä on projektin aloitusvaihe, ja sisältöä saatetaan päivittää työn edetessä.

Projektin kuvaus
Tämä projekti on yksinkertainen tehtävienhallinta-API, joka on toteutettu Node.js:llä ja Expressillä. API:n avulla voidaan käsitellä tehtäviä eli "to-doja" HTTP-pyyntöjen avulla. Projektissa rakennetaan oma pieni palvelin, joka tallentaa tehtävät paikalliseen tasks.json-tiedostoon.

Lisäksi projektiin on lisätty käyttäjänhallintaan liittyviä ominaisuuksia: jsonwebtoken ja bcrypt -kirjastot on asennettu, ja toteutettu salasanan hashauksen ja kirjautumisen logiikka.

Projektin tarkoituksena on oppia:
MITEN rakennetaan API Expressillä

KUINKA käsitellään JSON-tiedostoja Node.js:llä

MITEN yksinkertainen palvelin toimii paikallisesti

KUINKA toteutetaan käyttäjän autentikointi Node.js-ympäristössä

Tech Stack
Node.js – Palvelympäristö

Express – Web-sovelluskehys

Postman – API-testaus

JSON – Tiedon tallennukseen

jsonwebtoken – Käyttäjän autentikointiin

bcrypt – Salasanojen turvalliseen tallentamiseen

Toteutuksen päävaiheet
Projektin alustus
Projekti alustetaan Node.js:llä, ja Express otetaan käyttöön palvelimen rakentamiseen.

Tietojen tallennus
Tehtävät tallennetaan paikalliseen tasks.json-tiedostoon, joka toimii yksinkertaisena tietokantana.

REST API:n toteutus
Luodaan API, joka tukee seuraavia perustoimintoja (CRUD):

GET /tasks – Hakee kaikki tehtävät

POST /tasks – Lisää uuden tehtävän

PUT /tasks/:id – Päivittää olemassa olevan tehtävän

DELETE /tasks/:id – Poistaa tehtävän

Käyttäjänhallinta
Lisättiin käyttäjien rekisteröinti ja kirjautuminen:

Salasanat tallennetaan hashattuna bcrypt-kirjastolla

Kirjautumisen yhteydessä luodaan JWT-token jsonwebtoken-kirjastolla

Autentikointi tarkistetaan suojatuilla reiteillä

API:n testaus
API:ta testataan esimerkiksi Postmanilla lähettämällä pyyntöjä ja tarkastelemalla palvelimen vastauksia.

Sovelluksen käynnistäminen
Sovellus käynnistetään paikallisesti komennolla: node index.js
