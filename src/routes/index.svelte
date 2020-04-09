<script>
  import LicensePlate from "../components/LicensePlate.svelte";
  import fileDownload from "downloadjs";
  import templates from "../print_templates/constants/templates";
  import { derived, writable } from "svelte/store";

  let name;
  let rows = writable([]);
  let currentTemplateType = templates[0];

  async function printSingles(e) {
    const res = await fetch("print", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        singles: true,
        cards: $rows
      })
    });

    const blob = await res.blob();
    fileDownload(blob, `labels.pdf`, "application/pdf");
  }

  async function printCompressed(e) {
    const res = await fetch("print", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        singles: false,
        cards: $rows
      })
    });

    const blob = await res.blob();
    fileDownload(blob, `labels.pdf`, "application/pdf");
  }

  const handleOptionChange = e => {
    currentTemplateType = findByRenderer(e.target.value);
  };

  const findByRenderer = q => templates.find(t => t.rendererId == q);

  const removeRow = model => {
    $rows = $rows.filter(row => row != model);
  };

  const addRow = () => {
    $rows = [
      {
        type: currentTemplateType,
        options: {},
        name: "",
        note: ""
      },
      ...$rows
    ];
  };

  let hasCards = derived(rows, $rows => $rows.length > 0);
</script>

<style>

</style>

<svelte:head>
  <title>What Is Food - Utils</title>
</svelte:head>
<div class="mb-12">
  <p class="text-2xl">License Plate Builder</p>
  <p>Add cards of desired size and print</p>
</div>

<div class="flex justify-between items-end">
  <div class="flex-row">
    <div class="flex mb-4 ">
      <p class="mr-4 w-full whitespace-no-wrap">Select a template type</p>
      <select
        class="appearance-none bg-gray-200 border border-gray-200 text-gray-700
        py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white
        focus:border-gray-500"
        name="templates"
        value={currentTemplateType}
        on:change={handleOptionChange}>
        {#each templates as template}
          <option value={template.rendererId}>{template.name}</option>
        {/each}
      </select>
    </div>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      on:click={addRow}>
      Create card +
    </button>
  </div>

  <div class="flex">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
      rounded mr-2 {$hasCards ? '' : 'cursor-not-allowed opacity-50'}"
      type="submit"
      on:click={printSingles}>
      Print Singles
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
      rounded {$hasCards ? '' : 'cursor-not-allowed opacity-50'}"
      type="submit"
      on:click={printCompressed}>
      Print Compressed
    </button>
  </div>
</div>

<div class="card shadow p-8 mt-8">
  {#if !$hasCards}
    <p class="text-3xl">Let's create some cards.</p>
  {/if}

  <div class="card">
    {#each $rows as row}
      <LicensePlate model={row} {removeRow} />
    {/each}
  </div>
</div>
