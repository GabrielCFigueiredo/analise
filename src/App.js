
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [sport, setSport] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.sportsanalytics.com.br/api/v1/fixtures-svc/fixtures/livescores?include=weatherReport,additionalInfo,league,stats,pressureStats,probabilities"
      )
      .then((res) => {
        setSport(res.data.data);
      })
      .catch(() => {
        console.log("errou");
      });
  }, [sport]);
  console.log(sport);

  return (
    <div>
      {sport?.map((sports) => {
        if (
          sports?.pressureStats?.appm1?.home >= 0.7 ||
          sports?.pressureStats?.appm1?.away >= 0.7
        ) {
          if (
            (sports?.currentTime?.minute > 29 &&
              sports?.currentTime?.minute < 38 &&
              (sports?.stats?.dangerousAttacks?.home > 30 ||
                sports?.stats?.dangerousAttacks?.away > 30)) ||
            (sports?.currentTime?.minute > 70 &&
              sports?.currentTime?.minute < 88 &&
              (sports?.stats?.dangerousAttacks?.home > 55 ||
                sports?.stats?.dangerousAttacks?.away > 75))
          ) {
            return (
              <div key={sports.id}>
                <h2>
                  Jogo: {sports.homeTeam.name} - {sports.awayTeam.name}
                </h2>
                <p> LEAGUE: {sports?.league?.name}</p>
                <p>
                  {" "}
                  PLACAR: {sports?.stats?.goals?.home} -{" "}
                  {sports?.stats?.goals?.away}
                </p>
                <p>
                  {" "}
                  ATAQUE: {sports?.stats?.attacks?.home} -{" "}
                  {sports?.stats?.attacks?.away}{" "}
                </p>
                <p>
                  {" "}
                  Chance de gol: {sports?.pressureStats?.mh1?.home} -{" "}
                  {sports?.pressureStats?.mh1?.away}{" "}
                </p>
                <p>
                  {" "}
                  Ofensividade: {sports?.pressureStats?.mh2?.home} -{" "}
                  {sports?.pressureStats?.mh2?.away}{" "}
                </p>
                <p>
                  {" "}
                  Dominancia: {sports?.pressureStats?.mh3?.home} -{" "}
                  {sports?.pressureStats?.mh3?.away}{" "}
                </p>
                <p>
                  {" "}
                  ATAQUE PERIGOSO: {
                    sports?.stats?.dangerousAttacks?.home
                  } - {sports?.stats?.dangerousAttacks?.away}{" "}
                </p>
                <p>
                  {" "}
                  APPM: {sports?.pressureStats?.appm1?.home} -{" "}
                  {sports?.pressureStats?.appm1?.away}{" "}
                </p>
                <p>
                  {" "}
                  EXG: {sports?.pressureStats?.exg.home} -{" "}
                  {sports?.pressureStats?.exg.away}{" "}
                </p>
                <p>
                  {" "}
                  ESCANTEIOS: {sports?.stats?.corners?.home} -{" "}
                  {sports?.stats?.corners?.away}
                </p>
                <p> MINUTOS: {sports?.currentTime?.minute}</p>
                <p>
                  {" "}
                  POSSE DE BOLA: {sports?.stats?.possessiontime?.home} -{" "}
                  {sports?.stats?.possessiontime?.away}{" "}
                </p>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default App;
