<?php
$pageTitle = 'Product — Craftlyt';
$pageDescription = 'Product details page for Craftlyt listings.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/products.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/product.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>


  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="product-root" class="product-detail">
    <div class="container"><p class="storefront-count">Loading…</p></div>
  </main>

<?php include __DIR__ . '/../components' . '/footer.php'; ?>
