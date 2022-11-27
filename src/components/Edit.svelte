<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { onMount } from "svelte";
    import Header from "./Edit/Header.svelte";
    import Fleets from "./Edit/Fleets.svelte";
    import Map from "./Edit/Map.svelte";

    let activeTab: string;
    onMount(() => {
        if (! $working.game.hasOwnProperty("header")) {
            activeTab = "header";
        } else if (! $working.game.hasOwnProperty("ships")) {
            activeTab = "fleets";
        } else if (! $working.game.hasOwnProperty("map")) {
            activeTab = "map";
        } else {
            activeTab = "turns";
        }
    });
</script>

<div class="tabs is-boxed">
    <ul>
      <li class="{activeTab === "header" ? "is-active" : ""}" title="Game metadata like dates and player names"><a on:click={() => activeTab = "header"}>Header</a></li>
      <li class="{activeTab === "fleets" ? "is-active" : ""}" title="Ship information"><a on:click={() => activeTab = "fleets"}>Fleets</a></li>
      <li class="{activeTab === "map" ? "is-active" : ""}" title="Map dimensions and features"><a on:click={() => activeTab = "map"}>Map</a></li>
      <li class="{activeTab === "turns" ? "is-active" : ""}" title="Turn-by-turn actions of the players"><a on:click={() => activeTab = "turns"}>Turns</a></li>
    </ul>
</div>

{#if activeTab === "header"}
    <Header />
{:else if activeTab === "map"}
    <Map />
{:else if activeTab === "fleets"}
    <Fleets />
{:else if activeTab === "turns"}
    <p>Turns</p>
{/if}

<style></style>
