<template>
  <div class="title__block">
    <h2 class="loading"></h2>
    <div class="subtitle loading"></div>
    <div class="subtitle loading"></div>
    <div class="second__subtitle loading"></div>
    <div class="company__buttons" v-if=displayingOnlyRNCS>
      <button class="button" title="Télécharger les données de cette entreprise au format PDF">
        <img class="icon" src="@/assets/img/download.svg" alt="" />
        Version imprimable
      </button>
    </div>
    <div class="company__panel loading">
      <div class="text__medium loading"></div>
      <div class="text__long loading"></div>
      <div class="text__medium loading"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'headerSkeleton',
  computed: {
    // Temporary methods for displaying RNCS-only
    displayingOnlyRNCS () {
      if (process.env.DISPLAY_RNCS)
        return true
    }
  }
}
</script>

<style lang="scss" scoped>
  .company__buttons {
    margin-top: 1.5em;

    .button {
      padding: 0.5em 1em 0.6em;
      vertical-align: middle;
      margin-left: 0;
    }
  }

  h2.loading {
    width: 400px;
    margin-bottom: 0.5em;
  }

  .subtitle.loading {
    margin-top: 0.3em;
    width: 150px;
  }

  .second__subtitle.loading {
    margin-top: 1em;
    width: 300px;
  }

  .text__medium.loading {
    margin-top: 0.3em;
    width: 300px;
  }

  .text__long.loading {
    margin-top: 1.6em;
    width: 150px;
  }

  .company__panel {
    margin-top: 1.7em;
  }
</style>
