<?php
$pageTitle = 'Messages — Craftlyt';
$pageDescription = 'Craftlyt inbox for project messages and customer conversations.';
$bodyClass = 'page-app';
$stylesheets = ['../assets/css/styles.css', '../assets/css/pages.css'];
$pageScripts = ['../data/users.js', '../data/messages.js', '../assets/js/utils.js', '../assets/js/auth.js', '../assets/js/components.js', '../assets/js/pages/messages.js'];
$isPage = true;
?>
<?php include __DIR__ . '/../components' . '/head.php'; ?>

  <?php include __DIR__ . '/../components' . '/header.php'; ?>
<main id="messages-root"></main>
<?php include __DIR__ . '/../components' . '/footer.php'; ?>
