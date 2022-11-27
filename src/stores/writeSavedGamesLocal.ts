import type { FullThrustGame } from "ftlibgame";
import { writable } from "svelte/store";

export type SavedGame = {
    saveid?: string;
    dateLast?: string;
    game: FullThrustGame;
    hash?: string;
};

export type SavedGames = {
    [k: string]: SavedGame;
};

let start: SavedGames = {};
if (localStorage.getItem("saved") !== null) {
    start = JSON.parse(localStorage.getItem("saved"));
}

export const savedGames = writable(start);

savedGames.subscribe((val) => localStorage.setItem("saved", JSON.stringify(val)));
