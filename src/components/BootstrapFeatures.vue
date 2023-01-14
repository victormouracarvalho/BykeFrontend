<!--From https://getbootstrap.com/docs/5.2/examples/-->

<script>
export default {
  name: "BootstrapFeatures",
}
</script>

<template>
  <div class="container px-4 py-5" id="icon-grid">
    <h2 class="pb-2 border-bottom">Notre offre</h2>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#send"></use></svg>
        <div>
          <h3 class="fw-bold mb-0 fs-4">GPS connecté</h3>
          <p>Utilisez notre GPS pour un suivi ultra précis de votre trajet</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#android2"></use></svg>
        <div>
          <h3 class="fw-bold mb-0 fs-4">Application android</h3>
          <p>Toujours disponible, même sur un vélo</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"></use></svg>
        <div>
          <h3 class="fw-bold mb-0 fs-4">Statistiques</h3>
          <p>Tous ce que vous rêvez de savoir sur vos trajets</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#people"></use></svg>
        <div>
          <h3 class="fw-bold mb-0 fs-4">Communauté</h3>
          <p>Essayez un trajet créé par la communauté ou partagez les vôtre</p>
        </div>
      </div>
    </div>
  </div>
</template>