<script lang="ts">
    import { savedGames } from "@/stores/writeSavedGamesLocal";
    import { working } from "@/stores/writeWorkingLocal";
    import type { FullThrustGame } from "ftlibgame";

    let loadJson: string;
    const loadGameJSON = () => {
        if ( (loadJson !== undefined) && (loadJson.length > 0) ) {
            $working = {game: JSON.parse(loadJson) as FullThrustGame};
        }
    }
</script>

<section class="section">
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <button class="button" id="createGame" on:click={() => $working = {game: {}}}>Create Game</button>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <h2 class="subtitle">Saved Games</h2>
    <div class="content">
        <p>Click on a row to see all the game details and potentially load the game into the editor.</p>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Turns</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
        {#each Object.values($savedGames) as saved}
            <tr>
                <td>{saved.saveid}</td>
                <td>{saved.game.name}</td>
                <td>{saved.game.turns.length}</td>
                <td>{saved.dateLast}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>

<section class="section">
    <div class="field">
        <label class="label" for="loadJson">Load game from JSON</label>
        <div class="control">
            <input class="input" id="loadJson" type="text" placeholder="Paste JSON here" bind:value={loadJson}>
        </div>
        <div class="control">
            <button class="button" on:click={loadGameJSON}>Load JSON</button>
        </div>
    </div>
</section>

<style>
</style>
