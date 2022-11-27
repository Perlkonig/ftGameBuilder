<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { beforeUpdate, onMount } from "svelte";

    let playerStr: string | undefined;
    onMount(() => {
        if ( ($working.game.header.hasOwnProperty("players")) && ($working.game.header.players !== undefined) && ($working.game.header.players.length > 0) ) {
            playerStr = $working.game.header.players.join("\n");
        }
    });

    beforeUpdate(() => {
        if (! $working.game.hasOwnProperty("header")) {
            $working.game.header = {};
        }
    });

    const updatePlayers = () => {
        const playerNames: string[] = [];
        if (playerStr !== undefined) {
            const playerLst = playerStr.split("\n");
            const reBlank = /^\s*$/;
            for (const p of playerLst) {
                if ( (p.length > 0) && (! reBlank.test(p)) ) {
                    playerNames.push(p);
                }
            }
        }
        if (playerNames.length > 0) {
            $working.game.header.players = [playerNames[0], ...playerNames.slice(1)];
            playerStr = $working.game.header.players.join("\n");
        } else {
            $working.game.header.players = undefined;
            playerStr = undefined;
        }
        $working = $working;
    };

    let locked: boolean = false;
    // TODO: Add initial locking criteria
    // TODO: Probably only need to lock the player names?
</script>

<div class="content">
    <p>Basic game metadata, like dates and player names</p>
</div>

<div class="level">
    <div class="level-left"></div>
    <div class="level-right">
        <div class="level-item">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked={locked}>
                    Locked
                </label>
                <p class="help">The game is underway. Changing these values in the middle of a game can render the game state invalid.</p>
            </div>
        </div>
    </div>
</div>

<div class="field">
    <label for="gameName" class="label">Game name</label>
    <div class="control">
        <input class="input" id="gameName" type="text" placeholder="Game name" bind:value={$working.game.header.name} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">A unique name for this game or scenario</p>
</div>

<div class="field">
    <label for="campaign" class="label">Campaign</label>
    <div class="control">
        <input class="input" id="campaign" type="text" placeholder="Campaign name" bind:value={$working.game.header.campaign} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">If this game is part of a campaign, put the name here. It's good practice to keep the campaign name the same across all scenarios.</p>
</div>

<div class="field">
    <label for="universe" class="label">Universe</label>
    <div class="control">
        <input class="input" id="universe" type="text" placeholder="Universe name" bind:value={$working.game.header.universe} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">Game universe (e.g., Star Wars, Babylon 5, Star Trek, etc.)</p>
</div>

<div class="field">
    <label for="moderator" class="label">Moderator</label>
    <div class="control">
        <input class="input" id="moderator" type="text" placeholder="Moderator name" bind:value={$working.game.header.moderator} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">If this game is being moderated (e.g., for a remote-play closed-book game), put the person's name here.</p>
</div>

<div class="field">
    <label for="players" class="label">Players</label>
    <div class="control">
        <textarea class="textarea" id="players" placeholder="Player names, one per line" bind:value={playerStr} on:change={updatePlayers} disabled={locked}></textarea>
    </div>
    <p class="help">Put each player's name on a new line. </p>
</div>

<div class="field">
    <label for="dateStart" class="label">Start Date</label>
    <div class="control">
        <input class="input" id="dateStart" type="date" bind:value={$working.game.header.dateStart} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">Date the game started</p>
</div>

<div class="field">
    <label for="dateEnd" class="label">End Date</label>
    <div class="control">
        <input class="input" id="dateEnd" type="date" bind:value={$working.game.header.dateEnd} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">When the game finally ends, put the date here.</p>
</div>

<div class="field">
    <label for="winner" class="label">Winner</label>
    <div class="control">
        <input class="input" id="winner" type="text" placeholder="Winner" bind:value={$working.game.header.winner} on:change={() => $working = $working} disabled={locked}>
    </div>
    <p class="help">When the game ends, put the winner's name here.</p>
</div>


