import { mediaAsset } from './mediaAsset'
import { asiHablamosPage } from './pages/asi-hablamos-page'
import { asiNosVemosPage } from './pages/asi-nos-vemos-page'
import { brandColorsPage } from './pages/brand-colors-page'
import { fotografiaPage } from './pages/fotografia-page'
import { homePage } from './pages/home-page'
import { iconografiaPage } from './pages/iconografia-page'
import { ilustracionPage } from './pages/ilustracion-page'
import { layoutPage } from './pages/layout-page'
import { motionPage } from './pages/motion-page'
import { nuestraMarcaPage } from './pages/nuestra-marca-page'
import { patronesPage } from './pages/patrones-page'
import { recursosPage } from './pages/recursos-page'
import { tipografiaPage } from './pages/tipografia-page'
import { trademarksPage } from './pages/trademarks-page'
import { test1 } from './test-1'

export const schema = {
  types: [
    mediaAsset,
    homePage,
    nuestraMarcaPage,
    asiHablamosPage,
    asiNosVemosPage,
    recursosPage,
    trademarksPage,
    brandColorsPage,
    patronesPage,
    iconografiaPage,
    ilustracionPage,
    tipografiaPage,
    layoutPage,
    fotografiaPage,
    motionPage,
    test1
  ]
}
