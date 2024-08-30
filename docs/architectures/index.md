# YLEISIMMÄT SOVELLUSKEHYSTEN PERIAATTEET JA ARKKITEHTUURIT

Suunnittelumenetelmiä ja arkkitehtuureja on olemassa hyvin paljon ja ne voivat olla sovellusalakohtaisia. Esimerkiksi reaaliaikasovelluksissa voidaan käyttää eri suunnittelumalleja ja periaatteita kuin pyyntö/vastaus-periaatteella toimivassa web-sovelluksessa. Myös mobiilisovelluksissa ja työpöytäsovelluksissa voidaan käyttää eri suunnittelumalleja kuin web-sovelluksissa.

<strong>Tällä opintojaksolla keskitytään web-ohjelmoinnin ja web-sovelluskehysten yleisimpiin suunnitetlumalleihin</strong>. Toteutamme suunnittelumalleja käyttäviä koodeja itse ilman frameworkia ja tutkimme myös, miten nämä suunnittelumallit voidaan ottaa käyttöön joissakin mainituissa frameworkeissa.

## MVC

MVC-malli eli <strong>M</strong>odel<strong>V</strong>iew<strong>C</strong>ontroller koostuu kolmesta sovelluksen eri kerroksesta <strong>M</strong>odel eli mallikerros vastaa tietokannan tauluja. Jokaisesta tietokannan taulusta tehdään ohjelmaluokka (Class). <strong>C</strong>ontroller on ohjelmaluokka (Class) tai kasa funtkioita, jotka ottavat vastaan clientin web-palvelimelle lähettämät requestit, käsittelevät ne (se, miten pyynnöt käsitellään riippu routen tarkoituksesta) ja lähettää clientille responsen takaisin <strong>V</strong>iewinä eli käyttäjälle näkyvänä osana.

![architectures](./images/1.png)

- <strong>1. request:</strong> Käyttäjä kirjoittaa selaimelle osoitteen
    * palvelimella jokaiseen routeen on kiinnitetty joku Controllerin funktio / metodi. Eli kun menet web-palvelimella johonkin osoitteeseen, siihen kiinitetty Controllerin funktio suoritetaan.

- <strong>2. Asiakkaan requestin tarvitsema data tietokannasta:</strong> Controllerin tehtävä on toimia kapellimestarina, joka ottaa pyynnöt vastaan, hakee tietokannasta modelin kautta tarvittavat datat ja palauttaa ne asiakkaalle responsena.

- <strong>3. Konkreettinen kysely tietokantaan:</strong> Model-ohjelmaluokka on se paikka, jossa tehdään konkreettinen tietokantakysely tietokantaan

- <strong>4. Kyselyn tulos tietokannasta &</strong> 5. <strong>jokainen tuloksen rivi muutetaan model-classin instanssiksi:</strong> Kun Model-luokassa tehdään konkreettinen kysely tietokantaan kohdassa 3., tietokanta palauttaa kyselyn tuloksen. Jokaisesta tuloksen rivistä tehdään Model-luokan instanssi.

- <strong>6. Palautetaan modelista 5. kohdan tulos takaisin Controlleriin</strong> Controller ottaa vastaan tietokantakyselyn tuloksen model-luokan instansseina. Kyselyä ei siis suoraan palauteta Controlleriin tietokannasta. Miksi? Tähän vastaus selviää hieman myöhemmin, kun teemme esimerkkejä

- <strong>7. respone</strong> Koska Controller on kapelimestari, joka johtaa koko orkesteria, se vastaanottaa pyynnöt asiakkaalta ja palauttaa vastauksen asiakkaalle. Tässä kohtaa Cotrollerin tehtävä on palauttaa vastaus pyydetyssä formaatissa (html, xml, json)


### Kerrataan


Kun käyttäjä suorittaa jonkun toiminnon nettisivulla, siitä lähtee pyyntö johonkin nettiosoitteeseen. Tähän nettiosoitteeseen lähetetty pyyntö menee Controllerin funktiolle / metodille käsiteltäväksi. Controllerin funktio / metodi puolestaan useimmiten hakee, lisää tai päivittää olemassa olevaa tietoa tietokantaan. Tämän operaation tekee Model-luokka.

Kun Model-luokka on tehnyt tehtävänsä, se palauttaa kyselyn tuloksen takaisin Controllerille, joka puolestaan lähettää vastauksen takaisin käyttäjälle. Vastaus näkyy päivityksenä nettisivulla.


#### Model

![architectures](./images/2.png)

Jokaisesta tietokannan taulusta tehdään oma Model-ohjelmaluokka (Class), jossa on kaikki tietokantataulun sarakkeet. Modeliin tulee tietokantaan liittyvä koodi (ns. data access layer). 

:::tip Yksikkö vai monikko?

Huomaa, että taulun nimi tietokannassa on usein pienellä ja monikossa. Kirjoitusasu ei ole pakollinen, vaan koodari saa itse päättää tietokannan taulujen nimet. <strong>Model-luokka on kuitenkin yksikössä, koska jokainen Model-luokan instanssi kuvastaa yhtä käyttäjää. Jokaisesta tietokantaulun rivistä tehdään yksi instanssi. Model-luokka alkaa isolla kirjaimella tässä tapauksessa, koska se on Pythonin nimeämiskäytännön mukaista</strong>


:::

#### View

MVC:ssä view on käyttäjälle näkyvä osa. Se voi olla HTML-sivu tai kuten tässä esimerkissä JSON-vastaus


![architectures](./images/3.png)

#### Controller

MCV:ssä Controller ottaa pyynnöt vastaan, käsittelee ne asianmukaisesti (esim. hakee tietokannasta tavaraa Modelin kautta) ja palauttaa vastauksen takaisin asiakkaalle.

Ohjelmointikielestä ja käytetystä frameworkista riippuen Controller voi olla ohjelmaluokka tai sitten yksinkertaisesti tiedosto, jossa on kasa funktioita.

:::tip Mistä tiedän, kuinka monta Controlleria tarvitsen ja mistä kaikista pitää tehdä Controller?

Hyvin tyypillisesti frameworkit, joissa routet luodaan automaattisesti tekevät näin

https://domain.com/controller/controllerin_funktio_tai_metodi

Vaikka käyttäisit työkalua, joka ei luo routeja automaattisesti, kannattaa tätä käytäntöä kuitenkin seurata, koska se on hyvin paljon käytetty ja tuttu koodareille, jotka tietävät, miten MVC toimii

<strong>Eli jos url on <i>http://localhost:5000/api/users/get_all_users</i>, tehdään users-controller, jossa get_all_users-funktio tai metodi</strong>

Hyvin usein kuitenkin controllerin funktion nimi voidaan jättää pois urlista, kun kyseessä on rest api ja käytetään restful routingia. Urli voi siis olla http://localhost:5000/api/users/, jossa users-controllerin funktion nimi on get_all_users, mutta se liitetään routeen /.

Jos et muista restful routingin perusperiaatteita, palauta ne mieleen <a href="https://juhaniguru-webapis.onrender.com/rest/#resurssimetodit">täältä</a>

:::




### Tuntiharjoitus

:::tip Koodataan 

Katsotaan esimerkki koodista ilman MVC-mallia ja tehdään sama sen jälkeen käyttäen MVC:tä. Näin erot ja suunnittelumallin hyödyt huomaa helpoiten.

:::

:::tip *)

Jos käytät PyCharmia IDEnä, sinun ei tarvitse luoda itse virtualenviä, vaan PyCharmin pitäisi luoda ja käynnistää se sinulle automaattisesti.

:::

:::tip **)

Jos luot, tai PyCharm luo, virtualenvin eri nimellä kuin venv, muista vaihtaa se komentoon.

:::



1. Hae Githubista mallikoodi ja tietokanta
2. Asennus
    * tarvitset tähän MySQL:n MariaDB:n (jotta tietokantayhteys saadaan päälle)
    * tarvitset myös Pythonin
    * luo sen jälkeen virtualenv*: <i>python -m venv venv</i> tai macilla <i>python3 -m venv venv</i>
    * käynnistä sen jälkeen virtualenv*, **: <i>venv\Scripts\activate</i> tai macilla <i>source venv/bin/activate</i>
    * asennuksien jälkeen aja komento <i>python -m pip install -r requirements.txt</i> tai Macilla <i>python3 -m pip install -r requirements.txt</i>

3. Varmista sen jälkeen, että sovellus lähtee päälle: <i>python app.py</i>
4. Kun sovellus käynnistyy mene osoitteisiin <i>http://localhost:5000/api/users</i> ja <i>http://localhost:5000/api/products</i>
ja paina mieleen vastauksen muoto (kentät ja niiden arvot). Asiakkaalle menevä vastaus ei saa koskaan muuttua, jos koodia konepellin alla refaktoroidaan.






