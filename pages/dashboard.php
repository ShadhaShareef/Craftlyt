<?php
$pageTitle = 'Dashboard — Craftlyt';
$pageDescription = 'Seller dashboard for managing products, requests, and messages.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/products.js', '../data/requests.js', '../data/messages.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/dashboard.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>

  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="dashboard-root" class="page-head"></main>
<?php include __DIR__ . '/../components' . '/footer.php'; ?>
