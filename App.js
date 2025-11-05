import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { TelefonoDescompuestoVisualNavigator } from './games/telefono-descompuesto-visual/TelefonoDescompuestoVisualNavigator';
import { QuePrefieresExtremoNavigator } from './games/que-prefieres-extremo/QuePrefieresExtremoNavigator';
import { QuienSoyPreguntasNavigator } from './games/quien-soy-preguntas/QuienSoyPreguntasNavigator';
import { QuienSoyDigitalNavigator } from './games/quien-soy-digital/QuienSoyDigitalNavigator';
import { AFakeArtistGoesToNewYorkNavigator } from './games/AFakeArtistGoesToNewYork/AFakeArtistGoesToNewYorkNavigator';
import { AmongUsVersionDeMesaNavigator } from './games/AmongUsVersionDeMesa/AmongUsVersionDeMesaNavigator';
import { BloodOnTheClocktowerNavigator } from './games/BloodOnTheClocktower/BloodOnTheClocktowerNavigator';
import { CadaverExquisito2Navigator } from './games/CadaverExquisito2/CadaverExquisito2Navigator';
import { CadenaDeEmojisNarrativaNavigator } from './games/CadenaDeEmojisNarrativa/CadenaDeEmojisNarrativaNavigator';
import { ConexionInesperadaNavigator } from './games/ConexionInesperada/ConexionInesperadaNavigator';
import { ContinuaLaFraseNavigator } from './games/ContinuaLaFrase/ContinuaLaFraseNavigator';
import { CoupNavigator } from './games/Coup/CoupNavigator';
import { CriticoDeCineAbsurdoNavigator } from './games/CriticoDeCineAbsurdo/CriticoDeCineAbsurdoNavigator';
import { DeceptionMurderInHongKongNavigator } from './games/DeceptionMurderInHongKong/DeceptionMurderInHongKongNavigator';
import { DosVerdadesUnaMentiraNavigator } from './games/DosVerdadesUnaMentira/DosVerdadesUnaMentiraNavigator';
import { DosVerdadesYUnaMentiraNavigator } from './games/DosVerdadesYUnaMentira/DosVerdadesYUnaMentiraNavigator';
import { ElDetectiveDeObjetosNavigator } from './games/ElDetectiveDeObjetos/ElDetectiveDeObjetosNavigator';
import { ElDiccionarioDiabolicoNavigator } from './games/ElDiccionarioDiabolico/ElDiccionarioDiabolicoNavigator';
import { ElDiccionarioFalsoNavigator } from './games/ElDiccionarioFalso/ElDiccionarioFalsoNavigator';
import { ElEntrevistadorInesperadoNavigator } from './games/ElEntrevistadorInesperado/ElEntrevistadorInesperadoNavigator';
import { ElHombreLoboDeCastronegroNavigator } from './games/ElHombreLoboDeCastronegro/ElHombreLoboDeCastronegroNavigator';
import { ElInterrogatorioNavigator } from './games/ElInterrogatorio/ElInterrogatorioNavigator';
import { ElSonidistaCiegoNavigator } from './games/ElSonidistaCiego/ElSonidistaCiegoNavigator';
import { ElSuperlativoNavigator } from './games/ElSuperlativo/ElSuperlativoNavigator';
import { FeedTheKrakenNavigator } from './games/FeedTheKraken/FeedTheKrakenNavigator';
import { GeoguessrDeSalonNavigator } from './games/GeoguessrDeSalon/GeoguessrDeSalonNavigator';
import { InsiderNavigator } from './games/Insider/InsiderNavigator';
import { LaVozMisteriosaAudioQuizNavigator } from './games/LaVozMisteriosaAudioQuiz/LaVozMisteriosaAudioQuizNavigator';
import { MaestroDelAcronimoNavigator } from './games/MaestroDelAcronimo/MaestroDelAcronimoNavigator';
import { MaestroDeLasCitasNavigator } from './games/MaestroDeLasCitas/MaestroDeLasCitasNavigator';
import { MascaradeNavigator } from './games/Mascarade/MascaradeNavigator';
import { OneNightUltimateWerewolfNavigator } from './games/OneNightUltimateWerewolf/OneNightUltimateWerewolfNavigator';
import { OrdenaLaHistoriaNavigator } from './games/OrdenaLaHistoria/OrdenaLaHistoriaNavigator';
import { Salem1692Navigator } from './games/Salem1692/Salem1692Navigator';
import { SecretHitlerNavigator } from './games/SecretHitler/SecretHitlerNavigator';

export default function App() {
  return (
    <>
      {Platform.OS !== 'web' && <StatusBar style="auto" />}
      <OrdenaLaHistoriaNavigator />
    </>
  );
}

