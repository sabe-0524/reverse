import Block from "./block";
import { useState, useEffect } from "react";

export default function Board() {

    const [value, setValue] = useState(Array(8).fill(Array(8).fill(null)));
    const [player, setPlayer] = useState(true);
    const [countO, setCountO] = useState(2);
    const [countX, setCountX] = useState(2);

    useEffect(() => {
        const newValue = value.map((row) => row.slice());
        newValue[3][3] = true;
        newValue[3][4] = false;
        newValue[4][3] = false;
        newValue[4][4] = true;
        setValue(newValue);
    }, []);

    useEffect(() => {
        handleCount();
    }, [value]);

    function handlePlayer() {
        setPlayer(!player);
    }

    function handleReverse(n, m) {
        const newValue = value.map((row) => row.slice());
        let i = m + 1;
        while (i < 8) {
            if (value[n][i] === player || value[n][i] === null) {
                break;
            }
            i++;
        }
        if (i < 8 && value[n][i] === player) {
            for (let j = m; j < i; j++) {
                newValue[n][j] = player;
            }
        }
        i = m - 1;
        while (i >= 0) {
            if (value[n][i] === player || value[n][i] === null) {
                break;
            }
            i--;
        }
        if (i >= 0 && value[n][i] === player) {
            for (let j = m; j > i; j--) {
                newValue[n][j] = player;
            }
        }
        i = n + 1;
        while (i < 8) {
            if (value[i][m] === player || value[i][m] === null) {
                break;
            }
            i++;
        }
        if (i < 8 && value[i][m] === player) {
            for (let j = n; j < i; j++) {
                newValue[j][m] = player;
            }
        }
        i = n - 1;
        while (i >= 0) {
            if (value[i][m] === player || value[i][m] === null) {
                break;
            }
            i--;
        }
        if (i >= 0 && value[i][m] === player) {
            for (let j = n; j > i; j--) {
                newValue[j][m] = player;
            }
        }
        let s = n + 1;
        let t = m + 1;
        while (s < 8 && t < 8) {
            if (value[s][t] === player || value[s][t] === null) {
                break;
            }
            s++;
            t++;
        }
        if (s < 8 && t < 8 && value[s][t] === player) {
            while (s >= n && t >= m) {
                newValue[s][t] = player;
                s--;
                t--;
            }
        }
        s = n + 1;
        t = m - 1;
        while (s < 8 && t >= 0) {
            if (value[s][t] === player || value[s][t] === null) {
                break;
            }
            s++;
            t--;
        }
        if (s < 8 && t >= 0 && value[s][t] === player) {
            while (s >= n && t <= m) {
                newValue[s][t] = player;
                s--;
                t++;
            }
        }
        s = n - 1;
        t = m + 1;
        while (s >= 0 && t < 8) {
            if (value[s][t] === player || value[s][t] === null) {
                break;
            }
            s--;
            t++;
        }
        if (s >= 0 && t < 8 && value[s][t] === player) {
            while (s <= n && t >= m) {
                newValue[s][t] = player;
                s++;
                t--;
            }
        }
        s = n - 1;
        t = m - 1;
        while (s >= 0 && t >= 0) {
            if (value[s][t] === player || value[s][t] === null) {
                break;
            }
            s--;
            t--;
        }
        if (s >= 0 && t >= 0 && value[s][t] === player) {
            while (s <= n && t <= m) {
                newValue[s][t] = player;
                s++;
                t++;
            }
        }
        setValue(newValue);
    }

    function handleValue(n, m) {
        if (value[n][m] !== null) {
            return;
        }
        const newValue = value.map((row) => row.slice());
        newValue[n][m] = player;
        setValue(newValue);
        handleReverse(n, m);
        handlePlayer();
    }


    function handleCount() {
        let countO = 0;
        let countX = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (value[i][j] === true) {
                    countO++;
                } else if (value[i][j] === false) {
                    countX++;
                }
            }
        }
        setCountO(countO);
        setCountX(countX);
    }

    function handleReset() {
        const initialValue = Array(8).fill().map(() => Array(8).fill(null));
        initialValue[3][3] = true;
        initialValue[3][4] = false;
        initialValue[4][3] = false;
        initialValue[4][4] = true;
        setValue(initialValue);
        setPlayer(true);
        setCountO(2);
        setCountX(2);
    }

    return (
        <>
            {value.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Block key={cellIndex} value={cell} handleValue={() => handleValue(rowIndex, cellIndex)} />
                    ))}
                </div>
            ))}
            <div>
                <p>O: {countO}</p>
                <p>X: {countX}</p>
            </div>
            <div>
                <p>{player ? "O" : "X"}のターン</p>
            </div>
            <button onClick={handleReset}>リセット</button>
        </>
    );
    }