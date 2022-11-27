<script lang="ts">
    import type { FullThrustGame } from "ftlibgame";
    import { createEventDispatcher } from "svelte";

    export let features: FullThrustGame["map"]["features"] = [];

    const dispatch = createEventDispatcher();

    let modalDelete: string;
    let modalView: string;
    let activeIdx: number;
    let svgCode: string;
    let svgRendered: string;
    $: if (activeIdx !== undefined) {
        const f = features[activeIdx];
        svgCode = f.symbol;
        svgRendered = `<svg viewBox="0 0 100 100" height="100%" width="100%"><defs>${f.symbol}</defs><use href="#${f.id}" x="0" y="0" width="100" height="100"/></svg>`;
    } else {
        svgCode = undefined;
        svgRendered = undefined;
    }

    const deleteFeature = (idx: number) => {
        activeIdx = idx;
        modalDelete = "is-active";
    };

    const viewFeature = (idx: number) => {
        activeIdx = idx;
        modalView = "is-active";
    };

    const executeDelete = () => {
        if (activeIdx !== undefined) {
            dispatch("delete", {idx: activeIdx});
        }
        modalDelete = undefined;
        activeIdx = undefined;
    };
</script>

{#if features.length > 0}
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>x,y</th>
                <th>w &times; h</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {#each features as f, idx}
            <tr>
                <td>{f.id}</td>
                <td>{f.x},{f.y}</td>
                <td>{f.width} &times; {f.height}</td>
                <td>
                    <div class="field is-grouped">
                        <div class="control buttons is-small is-white">
                            <button class="button" title="Delete Feature" on:click={() => deleteFeature(idx)}>
                                <span class="icon">
                                    <i class="fa-solid fa-trash"></i>
                                  </span>
                            </button>
                            <button class="button" title="View Feature" on:click={() => viewFeature(idx)}>
                                <span class="icon">
                                    <i class="fa-solid fa-eye"></i>
                                  </span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <div class="content">
        <p>No features present</p>
    </div>
{/if}

<div class="modal {modalDelete}" id="showDelete">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Confirm Deletion</p>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>You're about to delete the following map feature. This cannot be undone. Please confirm.</p>
            </div>
            <div style="height: 75%">
                {@html svgRendered}
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" on:click="{executeDelete}">Delete Feature</button>
            <button class="button" on:click="{() => {activeIdx = undefined; modalDelete = ""}}">Close</button>
        </footer>
    </div>
</div>

<div class="modal {modalView}" id="showView">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">View Feature</p>
        </header>
        <section class="modal-card-body">
            <div style="height: 75%">
                {@html svgRendered}
            </div>
            <div class="content">
                <code>{svgCode}</code>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" on:click="{() => {modalView = ""}}">Close</button>
        </footer>
    </div>
</div>

<style>
    td {
        vertical-align: middle;
    }
</style>
