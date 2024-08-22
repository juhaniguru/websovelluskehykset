# MUUTA HUOMIOITAVAA

## Skaalautuminen eri kokoisille näytöille

Tämä koodi auttaa määrittämään erilaisia käyttöliittymiä eri kokoisille näytöille WindowTypen avulla

```kt

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun rememberWindowSize(): WindowSizeInfo {
    val configuration = LocalConfiguration.current
    return WindowSizeInfo(
        widthSize = configuration.screenWidthDp.dp,
        heightSize = configuration.screenHeightDp.dp,
        widthInfo = when {
            configuration.screenWidthDp < 600 -> WindowType.Compact
            configuration.screenWidthDp < 840 -> WindowType.Medium
            else -> WindowType.Expanded
        },
        heightInfo = when {
            configuration.screenHeightDp < 480 -> WindowType.Compact
            configuration.screenHeightDp < 900 -> WindowType.Medium
            else -> WindowType.Expanded
        }
    )
}
data class WindowSizeInfo(
    val widthSize: Dp,
    val heightSize: Dp,
    val widthInfo: WindowType,
    val heightInfo: WindowType
)
sealed class WindowType {
    object Compact : WindowType()
    object Medium : WindowType()
    object Expanded : WindowType()
}


```

Voit käyttää sitä näin

```kt

// MainActivityssa

val windowSizeInfo = rememberWindowSize()
// pienille näytöille lazycolumn()
if (
                        size.widthInfo is WindowType.Compact
                        || size.widthInfo is WindowType.Medium
                    ) {
                        LazyColumnCategories()
                    } else {

                        // isommille näytöille gridview, jossa 2 itemiä samalla rivillä

                        
                        LazyVerticalGridCategories()
                    }

```

## Screen object navigoinnin keskittämiseksi

```kt

sealed  class Screen(val route: String) {
    object Login: Screen("loginScreen")
    object Categories: Screen("categoriesScreen")
    // tähän kaikki loputkin screenit ja niiden routet
}

```

Käytä sitä näin

```kt

// MainActivityssa navHost

NavHost(
                            navController = navController,
                            startDestination = Screen.Categories.route
                        ) {
                            // ... composablet tähän

```

## Lokalisointi

1) Lisää res-kansioon uusi values-resurssikansio nimeltä values-b+fi
2) Jos uusi kansio ei ilmesty, vaihda ylhäältä vasemmalta Android Studiosta Project-näkymä päälle Androidin sijaan
3) Uusi kansio pitäisi näkyä tiedostopuussa
4) Lisää uuteen kansioon uusi resurssitiedosto nimeltä strings
5) Lisää kaikki käännökset default localen mallin mukaan tähän tiedostoon suomeksi
6) Kun vaihdat puhelimen kielen suomeksi asetuksista, näkyvät käännökset suomeksi