<?php
$pageTitle = 'Requests — Craftlyt';
$pageDescription = 'Incoming seller requests and order actions on Craftlyt.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/requests.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/requests.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>

  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="requests-root"></main>
<?php include __DIR__ . '/../components' . '/footer.php'; ?>
