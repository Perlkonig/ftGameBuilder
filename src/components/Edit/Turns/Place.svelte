<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import Ship from "./Place/Ship.svelte";

    export let turn: number;

    const objHelp = {
        ship: "Most commonly, this command is only used on the first turn of a new game, but some scenarios may have ships entering the field at a later time. The ship must already be in the fleet list and not already on the board.",
        fighter: "ALMOST NEVER NEEDED! Adding ships already creates entries for equipped fighters. You should only manually add fighters if isolated fighter squadrons are part of the scenario (e.g., a recovery operation).",
        ordnance: "ALMOST NEVER NEEDED! Firing ordnance weapons automatically creates the necessary objects. You would only manually add ordnance for specific scenarios (e.g., a pre-existing mine field).",
        other: "Used for placing miscellaneous objects like asteroids or debris.",
    };

    let objSelect: string;
</script>

<div class="field">
    <label for="objSelect">Select object type</label>
    <div class="control">
        <div class="select">
            <select id="objSelect" name="objSelect" bind:value={objSelect}>
                <option value=""></option>
                <option value="ship">Ship</option>
                <option value="fighter">Fighter squadron</option>
                <option value="ordnance">Ordnance</option>
                <option value="other">Other (e.g., asteroid)</option>
            </select>
        </div>
    </div>
{#if ( (objSelect !== undefined) && (objHelp.hasOwnProperty(objSelect)) )}
    <p class="help">{objHelp[objSelect]}</p>
{/if}
</div> <!-- field -->

{#if objSelect === "ship"}
    <Ship />
{/if}
