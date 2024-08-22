# REST API-KUTSUT

Käytämme tällä opintojaksolla retrofit2-kirjastoa HTTP-pyyntöjen lähettämiseen ja vastaanottamiseen

## ENNAKKOVAATIMUKSET

### Sallitaan sovelluksen käyttää internetiä

1) Avaa AndroidManifest.xml ja lisää sovellukselle lupa käyttää internetiä

```xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />

```

2) Lisätään vielä lupa käyttää suojaamatonta (ei https) HTTP-yhteyttä

:::warning Älä salli tätä oletusarvoisesti muissa sovelluksissa

Nyt kun käytämme tällä opintojaksolla valmista backendia, joka pyörii jokaisen koneella paikallisesti, meillä ei ole käytössä https-yhteyttä.

:::

```xml

<application
android:usesCleartextTraffic="true" 


/>

```

### Asennetaan riippvuudet

3) Avaa build.gradle.kts (:app) tiedosto ja entsi dependencies



```kts

dependencies {

    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    .... muita riippuvuuksia
}

```

Muista tämän jälkeen syncata gradle build

#### Gson

Gson on alunperin vuonna 2008 Googlen kehittämä kirjasto Jsonin serialisointiin ja deserialisointiin. Meidän ei tarvitse itse käyttää tässä projektissa Gsonia, vaan konfiguroimme Retrofitin käyttämään Gsonia. 

Gson mahdollistaa Kotlin data classien lähettämisen Json-formaatissa backendille ja vastaavasti backendilta tulevien Json-muotoisten vastausten muuttamisen Kotlin data classeiksi.



:::info data class?

Kotlinissa on erityinen data class, jonka perimmäinen tarkoitus on datan siirtäminen paikasta toiseen  puhelinsovellus<->backend

Periaatteessa tähän tarkoitukseen voisi käyttää myös normaalia Kotlin classia, mutta data classin käyttö on suositeltavaa, koska Kotlin luo data classeille automaattisesti ominaisuuksia, jotka pitäisi koodata itse "normaaleihin" (muihin kuin data) classeihin.

Konkreettisia esimerkkejä data classien käytöstä saatte pitkin opintojaksoa.    


:::



## Luodaan api-paketti
Luodaan oma paketti (api), johon luomme kaikki tiedostot tiedonsiirtoa varten. 

### Luodaan Client.kt-tiedosto

Lisää tämä ao. koodi Client.kt-tiedostoon

```kt

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

// tällä funktiolla luomme jokaista eri api-paketin tiedostoa varten oman 
// retrofit-instanssin
fun createClient(): Retrofit {
    // baseUrl on backendimme urlin alku, jota retrofit käyttää
    // 10.0.0.2 on localhostin osoite Androidissa.
    // jos kirjoitat tähän localhost, se ottaa yhteyden emulaattoriin, 
    // ei tietokoneen localhostiin.
    return Retrofit.Builder().baseUrl("http://10.0.2.2:8000/api/v1/")
    // aiemmin mainittiin, että konfiguroimme retrofitin käyttämään Gsonia
    // se rivi on tässä
    // nyt, kun käytämme myöhemmin retrofitiä, se osaa muuttaa kaiken uloslähtevän datan
    // autom. jsoniksi gsonin avulla 
    // ja vastaavasti osaa muuttaa sisääntulevan jsonista data classeiksi.
        .addConverterFactory(GsonConverterFactory.create()).build()
}


```

### Luodaan AuthApi.kt-tiedosto

Tähän tiedostoon tulee kaikki kommunikaatiokoodi, joka liittyy api/v1/auth-endpointteihin backendissa. Kuten esim. sisäänkirjautuminen (login)


```kt

import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

// ylempnä Clien.kt-tiedostossa olevan createClient-funktion kutsu
private val retrofit = createClient()



// luomme muuttujan ao. AuthApi interfacesta. Tämän auvlla
// voimme kutsua ao. login-funktiota
val authService = retrofit.create(AuthApi::class.java)

// luodaan interface jokaista reajapintakutsua varten
interface AuthApi {

    // @POST tarkoittaa, että retrtofit lähettää requestin POST-metodia käyttäen
    @POST("auth/login")

    // suspend: vertaa javascriptin async
    // fun login: luomme funktion jonka nimi on login, käytämme nimeä myöhemmin, 
        //  kun kutsumme   funktiota viewmodelissa
    // @Body: @Body-annotaatio kertoo retrofitille, että authReq-muuttuja 
        // (joka on tyyppiä AuthReq) pitää lähettää osana POST-requestin bodya

    // request bodyn sisältö on tietotyyppiä AuthReq (eli username ja password)
    // vastauksena saamme LoginRes-tyyppisen muuttujan
        // funktion paluuarvon pitää täsmätä siihen, mitä backend palauttaa
    suspend fun login(@Body authReq: AuthReq): LoginRes

    
}



```

### Luodaan LoginViewModel

```kt

package com.example.edistynytmobiili3004.viewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.edistynytmobiili3004.model.LoginReqModel
import com.example.edistynytmobiili3004.model.LoginResModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {

    private val _loginState = mutableStateOf(LoginReqModel())
    val loginState: State<LoginReqModel> = _loginState

    fun setUsername(newUsername: String) {

        _loginState.value = _loginState.value.copy(username = newUsername)
    }

    fun setPassword(newPassword: String) {
        _loginState.value = _loginState.value.copy(password = newPassword)
    }

    

    fun login() {

        viewModelScope.launch {
            _loginState.value = _loginState.value.copy(loading = true)
            auhtService.login(AuthReq(username=_loginState.value.username, password=_loginState.value.password))
            val user = LoginResModel()
            _loginState.value = _loginState.value.copy(loading = false)
        }



    }
}


```

