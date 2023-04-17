<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { onMount } from "svelte";
    import Place from "./Turns/Place.svelte";
    let cmdSelect: string;
    const cmdHelp = {
        place: "Used for the initial placement of interactive objects like new ships, asteroids, etc."
    };
    let turn: number;
    onMount(() => {
        if ($working.game.turns.length === 0) {
            turn = 0;
        } else {
            turn = $working.game.turns.length - 1;
        }
    });
</script>

<div class="content">
    <p>This is where you actually play the game. Use the left-hand column to craft orders that get added to the turn object visible on the right.</p>

    <p>Each turn has two components: a list of objects and a list of commands that manipulate those objects. In the first turn, you have to create the initial state by placing all the necessary objects. Every turn after that, the initial state is derived from the previous turn's commands. You only have to add the commands. (But you can still place new objects in later turns as the scenario may demand.)</p>

    <p>There are functions to help you quickly plot movement orders and apply damage to systems.</p>
</div>

<hr>

<div class="columns">
    <div class="column is-one-third">
        <div class="field">
            <label for="cmdSelect">Select an action</label>
            <div class="control">
                <div class="select">
                    <select id="cmdSelect" name="cmdSelect" bind:value={cmdSelect}>
                        <option value=""></option>
                        <option value="place">Place object</option>
                    </select>
                </div>
            </div>
        {#if ( (cmdSelect !== undefined) && (cmdHelp.hasOwnProperty(cmdSelect)) )}
            <p class="help">{cmdHelp[cmdSelect]}</p>
        {/if}
        </div> <!-- field -->
    {#if cmdSelect === "place"}
        <Place {turn}/>
    {/if}
    </div> <!-- column-->
    <div class="column">
        Output
    </div> <!-- column -->
</div> <!-- columns -->

<style></style>
