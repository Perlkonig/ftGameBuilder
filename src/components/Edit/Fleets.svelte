<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { beforeUpdate } from "svelte";
    import Add from "./Fleets/Add.svelte";
    import List from "./Fleets/List.svelte";

    beforeUpdate(() => {
        if (! $working.game.hasOwnProperty("ships")) {
            console.log("init ships");
            $working.game.ships = [];
            for (let i = 0; i < $working.game.header.players.length; i++) {
                console.log("adding player");
                $working.game.ships.push([]);
            }
        }
    });

    let activeTab = "list";

    let locked: boolean = false;
    // TODO: Add initial locking criteria
    // TODO: Probably only need to lock the player names?
</script>

<div class="content">
    <p>Player fleet information</p>
</div>

<div class="tabs is-boxed">
    <ul>
      <li class="{activeTab === "list" ? "is-active" : ""}" title="Tabular list of fleets"><a on:click={() => activeTab = "list"}>List</a></li>
      <li class="{activeTab === "addShip" ? "is-active" : ""}" title="Add a ship to a fleet"><a on:click={() => activeTab = "addShip"}>Add</a></li>
    </ul>
</div>

{#if activeTab === "list"}
    <List />
{:else if activeTab === "addShip"}
    <Add />
{/if}