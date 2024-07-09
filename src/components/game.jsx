import { useState } from "react";
import Board from "./board";

export default function Game() {

  return (
    <>
        <div>
            <h1>Reversi</h1>
        </div>
        <div>
            <Board />
        </div>
    </>
  );
}