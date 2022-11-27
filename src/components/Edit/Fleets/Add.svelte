<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { nanoid } from "nanoid";
    import { validate, renderUri } from "ftlibship";
    import type { IValidation } from "ftlibship";
    import { onMount } from "svelte";

    let player: string;
    let count: number = 1;
    let json: string;
    let validation: IValidation | undefined;
    let renderedUri: string | undefined;

    const checkJson = () => {
        try {
            validation = validate(json);
            if (validation.valid) {
                renderedUri = renderUri(JSON.parse(json));
            } else {
                renderedUri = undefined;
            }
        } catch (error) {
            validation = undefined;
            renderedUri = undefined;
        }
    };

    const addShip = () => {
        if ( (validation !== undefined) && (validation.valid) ) {
            const idx = parseInt(player, 10);
            for (let i = 0; i < count; i++) {
                const ship = JSON.parse(json);
                if (! ship.hasOwnProperty("uuid")) {
                    ship.uuid = nanoid(7);
                }
                $working.game.ships[idx].push(ship);
            }
            $working = $working;
        }
    };

    const reset = () => {
        count = 1;
        json = undefined;
        player = undefined;
    };
</script>

<div class="columns">
    <div class="column">
        <div class="field">
            <label for="selectPlayer" class="label">Select a player</label>
            <div class="control">
                <div class="select">
                    <select bind:value={player} id="selectPlayer">
                    {#each $working.game.header.players as p, idx}
                        <option value="{idx}">Player {idx + 1}: {p}</option>
                    {/each}
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="addCount" class="label">Add how many of these ships?</label>
            <div class="control">
                <input id="addCount" type="number" bind:value={count} min="1" step="1">
            </div>
        </div>
        <div class="field">
            <label for="shipJson" class="label">Paste JSON here</label>
            <div class="control">
                <textarea class="textarea" id="shipJson" bind:value={json} on:input={checkJson} placeholder="Paste JSON here" rows="5"></textarea>
            </div>
        {#if (validation === undefined)}
            <p class="help is-danger">The given JSON is not valid. Please check the source and try again.</p>
        {:else if (! validation.valid)}
            <p class="help is-danger">The given ship is not valid.</p>
            {#if validation.hasOwnProperty("code")}
                <p class="help is-danger">Validation error code: {validation.code}</p>
            {:else if validation.hasOwnProperty("evalErrors")}
                <p class="help is-danger">Evaluation error codes: {validation.evalErrors.join(", ")}</p>
            {/if}
        {/if}
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-primary" disabled="{(validation === undefined) || (! validation.valid)}" on:click={addShip}>Add to fleet</button>
            </div>
            <div class="control">
                <button class="button" on:click={reset}>Reset</button>
            </div>
        </div>
    </div>
    <div class="column">
    {#if renderedUri !== undefined}
        <object id="svg-object" data="{renderedUri}" type="image/svg+xml"></object>
    {/if}
    </div>
</div>

<style></style>
