<script lang="ts">
    import { working } from "@/stores/writeWorkingLocal";
    import Load from "@/components/Load.svelte";
    import Edit from "@/components/Edit.svelte";
</script>

<main class="container p-6">
    <h1 class="title">Full Thrust Game Builder</h1>
    <!-- svelte-ignore missing-declaration -->
    <p class="version subtitle">Version: {__APP_VERSION__}</p>

    {#if $working === undefined}
        <Load />
    {:else}
        <Edit />
    {/if}
</main>

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <a href="https://github.com/Perlkonig/ftGameBuilder">Fork me on GitHub!</a>
    </p>
    <p>
      I believe in the "value for value" model. If you find this tool valuable, consider a donation proportional to that value: <a href="https://paypal.me/abstractplay">paypal.me/abstractplay</a>. Thank you!
    </p>
  </div>
</footer>
