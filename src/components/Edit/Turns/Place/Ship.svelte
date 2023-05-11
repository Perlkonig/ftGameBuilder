<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";

    let player: string;
</script>

<div class="field">
    <label for="playerSelect">Select player</label>
    <div class="control">
        <div class="select">
            <select id="playerSelect" name="playerSelect" bind:value={player}>
                <option value=""></option>
            </select>
        </div>
    </div>
</div> <!-- field -->

