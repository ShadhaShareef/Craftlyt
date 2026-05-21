<?php
$isPage = $isPage ?? false;
$siteRoot = $isPage ? '../' : '';
$pagePrefix = $isPage ? '' : 'pages/';
$current = basename($_SERVER['PHP_SELF']);
function navLink($path, $label, $match = null, $isPageLink = true) {
  global $siteRoot, $pagePrefix, $current;
  $href = $siteRoot . ($isPageLink ? $pagePrefix . $path : $path);
  $active = $current === ($match ?? basename($path));
  echo '<a href="' . htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '"' . ($active ? ' aria-current="page"' : '') . '>' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</a>';
}
?>
<header class="site-header">
  <div class="container navbar">
    <a href="<?= htmlspecialchars($siteRoot . 'index.php', ENT_QUOTES, 'UTF-8') ?>" class="logo">Craftlyt</a>

    <input type="checkbox" id="nav-toggle" class="nav-checkbox" />
    <label for="nav-toggle" class="nav-backdrop" aria-hidden="true"></label>

    <nav class="nav-links" aria-label="Main">
        <?php navLink('index.php', 'Home', null, false); ?>
      <?php navLink('storefront.php', 'Storefront', null, false); ?>
      <?php navLink('dashboard.php', 'Dashboard'); ?>
      <?php navLink('requests.php', 'Requests'); ?>
      <?php navLink('messages.php', 'Messages'); ?>
      <?php navLink('pricing-insights.php', 'Pricing'); ?>
    </nav>

    <div class="navbar-trailing">
      <?php if ($isPage): ?>
        <a href="<?= htmlspecialchars($siteRoot . 'login.php', ENT_QUOTES, 'UTF-8') ?>" class="login-btn">Login</a>
      <?php else: ?>
        <a href="<?= htmlspecialchars($siteRoot . 'login.php', ENT_QUOTES, 'UTF-8') ?>" class="login-btn">Login</a>
      <?php endif; ?>
      <label for="nav-toggle" class="nav-burger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </div>
</header>
