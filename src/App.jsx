import React, { useEffect, useState } from "react";
import DeckGL, { OrbitView } from "deck.gl";

import { renderLayers } from "./RenderLayers";

//PLYローダーを読み込む
import { PLYLoader } from "@loaders.gl/ply";
import { load } from "@loaders.gl/core";

import "./styles.css";

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 0,
  rotationOrbit: 0,
  minZoom: 0,
  maxZoom: 10,
  zoom: 1,
};

const App = () => {
  const [data, setData] = useState();

  //カメラの初期設定を行う
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  //plyデータを読み込む
  useEffect(() => {
    const dataload = async () => {
      const res = await load(
        "./data/Scaniverse_2024-07-26_095032.ply",
        PLYLoader
      );
      console.log(res);

      //読み込んだPLYデータのBounding boxデータを取得する
      const [mins, maxs] = res.header.boundingBox;

      //Bounding boxを元にポイントクラウドが画面に収まる位置へカメラを移動する
      setViewState({
        ...INITIAL_VIEW_STATE,
        target: [
          (mins[0] + maxs[0]) / 2,
          (mins[1] + maxs[1]) / 2,
          (mins[2] + maxs[2]) / 2,
        ],
        zoom: Math.log2(window.innerWidth / (maxs[0] - mins[0])),
      });

      //data変数をupdate
      setData(res);
    };
    dataload();
  }, []);

  //レンダリング
  return (
    <div className="App">
      <DeckGL
        views={new OrbitView({ fov: 50 })}
        initialViewState={viewState}
        controller={true}
        layers={renderLayers({
          data: data,
        })}
        parameters={{
          clearColor: [0.93, 0.86, 0.81, 1], //ポイントのカラー調整
        }}
      />
    </div>
  );
};

export default App;
