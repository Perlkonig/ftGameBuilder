<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { onMount } from "svelte";
    import Dimensions from "./Map/Dimensions.svelte";
    import FeatureList from "./Map/FeatureList.svelte";
    import NewFeature from "./Map/NewFeature.svelte";

    let isFixed: boolean = false;
    onMount(() => {
        if ( ($working.game.hasOwnProperty("map")) && ($working.game.map !== undefined) && ($working.game.map.hasOwnProperty("dimensions")) && ($working.game.map.dimensions !== undefined) ) {
            isFixed = true;
        }
        if ( (! $working.game.hasOwnProperty("map")) || ($working.game.map === undefined) ) {
            $working.game.map = {};
        }
        if ( (! $working.game.map.hasOwnProperty("features")) || ($working.game.map.features === undefined) ) {
            $working.game.map.features = [];
        }
    });

    const changeFixed = () => {
        if (!isFixed) {
            if ($working.game.hasOwnProperty("map")) {
                if ($working.game.map.hasOwnProperty("features")) {
                    delete $working.game.map.dimensions;
                } else {
                    delete $working.game.map;
                }
            }
        }
        $working = $working;
    };

    const deleteFeature = (e: CustomEvent) => {
        if (e.detail.idx !== undefined) {
            $working.game.map.features.splice(e.detail.idx, 1);
            $working = $working;
        }
    };

    let locked: boolean = false;
    // TODO: Add initial locking criteria
    // TODO: Probably only need to lock the player names?
</script>

<div class="content">
    <h2 class="subtitle">Dimensions</h2>
    <p>By default, the map is an infinite field that will resize to accommodate all visible objects. If you wish to play with a fixed field (like playing on a kitchen table), then check the box and set the height and width in movement units.</p>
</div>

<div class="field">
    <label class="checkbox">
        <input type="checkbox" bind:checked={isFixed} on:change={changeFixed}>
        Fixed field
    </label>
</div>

{#key isFixed}
{#if isFixed}
    <Dimensions />
{/if}
{/key}

<hr>

<div class="content">
    <h2 class="subtitle">Features</h2>
    <p>Map features are optional, <em>fixed</em> background features like planets and nebulae.</p>
</div>

<NewFeature />

<hr>

<div class="content">
    <h2 class="subtitle">List of Features</h2>
</div>

<FeatureList
    features={$working.game.map.features}
    on:delete={deleteFeature}
/>

<style></style>
