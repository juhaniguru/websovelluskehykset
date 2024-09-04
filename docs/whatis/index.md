# Mitä?

Tältä sivulta löydät selitykisä muualla materiaalissa läpikäytyihin asioihin, jotka eivät koske suoraan opintojakson ydinsisältöä, mutta ovat kuitenkin tärkeitä sen ymmärtämiseksi

## Python Decorator

Python decorator on käytännössä funktio (A), joka ottaa toisen funktion (B) parametrina. A-funktion avulla voidaan lisätä B-funktioon toiminnallisuuksia koskematta B-funktion koodiin ollenkaan.

Olemme käyttäneet koodiesimerkeissä jo dekoraattoreita.

```py

# app.route() on dekoraattori!
@app.route('/vehicles')
def get_all_vehicles_page():  # put application's code here
    with mysql.connector.connect(user="root", database="sovelluskehykset_bad1", password="") as con:
        with con.cursor(dictionary=True) as cur:
            cur.execute("SELECT * FROM vehicles")
            vehicles = cur.fetchall()
            return render_template('vehicles/index.html', vehicles=vehicles)



```

Yo. esimerkissä app.route-funktio on dekoraattori, joka saa automaattisesti parametrinä <i>get_all_vehicles_page-funktion</i>. Käytännössä route-dekoraattori kiinnittää <i>/vehicles</i> routen <i>get_all_vehicles_page-routehandleriin</i>

:::info tä?

Ajattele, että ostat lahjan ja paketoit sen hienoon lahjapakettiin. Lahjapaketti on dekoraattori ja paketin sisällä oleva varsinainen lahja on funktio, jonka yläpuolella dekoraattoria käytetään. 


Hieno lahjapaketti antaa lahjan saajalle lisäarvoa muuttamatta itse lahjaa eli koskematta ollenkaan varsinaisen funktion koodiin. 


:::

dekoraattoreita voi tehdä myös itse. Katsotaan seuraavaksi, millainen dekoraattori on

Dekoraattoria käytetään aina sen funktion / luokan yläpuolella, jolle se antaa lisäarvoa / sisältöä. Kutsuttaessa dekoraattorin eteen laitetaan @-merkki.

### Dekoraattori, joka ottaa parametrinä vain funktion jonka yläpuolella sitä käytetään

Tehdään ylempi esimerkki uudelleen niin, että tietokantayhteys avataan dekoraattorissa ja injectataan routehandleriin dependencyna.

```py
# route_handler_func on funktio, 
# jonka yläpuolella dekoraattoria kutsutaan
# python huolehtii siitä, että dekoraattori saa
# sen alapuolella olevan funktio itselleen autom. parametrina
def get_db_conn(route_handler_func):
    # dekoraattori on siitä erikoinen,
    # että sen sisälle luodaan toinen funktio
    # tämä wrapper ottaa parametrikseen *args ja **kwargs
    def wrapper(*args, **kwargs):
        # kun tietokantayhteys avataan
        # ennen alkuperäisen funktion palauttamista, voimme
        # normaalisti laittaa con-muuttujan (tietokantayhteys)
        # routehandlerille parametrinä
        with mysql.connector.connect(user="root", database="sovelluskehykset_bad1", password="") as con:
            return route_handler_func(con, *args, **kwargs)
    
    # huom dekoraattorin pitää palauttaa sen sisäpuolella luotu funktio
    # mutta palautukseen ei tule sulkuja perään
    return wrapper

# routehandler

@app.route('/vehicles')
# dekoraattoreita voi olla useita allekkain
# saman funktion päällä kuten tässä
# huomaa, että dekoraattori ei saa käytettäessä perinteisiä funktion sulkuja
# peräänsä
@get_db_conn
# koska käytämme get_db_conn-dekoraattoria
# get_all_vehicles_page-handlerin yläpuolella
# routehandler saa con-muuttujan ensimmäisenä parametrinään


# dekoraattorissahan lähetetään routehandlerille myös 
# *args ja **kwargs, mutta niitä ei oteta tässä
# vastaan, koska emme tee niillä esimerkissä mitään.
def get_all_vehicles_page(con):  # put application's code here
    
        with con.cursor(dictionary=True) as cur:
            cur.execute("SELECT * FROM vehicles")
            vehicles = cur.fetchall()
            return render_template('vehicles/index.html', vehicles=vehicles)





```

Yo. koodi on klassinen esimerkki dependency injectionista, jossa menetelmänä on käytetty decorator injectionia. Injectoitava riippuvuus on tietokantayhteys. Tällä tavalla tehtynä voimme kutsua samaa dekoraattoria jokaisen routehandlerin päällä, joka tarvitsee tietokantayhteyden. Jos ja kun jokin tietokantayhteydessä (osoite tai tietokanta) vaihtuu, meidän tarvitsee muuttaa koodia vain yhdestä paikasta.

### Dekoraattori, joka tarvitsee muita parametrejä

Pääsynhallinta on web-sovelluksissa hyvin yleinen omainaisuus. Esimerkiksi voimme tehdä rajoituksen, joka sallii vain admin-käyttäjäryhmään kuuluvien käyttäjien lisätä tai poistaa toisia käyttäjiä.

Tämä on klassinen esimerkki dekoraattorista, joka ottaa parametrinaan käyttäjäryhmän nimen

Jos dekoraattori tarvitsee parametreja (muitakin kuin sen alapuolisen funktion), pitää dekoraattorin sisälle tehdä kaksi funktiota aiemman yhden sijaan.

```py

# tässä dekoraattori, joka ottaa parametrina vaadittavan roolin
def require_role(role_name):
    # ensimmäinen sisäinen funktio, 
    # joka ottaa parametrina dekoraattorin alapuolella olevan funktion
    def decorator(route_handler_func):
        # toinen sisäinen funktio, joka saa funktiolle annetut parametrit 
        def wrapper(con, *args, **kwargs):
            # otetaan yhteys tietokantaan kuten ennenkin
            with con.cursor(dictionary=True) as cur:
                # tämä on vain esim. kysely
                cur.execute("SELECT * FROM users WHERE id = (%s)", (1,))
                logged_in_user = cur.fetchone()
                # tarkistetaan, löytyykö kyseinen käyttäjä tietokannasta 
                # ja onko hänen roolinsa
                # toimenpiteeseen tarvittava rooli
                if logged_in_user is not None and logged_in_user['role'] == role_name:
                    # jos homma rokkaa, palautetaan alkuperäinen routehandler
                    #  (eli käyttäjä pystyy suorittamaan toimenpiteen)
                    # nyt olemme injektoineet jo tietokantayhteyden 
                    # ja sisäänkirjautuneen käyttäjän
                    return route_handler_func(con, logged_in_user, *args, **kwargs)
                    # jos käyttäjää ei löydy, tai rooli ei ole tarvittava
                    # näytämme käyttäjälle virheilmoituksen
                    # http-statuskoodilla 403 (forbidden)
                return jsonify({f'err': 'you have to be a member of {role_name} group to access this page'}), 403
            


```

Yo. dekoraattoria voidaan käyttää näin

```py

# tässä on vanha tuttu dekoraattori, 
# jolla sidotaan routehandler haluttuun routeen
@app.route('/api/users/')

# tässä aiemmasta esimerkistä tuttu dekoraattori,
# jossa yhdistetään tietokantaan
@get_db_conn

# tässä uusi dekoraattorimme,
# joka ottaa parametrin

# HUOM! Koska käytämme get_db_conn-dekoraattoria require_role-dekoraattorin yläpuolella
# con-muuttuja on käytössämme myös require_role-dekoraattorissa 
# aivan kuten missä tahansa funktiossa


@require_role('admin')
def get_all_users(con, logged_in_user):
    with con.cursor(dictionary=True) as cur:
        cur.execute("SELECT * FROM users")
        users = cur.fethall()
        return jsonify(users)



```

:::tip Jos et huomannut

esimerkkikoodin kommenteissa, con-muuttuja on käytössä require_role-dekoraattorissa aivan kuten missä tahansa normaalissa funktiossa, koska käytämme get_db_conn-dekoraatoria, require_role-dekoraattorin yläpuolella

<strong>Dekoraattoreiden järjestyksellä on siis merkitystä</strong>

:::

Nyt, kun tiedät mikä dekoraattori on ja miten sen toimii, voit palata takaisin <a href="/architectures/#dependency-injection-di">arkkitehtuureihin</a>