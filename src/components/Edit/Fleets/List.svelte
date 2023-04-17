<script lang="ts">
    import { allShips } from "@/stores/derivedShips";
    import { working } from "@/stores/writeWorkingLocal";
    import { renderUri } from "ftlibship";
    import { PowerTable } from "@muonw/powertable";
    import type {Data} from "@muonw/powertable/components/PowerTable.svelte";
    import '@muonw/powertable/styles/power-table.scss';
    import { nanoid } from "nanoid";
    import Summary from "./Summary.svelte";

    const sortNumbers = (v1: string, v2: string): number => {
        return parseFloat(v1) < parseFloat(v2) ? -1 : parseFloat(v1) > parseFloat(v2) ? 1 : 0;
    }

    let ptInstructs = [
        {key: "uuid", title: "UID"},
        {key: "owner", title: "Owner"},
        {key: "class", title: "Class"},
        {key: "name", title: "Name"},
        {key: "mass", title: "Mass", userFunctions: {customSort: sortNumbers}},
        {key: "points", title: "NPV", userFunctions: {customSort: sortNumbers}},
        {key: "cpv", title: "CPV", userFunctions: {customSort: sortNumbers}},
    ];

    const addContent = (pageContent: Data[]): Data[] => {
        pageContent.forEach(row => {
            // Add usernames
            const idx = parseInt(row["owner"], 10) - 1;
            row["owner"] = `${row["owner"]} (${$working.game.header.players[idx]})`;
        });
        return pageContent;
    };

    let ptOptions = {
        userFunctions: {
            customParse: addContent
        },
    };

    let clickedRow: any;
    let renderedUri: string;
    const genSsd = () => {
        const idxs = JSON.parse(clickedRow.idxs);
        const ship = $working.game.ships[idxs[0]][idxs[1]];
        renderedUri = renderUri(ship);
    };
    const deleteShip = (idxs: [number, number]) => {
        $working.game.ships[idxs[0]].splice(idxs[1], 1);
        $working = $working;
        clickedRow = undefined;
    };
    const regenUid = (idxs: [number, number]) => {
        $working.game.ships[idxs[0]][idxs[1]].uuid = nanoid(7);
        $working = $working;
        clickedRow = undefined;
    };

    let modalSSD: string;
    let modalDelete: string;
</script>

<Summary />

<hr>

<div class="content">
    <p>Click on a row to edit it or view the SSD.</p>
</div>
{#key clickedRow}
{#if clickedRow !== undefined}
    <table class="table clicked">
        <thead>
            <tr>
                <th>UID</th>
                <th>Owner</th>
                <th>Class</th>
                <th>Name</th>
                <th>Mass</th>
                <th>NPV</th>
                <th>CPV</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{clickedRow.uuid}</td>
                <td>{clickedRow.owner} ({$working.game.header.players[clickedRow.owner - 1]})</td>
                <td>{clickedRow.class}</td>
                <td>{clickedRow.name}</td>
                <td>{clickedRow.mass}</td>
                <td>{clickedRow.points}</td>
                <td>{clickedRow.cpv}</td>
            </tr>
        </tbody>
    </table>
    <div class="field">
        <div class="control">
            <button class="button is-responsive" on:click={() => modalDelete = "is-active"}>
                <span class="icon" title="Delete ship">
                    <i class="fa-solid fa-trash"></i>
                </span>
            </button>
            <button class="button is-responsive" on:click={() => regenUid(JSON.parse(clickedRow.idxs))}>
                <span class="icon" title="Regenerate UID">
                    <i class="fa-solid fa-recycle"></i>
                </span>
            </button>
            <button class="button is-responsive" on:click={() => modalSSD = "is-active"}>
                <span class="icon" title="View SSD">
                    <i class="fa-solid fa-eye"></i>
                </span>
            </button>
        </div>
    </div>
{/if}
{/key}

<hr>

<div class="MuonW PowerTable">
    <PowerTable
        ptData = {$allShips}
        {ptOptions}
        {ptInstructs}
        on:rowClicked="{(d) => {clickedRow = d.detail.data; genSsd();}}"
    />
</div>

<div class="modal {modalSSD}" id="showSSD">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">View SSD</p>
        </header>
        <section class="modal-card-body">
        {#key renderedUri}
            <object id="svg-object" data="{renderedUri}" type="image/svg+xml"></object>
        {/key}
        </section>
        <footer class="modal-card-foot">
            <button class="button" on:click="{() => {modalSSD = ""}}">Close</button>
        </footer>
    </div>
</div>

<div class="modal {modalDelete}" id="showDelete">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Confirm Deletion</p>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>You're about to delete the following ship. This cannot be undone. Please confirm.</p>
            </div>
            <div style="height: 75%">
            {#key renderedUri}
                <object id="svg-object" data="{renderedUri}" type="image/svg+xml"></object>
            {/key}
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" on:click="{() => {deleteShip(JSON.parse(clickedRow.idxs)); modalDelete = undefined;}}">Delete Ship</button>
            <button class="button" on:click="{() => modalDelete = undefined}">Close</button>
        </footer>
    </div>
</div>

<style global>
    #svg-object {
        height: 100%;
        width: 100%;
    }
</style>