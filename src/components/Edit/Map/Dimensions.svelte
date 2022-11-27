<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import { beforeUpdate, onMount } from "svelte";

    beforeUpdate(() => {
        if (! $working.game.hasOwnProperty("map")) {
                $working.game.map = {};
        }
        if (! $working.game.map.hasOwnProperty("dimensions")) {
            $working.game.map.dimensions = {topLeftCorner: {x: 0, y: 0}, width: 72, height: 48};
        }
    });
</script>

<div class="content">
    <p>Specify the top-left corner of the field (almost always 0,0).</p>
</div>
<div class="field is-grouped">
    <label class="label" for="tlx">x:</label>
    <div class="control">
        <input class="input" id="tlx" type="number" step="1" bind:value={$working.game.map.dimensions.topLeftCorner.x}>
    </div>
    <label class="label" for="tly">y:</label>
    <div class="control">
        <input class="input" id="tly" type="number" step="1" bind:value={$working.game.map.dimensions.topLeftCorner.y}>
    </div>
</div>

<div class="content">
    <p>Specify the width and height of the field in movement units (the default is equivalent to a 6&prime; &times; 4&prime; table).</p>
</div>
<div class="field is-grouped">
    <label class="label" for="width">Width:</label>
    <div class="control">
        <input class="input" id="width" type="number" step="1" bind:value={$working.game.map.dimensions.width}>
    </div>
    <label class="label" for="height">Height:</label>
    <div class="control">
        <input class="input" id="height" type="number" step="1" bind:value={$working.game.map.dimensions.height}>
    </div>
</div>
