<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { fleetStats } from "@/stores/derivedFleetStats";
</script>

<table class="table">
    <caption>Fleet Summaries</caption>
    <thead>
        <tr>
            <th></th>
            <th colspan="4" class="lineLeft">Total</th>
            <th colspan="3" class="lineLeft">Median</th>
            <th colspan="3" class="lineLeft">Average</th>
        </tr>
        <tr>
            <th></th>
            <th class="lineLeft">Ships</th>
            <th>Mass</th>
            <th>NPV</th>
            <th>CPV</th>
            <th class="lineLeft">Mass</th>
            <th>NPV</th>
            <th>CPV</th>
            <th class="lineLeft">Mass</th>
            <th>NPV</th>
            <th>CPV</th>
        </tr>
    </thead>
    <tbody>
    {#each $fleetStats as fleet, idx}
        <tr>
            <th>Player {idx + 1}: {$working.game.header.players[idx]}</th>
        {#if ( (fleet !== undefined) && (fleet.num !== undefined) && (fleet.num > 0) )}
            <td class="lineLeft">{fleet.num}</td>
            <td>{fleet.mass}</td>
            <td>{fleet.npv}</td>
            <td>{fleet.cpv}</td>
            <td class="lineLeft">{fleet.median.mass}</td>
            <td>{fleet.median.npv}</td>
            <td>{fleet.median.cpv}</td>
            <td class="lineLeft">{fleet.avg.mass}</td>
            <td>{fleet.avg.npv}</td>
            <td>{fleet.avg.cpv}</td>
        {/if}
        </tr>
    {/each}
    </tbody>
</table>

<style>
    .lineLeft {
        border-left: 1px solid black;
    }
    caption {
        font-weight: bolder;
        font-size: larger;
    }
</style>
