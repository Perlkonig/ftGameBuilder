import { writable } from "svelte/store";
import { hashFull } from "ftlibgame";
import type { SavedGame } from "./writeSavedGamesLocal";
import dayjs from "dayjs";

let start: SavedGame | undefined;
if (localStorage.getItem("working") !== null) {
    start = JSON.parse(localStorage.getItem("working"));
}

export const working = writable(start);

working.subscribe((val) => {
    if (val !== undefined) {
        val.dateLast = dayjs().format();
        val.hash = hashFull(val.game);
        localStorage.setItem("working", JSON.stringify(val))
    } else {
        localStorage.removeItem("working");
    }
});
