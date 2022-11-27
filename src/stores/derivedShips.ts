import { derived } from "svelte/store";
import type { FullThrustShip } from "ftlibship";
import { working } from "./writeWorkingLocal";

export interface TableShip extends FullThrustShip {
    owner: number;
    idxs: [number, number];
}

export const allShips = derived(working, ($working) => {
    const all: TableShip[] = [];
    for (let i = 0; i < $working.game.ships.length; i++) {
        const fleet = [...$working.game.ships[i]];
        for (let j = 0; j < fleet.length; j++) {
            const ship = fleet[j] as TableShip;
            ship.owner = i + 1;
            ship.idxs = [i, j];
            all.push(ship);
        }
    }
    return all;
});
