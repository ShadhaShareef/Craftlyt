<?php
$pageTitle = 'My account — Craftlyt';
$pageDescription = 'Buyer dashboard for Craftlyt makers.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/products.js', '../data/messages.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/buyer-dashboard.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>

  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="buyer-root"></main>
<?php include __DIR__ . '/../components' . '/footer.php'; ?>
