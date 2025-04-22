# backend-web-project

Tämä projekti on yksinkertainen tehtävienhallinta-API, joka on toteutettu Node.js:llä ja Expressillä. Sen avulla voidaan käsitellä tehtäviä eli "to-doja" HTTP-pyyntöjen avulla. Projektissa rakennetaan oma pieni palvelin, joka tallentaa tehtävät tasks.json-tiedostoon.

Toteutuksen päävaiheet:

Projekti alustetaan Node.js:llä, ja Express otetaan käyttöön palvelimen rakentamiseen.

Tehtävät tallennetaan paikalliseen tasks.json-tiedostoon, joka toimii yksinkertaisena tietokantana.

Luodaan REST API, joka tukee neljää perustoimintoa (CRUD):

GET /tasks – Hakee kaikki tehtävät

POST /tasks – Lisää uuden tehtävän

PUT /tasks/:id – Päivittää olemassa olevan tehtävän

DELETE /tasks/:id – Poistaa tehtävän

API:ta testataan esimerkiksi Postmanilla lähettämällä pyyntöjä ja tarkastelemalla vastauksia.

Sovellus käynnistetään paikallisesti komennolla node index.js.

Tämän projektin tarkoituksena on oppia, miten Expressillä rakennetaan API, kuinka käsitellään JSON-tiedostoja, ja miten yksinkertainen palvelin toimii. Projekti on kevyt mutta toimiva
