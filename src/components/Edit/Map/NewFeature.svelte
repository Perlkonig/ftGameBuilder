<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import type { FullThrustGame } from "ftlibgame";
    import { beforeUpdate } from "svelte";

    let validFeature = false;
    let rendered: string;
    beforeUpdate(() => {
        if (
            (isSymbol) &&
            (hasId) &&
            (idIsUnique) &&
            (hasViewbox) &&
            ( (feature.hasOwnProperty("id")) && (feature.id !== undefined) && (feature.id.length > 0) ) &&
            ( (feature.hasOwnProperty("x")) && (feature.x !== undefined) && (feature.x !== null) && (feature.x.toString().length > 0) ) &&
            ( (feature.hasOwnProperty("y")) && (feature.y !== undefined) && (feature.y !== null) && (feature.y.toString().length > 0) ) &&
            ( (feature.hasOwnProperty("width")) && (feature.width !== undefined) && (feature.width !== null) && (feature.width.toString().length > 0) ) &&
            ( (feature.hasOwnProperty("height")) && (feature.height !== undefined) && (feature.height !== null) && (feature.height.toString().length > 0) )
        ) {
            validFeature = true;
        } else {
            validFeature = false;
        }
        if ( (isSymbol) && (hasId) && (idIsUnique) && (hasViewbox) ) {
            rendered = `<svg viewBox="0 0 100 100" height="100%" width="100%"><defs>${feature.symbol}</defs><use href="#${feature.id}" x="0" y="0" width="100" height="100"/></svg>`;
        }
    });

    // @ts-ignore
    let feature: FullThrustGame["map"]["features"][0] = {};
    let isSymbol: boolean;
    let hasId: boolean;
    let hasViewbox: boolean;
    let idIsUnique: boolean;
    const reSymbol = /^<symbol .*?>.*?<\/symbol>/i;
    const reContents = /<symbol (.*?)>/im;
    const reId = / id="(\S+?)"/;
    const reViewbox = / viewBox="(\d+\s+\d+\s+\d+\s+\d+)"/;
    const checkSymbol = () => {
        if (reSymbol.test(feature.symbol)) {
            isSymbol = true;
        } else {
            isSymbol = false;
        }
        if (reContents.test(feature.symbol)) {
            const m = feature.symbol.match(reContents);
            if (reId.test(m[0])) {
                hasId = true;
                const inner = m[0].match(reId);
                feature.id = inner[1];
                // check for duplicates
                idIsUnique = true;
                for (const f of $working.game.map.features) {
                    if (f.id === feature.id) {
                        idIsUnique = false;
                        break;
                    }
                }
            } else {
                hasId = false;
            }
            if (reViewbox.test(m[0])) {
                hasViewbox = true;
            } else {
                hasViewbox = false;
            }
        } else {
            hasId = undefined;
            hasViewbox = undefined;
            idIsUnique = undefined;
        }
    };

    const addFeature = () => {
        $working.game.map.features.push(feature);
        $working = $working;
        // @ts-ignore
        feature = {};
        isSymbol = undefined;
        hasId = undefined;
        hasViewbox = undefined;
        idIsUnique = undefined;
        rendered = undefined;
    };
</script>

<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label" for="featureText">SVG <code>&lt;symbol&gt;</code> code</label>
            <div class="control">
                <textarea class="textarea" id="featureText" rows="3" bind:value={feature.symbol} on:input={checkSymbol}></textarea>
            </div>
        {#if isSymbol !== undefined}
            {#if isSymbol}
                <p class="help is-success">Is a valid symbol</p>
            {:else}
                <p class="help is-danger">Not a valid symbol</p>
            {/if}
        {/if}
        {#if hasId !== undefined}
            {#if hasId}
                <p class="help is-success">Has valid <code>id</code> attribute</p>
            {:else}
                <p class="help is-danger">Missing valid <code>id</code> attribute</p>
            {/if}
        {/if}
        {#if idIsUnique !== undefined}
            {#if idIsUnique}
                <p class="help is-success"><code>id</code> attribute is unique</p>
            {:else}
                <p class="help is-danger"><code>id</code> attribute already in use</p>
            {/if}
        {/if}
        {#if hasViewbox !== undefined}
            {#if hasViewbox}
                <p class="help is-success">Has valid <code>viewBox</code> attribute</p>
            {:else}
                <p class="help is-danger">Missing valid <code>viewBox</code> attribute</p>
            {/if}
        {/if}
        </div>
    </div>
    <div class="column">
    {#if rendered !== undefined}
        <div class="preview">
            {@html rendered}
        </div>
    {:else}
        <div class="content">
            <p>Preview will appear here when a well formed symbol is given.</p>
        </div>
    {/if}
    </div>
</div>

<div class="content">
    <p>Specify the top-left corner of the feature in movement units. If the map is fixed, make sure the coordinates fall within the visible playing field or else the feature will not be visible.</p>
</div>
<div class="field is-grouped">
    <label class="label" for="tlx">x:</label>
    <div class="control">
        <input class="input" id="tlx" type="number" step="1" bind:value={feature.x}>
    </div>
    <label class="label" for="tly">y:</label>
    <div class="control">
        <input class="input" id="tly" type="number" step="1" bind:value={feature.y}>
    </div>
</div>

<div class="content">
    <p>Specify the width and height of the feature in movement units.</p>
</div>
<div class="field is-grouped">
    <label class="label" for="width">Width:</label>
    <div class="control">
        <input class="input" id="width" type="number" step="1" bind:value={feature.width}>
    </div>
    <label class="label" for="height">Height:</label>
    <div class="control">
        <input class="input" id="height" type="number" step="1" bind:value={feature.height}>
    </div>
</div>

<div class="field">
    <div class="control">
        <button class="button is-primary" disabled={! validFeature} on:click={addFeature}>Add Feature</button>
    </div>
</div>

<style>
    .preview {
        height: 10rem;
    }
</style>
