<?php
$pageTitle = 'Sign in — Craftlyt';
$pageDescription = 'Sign in to Craftlyt—manage pricing, inventory, and your maker storefront.';
$bodyClass = 'page-auth';
$stylesheets = ['assets/css/styles.css'];
$pageScripts = [];
$isPage = false;
?>
<?php include __DIR__ . '/components' . '/head.php'; ?>


  <?php include __DIR__ . '/components' . '/header.php'; ?>
<main class="auth-main">
    <div class="container">
      <div class="auth-layout">

        <div class="auth-form-panel">
          <p class="eyebrow">Maker access</p>
          <h1>Welcome back</h1>
          <p class="auth-lede">Sign in to manage pricing, inventory, and your storefront in one calm workspace.</p>

          <form action="#" method="post" autocomplete="on">
            <div class="field">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="••••••••" autocomplete="current-password" required>
            </div>

            <div class="field-row">
              <label class="remember">
                <input type="checkbox" name="remember">
                Remember me
              </label>
              <a class="forgot" href="#">Forgot password?</a>
            </div>

            <button type="submit" class="primary-btn">Sign in</button>
          </form>

          <p class="auth-switch">New to Craftlyt? <a href="signup.php">Create an account</a></p>
        </div>

        <aside class="auth-aside" aria-label="Highlight">
          <img src="assets/mirror.png" alt="" width="800" height="900">
          <div class="auth-aside-caption">
            <small>Studio snapshot</small>
            <p>Pricing, patterns, and peace of mind—built for makers who treat detail as non‑negotiable.</p>
          </div>
        </aside>

      </div>
    </div>
  </main>

  <footer class="auth-footer">
    <div class="container footer-inner">
      <p>© 2026 Craftlyt</p>
      <nav aria-label="Footer">
        <a href="#">Privacy</a>
        ·
        <a href="#">Terms</a>
        ·
        <a href="#">Support</a>
      </nav>
    </div>
  </footer>

</body>
</html>

