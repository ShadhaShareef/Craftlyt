<?php
$pageTitle = 'Storefront — Craftlyt';
$pageDescription = 'Browse handmade work on Craftlyt—filter by category and discover makers.';
$bodyClass = 'page-storefront';
$stylesheets = ['assets/css/styles.css', 'assets/css/pages.css'];
$pageScripts = ['data/products.js', 'assets/js/utils.js', 'assets/js/components.js', 'assets/js/storefront.js'];
$isPage = false;
?>
<?php include __DIR__ . '/components' . '/head.php'; ?>


  <?php include __DIR__ . '/components' . '/header.php'; ?>
<main class="storefront">
    <div class="container storefront-intro">
      <p class="eyebrow storefront-eyebrow">Marketplace</p>
      <h1 class="storefront-title">Storefront</h1>
      <p class="storefront-sub">Curated handmade work from independent makers. Search and filter updates as you type.</p>
    </div>

    <div class="storefront-sticky">
      <div class="container storefront-toolbar">
        <div class="storefront-search-wrap">
          <label class="visually-hidden" for="store-search">Search listings</label>
          <input
            type="search"
            id="store-search"
            class="storefront-search"
            placeholder="Search by title, maker, category…"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
        <div
          class="storefront-pills"
          id="category-pills"
          role="group"
          aria-label="Categories"
        ></div>
      </div>
    </div>

    <div class="container storefront-results">
      <p class="storefront-count" id="storefront-count" aria-live="polite"></p>
      <div class="storefront-grid" id="product-grid"></div>
      <div class="storefront-empty" id="storefront-empty" hidden>
        <p class="storefront-empty-title">No matches yet</p>
        <p class="storefront-empty-desc">Try another search or pick a different category.</p>
      </div>
    </div>
  </main>

  <?php include __DIR__ . '/components' . '/footer.php'; ?>
