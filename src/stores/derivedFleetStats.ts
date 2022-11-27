import { derived } from "svelte/store";
import { working } from "./writeWorkingLocal";

export interface ShipStats {
    mass: number;
    npv: number;
    cpv: number;
}

export interface FleetStats extends ShipStats {
    num: number;
    avg: ShipStats;
    median: ShipStats;
}

export const fleetStats = derived(working, ($working) => {
    const all: (FleetStats | undefined)[] = [];
    for (let i = 0; i < $working.game.ships.length; i++) {
        const fleet = [...$working.game.ships[i]];
        if (fleet.length > 0) {
            const num = fleet.length;
            const massTotal = fleet.reduce((prev, curr) => {return prev + curr.mass}, 0);
            const massAvg = Math.round(massTotal / num);
            const npvTotal = fleet.reduce((prev, curr) => {return prev + curr.points}, 0);
            const npvAvg = Math.round(npvTotal / num);
            const cpvTotal = fleet.reduce((prev, curr) => {return prev + curr.cpv}, 0);
            const cpvAvg = Math.round(cpvTotal / num);
            const mid = Math.floor(num / 2);
            let massMedian: number;
            const byMass = [...fleet.sort((a, b) => {return a.mass - b.mass})];
            let npvMedian: number;
            const byNpv = [...fleet.sort((a, b) => {return a.points - b.points})];
            let cpvMedian: number;
            const byCpv = [...fleet.sort((a, b) => {return a.cpv - b.cpv})];
            if (num % 2 === 0) {
                const idx1 = mid;
                const idx2 = mid - 1;
                massMedian = Math.round((byMass[idx1].mass + byMass[idx2].mass) / 2);
                npvMedian = Math.round((byNpv[idx1].points + byNpv[idx2].points) / 2);
                cpvMedian = Math.round((byCpv[idx1].cpv + byMass[idx2].cpv) / 2);
            } else {
                massMedian = byMass[mid].mass;
                npvMedian = byNpv[mid].points;
                cpvMedian = byCpv[mid].cpv;
            }
            const node: FleetStats = {
                num,
                mass: massTotal,
                npv: npvTotal,
                cpv: cpvTotal,
                avg: {
                    mass: massAvg,
                    npv: npvAvg,
                    cpv: cpvAvg
                },
                median: {
                    mass: massMedian,
                    npv: npvMedian,
                    cpv: cpvMedian
                }
            };
            all.push(node);
        } else {
            all.push(undefined);
        }
    }
    return all;
});
