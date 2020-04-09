<script>
  export let model;
  export let removeRow;
</script>

<style>
  .minimal-input {
    @apply bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal;
  }
</style>

<div class="bg-gray-100 px-4 justify-end shadow mt-4">
  <div class="py-2">
    <p class="text-xl italic mb-2">{model.type.name}</p>
    <div class="mb-4">
      <div>
        <input
          class="minimal-input"
          type="text"
          placeholder="Title"
          bind:value={model.name} />
      </div>

      <div class="mt-4">
        <textarea
          class="minimal-input"
          type="text"
          placeholder="Notes"
          bind:value={model.note} />
      </div>
    </div>

    <div class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
        ease-in-out"
        bind:checked={model.options.reverseArrow} />
      <label class="ml-2 block text-sm leading-5 text-gray-900">
        Point Arrow Down
      </label>
    </div>

    <div class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
        ease-in-out"
        bind:checked={model.options.isAllergen} />
      <label class="ml-2 block text-sm leading-5 text-gray-900">
        Is Allergen?
      </label>
    </div>
  </div>

  <div class="text-right">
    <button class="mt-8" type="button" on:click={() => removeRow(model)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          class="heroicon-ui"
          d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 012 2v2h5a1 1 0 010 2h-1v12a2 2 0 01-2
          2H6a2 2 0 01-2-2V8H3a1 1 0 110-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4
          4a1 1 0 011 1v6a1 1 0 01-2 0v-6a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0
          01-2 0v-6a1 1 0 011-1z" />
      </svg>
    </button>
  </div>
</div>
