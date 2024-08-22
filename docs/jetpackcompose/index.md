# JETPACK COMPOSE

Jetpack Compose on uusi tapa tehdä Android-sovellusten käyttöliittymiä. Käyttöliittymät tehdään kokonaan Kotlin-koodilla ilman yhtään XML-käyttöliittymäkomponenttia. Käyttöliittymien rakentaminen on nopeampaa, koska @Composable-komponentit ovat hyvin joustavia ja koska, vaikka kaikki tehdään koodissa, "ylimääräistä liimakoodia" XML-käyttöliittymän ja sen elementtien välille ei tarvitse tehdä ollenkaan. 

## @Composable

Jetpack Composen käyttöliittymäkomponentit ovat koodissa funktioita, joissa on @Composable-annotaatio

```kt


@Composable
fun HelloWorld() {
    Text(text="Hello World")
}

```

Jos laitat yo. funktion MainActivityn setContent-blokiin, näytölle ilmestyy teksti Hello World

Jetpack Compose käyttää Kotlinia muuttamaan @Composable-funktiot käyttöliitymäelementeiksi. Text-composablesta tulee label

### Column

Column-composablen avulla saat laitettua elementtejä käyttöliitymässä allekkain vertikaalisesti eli pystysuunnassa

@Composable
fun HelloWorld() {
    Column {
        Text(text="Hello")
        Text(text="World")
    }
}

### Row

Row-composablella voit järjestää käyttöliittymäelementtejä vaakasuunnassa.

### Box

Box-composablella voit kasata elementtejä päällekkäin (z-akselilla). Box-komponenttia voit käyttää esim. asettamaan kuvatekstin kuvan päälle

### Spacer

Spacer-composablella voit lisätä käyttöliittymään väljyyttä.

### LazyColumn

LazyColumn-komponentilla voit tehdä listoja.

### Surface

Surface on hyvä tyhjä pohja komponentti

### modifier

Jokaisella composablella on modifier-attribuutti, jonka avulla voit muuttaa elementin ulkonäköä ja kokoa.

## MaterialDesign

Jetpack Compose tukee automaattisesti Material Designia. Käytännössä se tarkoittaa, että sovelluksessa on vakiona valmiina Theme-blokki. Kun käytät automaattisesti generoitua Theme-blokia, setContent-blokin sisällä, pääset teeman ominaisuuksiin käsiksi mistä tahansa sovelluksen sisältä.

```kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // tämä rivi mahdollistaa teeman käytön koko sovelluksessa.
            ComposeTutorialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    MessageCard(Message("Android", "Jetpack Compose"))
                }
            }
        }
    }
}


```

Material Design Theme sisältää värin, typografian ja muodon

### Color

```
@Composable
fun MessageCard(msg: Message) {
   Row(modifier = Modifier.padding(all = 8.dp)) {
       Image(
           painter = painterResource(R.drawable.profile_picture),
           contentDescription = null,
           modifier = Modifier
               .size(40.dp)
               .clip(CircleShape)
               // tämä tulee automaattisesti Material Design themesta
               .border(1.5.dp, MaterialTheme.colorScheme.primary, CircleShape)
       )

       Spacer(modifier = Modifier.width(8.dp))

       Column {
           Text(
               text = msg.author,
               // tämä tulee automaattisesti Material Design themesta
               color = MaterialTheme.colorScheme.secondary
           )

           Spacer(modifier = Modifier.height(4.dp))
           Text(text = msg.body)
       }
   }
}



```

Themen värit löytyvät ui.theme-paketin Color.kt-tiedostosta.

### Typografia

Teeman typografialla voit vaikuttaa Text-elementtien ulkoasuun

### Shape

Teeman Shapella voit vaikuttaa elementtien muotoon.

