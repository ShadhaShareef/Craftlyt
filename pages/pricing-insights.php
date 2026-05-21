<?php
$pageTitle = 'Pricing — Craftlyt';
$pageDescription = 'Pricing insights page for Craftlyt makers.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/pricing.js', '../data/requests.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/pricing-insights.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>

  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="pricing-root"></main>
<?php include __DIR__ . '/../components' . '/footer.php'; ?>
