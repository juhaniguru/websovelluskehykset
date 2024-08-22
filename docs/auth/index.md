# AUTENTIKAATIO JA AUTORISOINTI

Autentikaatio tarkoittaa henkilöllisyyden todistamista web-palvelulle / tietokantapalvelimelle. Tavallisesti tämä tehdään kirjautumalla sisään järjestelmään esimerkiksi käyttäjätunnuksen ja salasanan avulla. Käyttäjätunnuksen ja salasanan lisäksi sisäänkirjautumisen yhteydessä voidaan myös käyttää jotakin toista henkilöllisyyden varmistavaa tekijää tai laitetta.

Autorisointi taas tarkoittaa toimenpidettä, jossa käyttäjälle annetaan pääsy rajoitettuihin resursseihin johonkin käyttäjän ominaisuuteen vedoten. Autentikointi tapahtuu aina ennen autorisointia, koska ensin pitää varmistaa, että käyttäjä on kirjautunut sisään ja sitten vasta tarkastella, onko käyttäjällä oikeutta johonkin resurssiin

:::info

Autentikaatio ja autorisointi ovat monitahoisia ja monimutkaisia kokonaisuuksia, joista opitaan lisää esim. Fullstack-opintokokonaisuudessa

:::

Käydään tällä opintojaksolla autentikaatiota ja autorisointia käpi kuitenkin tarvittava määrä sekä tietokannan että web-palvelun näkökulmasta


## KÄYTTÖOIKEUDET (PRIVILEGES)

:::info Lue lisää täältä

https://www.postgresql.org/docs/current/ddl-priv.html

:::

:::danger Älä koskaan

yhdistä softasta tietokantaan superuserina, koska superuserilla on kaikki oikeudet koko tietokantapalvelimelle. Luo aina tietokannalle oma käyttäjä, jolla ei ole oikeuksia muiden softien tietokantoihin.

:::

### KIRJAUTUMINEN


Käytämme esimerkeissä PostgreSQL:ää komentoriviltä.

:::info käyttäjänimi & salasana

Postgren oletus käyttäjänimi superuserille on <i>postgres</i>. Salasanan olet asettanut asennushetkellä itse. 

<strong>Jatkossa kirjautumista ei erikseen mainita joka esimerkin kohdalla</strong>

:::

```sql
-- psql <tietokanta> <käyttäjä>
-- molemmat (tietokanta ja käyttäjä) ovat tässä tapauksessa postgres. 
-- Meillä ei ole vielä tietokantaa, niin käytämme ylläpitotietokantaa,
-- jotta pääsemme kirjautumaan
psql postgres postgres

-- tämän jälkeen palvelin kysyy postgres-käyttäjän salasanan.

```

### LUODAAN UUSI TIETOKANTA

```sql

create database blog_db;

```


### LUODAAN TIETOKANNALLE OMA KÄYTTÄJÄ

```sql

create user blodg_db_user with encrypted password 'password';

```

Oikeassa tietokannassa salasanan kannattaa olla vahvempi

### ANNETAAN UUDELLE KÄYTTÄJÄLLE OIKEUDET TIETOKANTAAN

```sql

grant all privileges on database blog_db to blog_db_user;

```

Nyt voit käyttää uutta käyttäjää softassasi, joka tarvitsee kyseistä tietokantaa. Uudella käyttäjällä on kaikki oikeudet vain yhteen tietokantaan, mikä pitää tietomurtojen sattuessa vahingot minimissä.

Oikeuksia ei tarvitse määrittää jatkossa jokaiselle tietokannan taululle erikseen, koska tietokannan käyttöoikeudet koskevat myös kaikkia sen tauluja. Mutta taulukohtaiset käyttöoikeudet ovat toki mahdollisia. 

Tietokannan käyttäjälle ei tietenkään myöskään tarvitse oletuksena myöntää kaikkia oikeuksia. Jos haluat tehdä käyttäjän, jolla pystyt tekemään RestAPIn CRUD-toiminnot (CreateReadUpdateDelete), voit myöntää ne näin:

```sql

GRANT SELECT ON TABLE <taulun nimi> TO <rooli>

```

:::info REVOKE

sen, minkä GRANT myöntää REVOKE ottaa pois

:::





## RLS (ROW LEVEL SECURITY)



Käyttöoikeuksien (privileges yllä) lisäksi Postgres tukee myös tarkempia, rivikohtaisia pääsyvaatimusrajoitteita. 



:::info

Luodaan tietokantaan pari taulua RLS-esimerkkiä varten. Käytämme tähän Datagrip-sovellusta.

:::


<b>Row Level Security Policyt eivät koskaan yliaja yo. käyttöoikeuksia (privileges)</b>

:::info Lue lisää

RLS:stä täältä: https://www.postgresql.org/docs/current/sql-createpolicy.html<br>
ja täältä: https://www.postgresql.org/docs/current/ddl-rowsecurity.html

:::

### ENABLE ROW LEVEL SECURITY

RLS Policyt luodaan aina taulukohtaisesti. Siksi, ennen kuin voit luoda uusia pääsyrarjoituksia, sinun pitää sallia RLS:n käyttö jokaisessa taulussa erikseen


```sql
-- laitetaan RLS päälle


ALTER table <taulu> ENABLE ROW LEVEL SECURITY;

```

### CREATE POLICY

```sql

CREATE POLICY name ON table_name
    [ AS { PERMISSIVE | RESTRICTIVE } ]
    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]
    [ TO { role_name | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( using_expression ) ]
    [ WITH CHECK ( check_expression ) ]


```

#### name

Tämä on policyn nimi

#### table_name

Tämä on taulun nimi, johon policy liitetään. Muista policyt ovat taulukohtaisia.

#### AS 

Tämä on vapaaehtoinen argumentti, joka on oletuksena PERMISSIVE. Jos policy on PERMISSIVE, ja sinulla on useampi policy joka koskee samaa kyselyä, riittää että yksi policyistä menee läpi* Permissive policyjen ehdot yhdistetään siis OR:lla

RESTRICTIVE puolestaan tarkoittaa, että saman kyselyn eri policyjen pitää kaikkien mennä läpi, ne yhdistetään siis AND:lla.

<i><small>*) Menee läpi: USING- tai WITH CHECK-lausekkeiden ehto on TRUE</small></i>

#### FOR

FOR on vapaaehtoinen argumentti, jolla voi määrittää, mitä kyselyä policy koskee. Oletusarvo on ALL, mikä tarkoittaa, että policy koskee kaikkia kyselyjä. 

#### TO

TO on vapaaehtoinen argumentti, jolla voit määrittää roolit, joita policy koskee. Sen oletusarvo on PUBLIC, mikä tarkoittaa, että policy koskee kaikkia ryhmiä.

#### USING

USING tarvitsee argumentikseen lausekkeen, joka palauttaa totuusarvon (TRUE | FALSE). Jos lausekkeen tulos on FALSE, kysely johon policy on liitetty ei onnistu. TRUE:n palauttaessan kysely taas onnistuu (tai menennään seuraavaan policyyn, jos AS-argumetti on RESTRICTIVE)

Jos asetat policyn FOR-argumentissa SELECT:lle, UPDATE:lle tai DELETE:lle, USING:n paluuarvo vaikuttaa näihin kyselyihin.

Kyselyjen rivit, joiden kohdalla USING:n ehto on TRUE näkyvät käyttäjälle. Ne rivit, joiden kohdalla USING palauttaa FALSE, eivät näy käyttäjälle.

USING:n argumentin ehto koskee siis taulussa jo olevia rivejä

#### WITH CHECK

WITH CHECK on kuin USING, mutta WITH CHECK koskee INSERTia ja UPDATEa. Huomaa, että UPDATEn tapauksessa voit tarvita WITH CHECKin lisäksi myös USINGia. 

USINGin ehdolla voit määrittää, näkyykö rivi päivitystä varten (jos USING on FALSE riviä ei voi päivittää, koska sitä ei löydy) ja WITH CHECKillä voit vaikuttaa niihin ehtoihin, jotka määrittävät, millainen uusi arvo voi olla.



#### LUODAAN PARI ERILAISTA RLS POLICYA

:::info RLS-esimerkin vuoksi muutetaan taulujen käyttöoikeuksia

Koska privileges-oikeudet menevät RLS-policyjen edelle, RLS-esimerkin vuoksi annamme SELECT-oikeuden tietokannan tauluihin kaikille. Luodaan lisäksi vielä uusi rooli (adminuser)


:::

```sql

1)

-- muutetaan blog-taulun oikeuksia niin, 
-- että kaikki voivat tehdä select-kyselyjä

-- PUBLIC tarkoittaa, että käyttöoikeusrajoituksia 
-- ei SELECT-lauseelle ole

GRANT SELECT ON blog TO PUBLIC;


2)

-- tehdään sama user-taululle

GRANT SELECT ON user to PUBLIC;

3)

-- Jos sinulla on auto increment primary key-sarake, jotta insert toimii, pitää antaa vielä GRANT-oikeus SEQUENCEja varten

-- annetaan se kaikille sequenceille public schemassa (taulut ovat public schemassa)

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO PUBLIC;

4) 



-- luodaan uusi rooli 

-- (muista, että roolin luontia varten pitää olla postgres-käyttäjänä)
-- tarkista oma käyttäjänimi SELECT current_user;
-- jos se ei ole postgres
-- vaihda rooli: SET ROLE postgres;


CREATE USER adminuser;


```

Nyt seuraavaksi luodaan RLS-policyt

```sql

-- tämä luo policyn nimeltä select_all tauluun blog. 
-- Policy koskee SELECT-lauseketta ja 
-- USING(true) tarkoittaa, että ehto on aina totta
-- Koska USING-lausekkeen ehto on aina totta, kaikki pystyvät
-- suorittamaan SELECT-lausekkeen tauluun 

CREATE POLICY select_all ON blog FOR SELECT USING(true);

```



```sql

-- tämä policy vaatii, että käyttäjä, joka lisää blog-tauluun rivin, 
-- on ryhmässä adminuser (eli vain admin-käyttäjät voivat lisätä)

CREATE POLICY admin_insert ON blog FOR INSERT TO adminuser 
WITH CHECK(current_user = (SELECT u.username FROM public.user AS u 
INNER JOIN blog ON blog.user_id = u.id 
WHERE u.username = current_user LIMIT 1));



```

:::info WITH CHECK ja USING?

USING-lauseketta käytetään ehdon luomiseen oo. riveille ja WITH CHECK-rajoite tehdään uusien rivien luontia varten. 
Tämän vuoksi SELECTissä on käytössä USING ja INSERTissä WITH CHECK. Esim UPDATEn kanssa voidaan käyttää molempia. UPDATEssa USING vaikuttaa siihen, mitä rivejä voidaan muokata ja WITH CHECK vaikuttaa siihen, millaisiksi arvoja voidaan muuttaa.

:::

:::info CURRENT_USER 

current_user on Postgren sisäänrakennettu funktio, joka palauttaa sisäänkirjautuneen käyttäjän 

:::


```sql

-- kirjaudutaan sisään

psql postgres postgres

-- katso nykyinen käyttäjä

SELECT current_user;

-- vaihda rooli 

SET ROLE adminuser;


-- katso nykyinen käyttjä uudeleen

SELECT current_user;

```

:::info CREATE USER ja SET ROLE

Jos ihmettelet, miksi käyttäjä luodaan kommennolla CREATE USER, mutta sitten kuitenkin käyttäjä vaihdetaan käyttäen SET ROLE-komentoa, se johtuu siitä, että CREATE USER-komento on CREATE ROLE:n alias.

:::

RLS:n opettelu ei mene hukkaan, mutta emme keskity siihen, koska se ei toimi kaikilla tietokannoilla. Kaikista joustavinta on toteuttaa autentikaatio ja autorisointi ohjelmakoodiin (esim. Pythonilla). Tällöin autorisoinnista voidaan tehdä tietokantariippumatonta


## AUTENTIKAATIO JA AUTORISOINTI OHJELKMAKOODISSA

:::info

Teen autentikaatio- ja autorisointiesimerkit Pythonilla. Tehdään tätä yhdessä tunneilla

:::

 


### FastAPI

FastAPI on Python-framework, jolla voidaan tehdä nopeasti ja vaivattomasti Rest API-softia. Käytämme sitä, koska sitä on aiemmin käytetty web-ohjelmointirajapinnat-opintojaksolla. Emme kuitenkaan keskity FastAPiin tällä opintojaksolla, koska pointti on tiedonhallinnassa. Käymme kuitenkin FastAPIn periaatteita läpi oppitunneilla.

:::info Lue lisää täältä

https://fastapi.tiangolo.com/

:::


### JWT (JsonWebToken)

:::info JWT: RFC

https://datatracker.ietf.org/doc/html/rfc7519

:::

JWT on autentikointi- ja autorisointimekanismi web-palveluihin. Sen avulla pystytään siirtämään turvallisesti tietoja eri web-palvelujen välillä JSON-objekteina. JWT:hen tallennettuun tietoon ja sen eheyteen voi luottaa, koska se on digitaalisesti allekirjoitettu. JWT-tunnisteet voidaan allekirjoittaa joko symmetrisesti salaisella tiedolla (merkkijono, joka on vain ohjelmistossa ja sen haltijan tiedossa, eikä sitä koskaan viedä ohjelmiston ulkuopuolelle), tai assymetrisesti julkisella ja yksityisellä avaimella. Symmetrisesti allekirjoitettu tunniste sekä luodaan että avataan samalla salaisella merkkijonolla. Asymmetrisesti allekirjoitettu luodaan yksityisellä avaimella ja sen voi avata julkisella avaimella.

JWT-tunnisteet voidaan myös salata, mutta me keskitymme tässä vain salamaattomiin tunnisteisiin.

:::info HUOM

Huomaa, että allekirjoitus ei ole sama kuin salaus. Allekirjoituksen tarkoitus on vain taata, että tunnisteisiin tallennetut tiedot ovat eheitä, eli niitä ei ole pystytty 'käpälöimään', mutta se ei tarkoita sitä, ettei sitä pystyisi kukaan muu taho lukemaan.

:::

![auth](./images/1.png)
<i>Arkkitehtuurikuva verkkokaupan X hajautetusta mikroserveriarkkitehtuurista.</i>

- Autentikaatiopalvelu: Tässä mikroservisessä on käyttäjähallinta ja siellä luodaan JWT-tunnisteet

- Ostoskoripalvelu: Tässä mikroservisessä hallinnoidaan asiakkaiden ostoskoreja

- Katalogipalvelu: Tässä mikroservisessä on logiikka, jolla selaillaan tuotteita

- Asiakkuuspalvelu: Tässä mikroservisessä hallinnoidaan verkkokaupan asiakkuuksia


### A) Symmetrinen allekirjoitus
Jos tämä arkkitehtuuri toteutetaan symmetrisesti allekirjoietulla JWT-tunnistella, pitää sama salainen merkkijono jakaa kaikille mikroserviseille. Tämä nostaa todennäköisyyttä tietomurrolle, jossa hyökkääjä pystyy varastamaan allekirjoitusmerkkijonon ja esiintyy autentikaatiopalveluna pystyen näin varastamaan kaikki käyttäjätiedot

### B) Asymmetrinen allekirjoitus

Jos taas tämä arkkitehtuuri toteutetaan asymmetrisesti allekirjoitetulla JWT-tunnistella, luodaan yksityinen ja julkinen avainpari. Yksityinen avain ei koskaan poistu autentikaatiopalvelusta ja sillä luodaan JWT-tunnisteet.

Sen sijaan julkinen avain jaetaan kaikkiin muihin palveluihin. Julkisella avaimella kaikki muut mikroserviset pystyvät tunnistamaan käyttäjät, koska julkisella avaimella tunnisteen voi lukea. Mutta kukaan ei pysty esiintyymään väärin perustein autentikaatiopalveluna, koska JWT:t luodaan ainoastaan yksityisillä avaimilla, ei julkisilla.

### JWT:n rakenne

JWT koostuu kolmesta eri ostasta, headerista, payloadista ja signaturesta, jotka erotetaan pisteellä toisistaan


:::info Miksi pisteellä?
Koska header ja payload ovat Base64-enkoodattuja merkkijonoja, ne on turvallista erottaa toisitaan pisteellä.
:::

Sen jälkeen tähän kokonaisuus allekirjoitetaan tavasta riippuen salaisella merkkijonolla tai yksityisellä avaimella

#### HEADER
Header sisältää yleensä ainakin tunnisteen tyypin esim. (JWT) ja allekirjoitukseen käytetyn algoritmin
<strong>Muista aina tarkistaa algoritmin oikeellisuus.</strong> JWT:n speksi sallii algoritmina none, joka käytännössä tarkoittaa, ettei tunniste allekirjoiteta ollenkaan. <strong>Älä koskaan hyväksy tunnistetta, jota ei ole joko salattu tai allekirjoitettu</strong>


#### PAYLOAD
Tämä osio vaihtelee monesti tunnisteen käyttötarkoituksen mukaan.
JWT:n RFC-speksin mukaan on olemassa muutama ennaltarekisteröity tietue, joita tämä payload-yleensä sisältää

- iss (issuer) eli myöntäjä on taho tai palvelu, joka on luonut tunnisteen <strong>Muista aina tarkistaa tämä</strong>
- sub (subject) eli tunnisteen aihe, monesti tämä voi olla yksilöllinen tunniste käyttäjästä
- aud (audience) eli se kenelle myöntäjä on tarkoittanut tunnisteen käyttöön <strong>Muista aina tarkistaa tämä</strong>
- exp (expiration) eli voimassaoloaika, tai aika, jolloin tunniste vanhenee <strong>Älä koskaan hyväksy tunnistetta, joka on vanhentunut tarkastushetkeen menneessä</strong>
- iat (issued at time) myöntöhetki 
- nbf (not before) eli aika josta lähtien tunniste on voimassa <strong>hylkää tunnisteet, joiden nbf on tulevaisuudessa</strong>
- jti (token identifier) tämä on yksilöllinen tunniste, jonka moni möyntäjä laittaa mukaan tehdäkseen tunnisteista aina yksilöllisen, vaikka kaikki muut tiedot olisivat samoja

:::info Huom!

Muista, että koska tässä käsitellään allekirjoitettuja tunnisteita (ei siis salattuja), kaikki vastaanottajat pystyvät lukemaan tunnisteiden sisällön. 

:::

- Älä milloinkaan tallenna tunnisteeseen arkaluontoisia henkilötietoja, vaan korvaa ne yksilöllisellä tunnisteella, jota voit sitten käyttää tietokantahaussa (opaque token), kun haet käyttäjän tietoja taustapalvelussa. Näin vältyt henkilötietojen leviämiseltä palvelun ulkopuolelle. 
- Muista myös aina käyttää tarpeeksi pitkää yksityistä avainta allekirjoitukseen, jotta se on vaikeampi murtaa raa´alla laskentateholla, 
- äläkä ikinä käytä symmetrisesti allekirjoitettua tunnistetta, jos mahdollista.

JWT:tä ei kannata tallentaa localstorageen tai sessionstorageen, koska sinne pääsee käsiksi JavaScriptillä. 

#### ALLEKIRJOITUS

Yhdistelmä headerista ja payloadista allekirjoitettuna.



### JWT:n LUOMINEN

Eri ohjelmointikielillä on useita eri kirjastoja, joilla JWT-tunnisteita voi luoda ja lukea, käytetään esimerkeissä pyJWT-kirjastoa

#### SYMMETRINEN ALLEKIRJOITUS

```python
# pip install PyJWT[crypto]
import jwt
import uuid

def create(self, sub):
    now = time.time()
    # user.unique_identifier = claims

    access_token = jwt.encode({'sub': sub,
        'iss': 'http://juhaninsiistipythonskripti.com',
        'aud': 'localhost',
        'exp': now + 3600, 'nbf': now - 500, 'iat': now},
        'verysecretsharedkey',
        algorithm="HS512")

access_token = create(str(uuid.uuid4()))


```

Yo. esimerkkikoodi luo symmetrisesti allekijroitetun JWT-tunnisteen, jonka subjektina on satunnainen merkkijono. Jos tämän merkkijonon tallentaa tietokantaan käyttäjän tietoihin sisäänkirjautumisen yhteydessä, tällä voi tunnistaa käyttäjän tallentamatta JWT-tunnisteeseen mitään arkaluontoista tietoa itse käyttäjästä

## JWT:N LUKEMINEN

Koska nämä tunnisteeton allekirjoitettuja, mutteivat salattuja, kaikki pystyvät lukemaan niiden sisällön, siksi niihin ei koskaan kannata tallentaa arkaluontoisia tietoja. Nyt katsotaan, miten voi varmistua, että JWT, jonka asiakassovellus lähettää palvelimelle on oikeasti validi

#### SYMMETRINEN ALLEKIRJOITUS

```python

def validate(encoded_token):
    claims = jwt.decode(encoded_token, 'verysecretsharedkey', 'HS512', audience='localhost')
    # claimit sisältävät selkokielisen payloadin, eli sen, mitä tokeniin on luontihetkellä tallennettu
    # get_user_by_sub on mikä tahansa toteutus, joka varmistaa, että käyttäjä on oikeasti olemassa
    # se ei ole tässä nyt tärkeää.
    user = get_user_by_sub(claims['sub'])
    return user

TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNDE3ODBmMi1jZDcxLTRhMDEtYjliOC03NjA3YTU5MmQ3OTEiLCJpc3MiOiJodHRwOi8vanVoYW5pbnNpaXN0aXB5dGhvbnNrcmlwdGkuY29tIiwiYXVkIjoibG9jYWxob3N0IiwiZXhwIjoxNjkzMTUxMjYzLjc0NzA2NywibmJmIjoxNjkzMTQ3MTYzLjc0NzA2NywiaWF0IjoxNjkzMTQ3NjYzLjc0NzA2N30.GDvKXWK26gG5v5bKXDunNjSS7CKw9wk7pPTVAP_JVoKhjGt4hTs_S33ioTnWGJCCxfOQwUtsEKvt9U9-t3iAyCeKWvnMX93pGOeKxtuurIv5UhWntRtgPeVOws47mnOiC4QGg2FsD_21ayk6OP_yJPjesxPH8-a7Tc1ejAXau4S-tQ-Ej9k_-KYOr4R_O7I_8I-s3VvGMK-8OrZlgqK8gW-taqBTy8jO_t1pC9KHt-hFt6-B58fvs-7ED9zc-f7PYyzUTH3dZPdSSDzSstNDEjYh3UR4ss9qq2HaEP2fOcLH5kJ6aRQHREDg-Peg6ii45R9g4QfgZn0Rns9KA3CrVZ1Ftkp9ZM7Tx09kj229--PUtkCpxkiUWLfEgfVc8NukwGlZVW8GEAPW3h0-pXiTyWJKFDgrBS_YMtDIS9TzTAHf_or12kFE18wpkjxra_LpdVZfPrgiZDMQV70pCtpATdj9qDyamkCWW_tWUE3IoW-GCI2KQlMZ8XPTuKZ9KNGDPJUA4NWWlUxuInoxNafUTLynpgAjSL5OmKwccGBttZZSfzeGz3WbPEOTx2VbOkAhC9C8KvF8EZoK9bctzCXrL2VH45qZqL7boC-U3fJF6kpvKfRoBXp_jK_fBp_xSA7zjbYELVHGSCeWMnE0sFUW0oj8tr8MOVEG1Ytcox2xhFM'

logged_in_user = validate(TOKEN)

```



