<?php
$pageTitle = 'Sign up — Craftlyt';
$pageDescription = 'Create a Craftlyt account to manage pricing, inventory, and your maker storefront.';
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
          <p class="eyebrow">Join the studio</p>
          <h1>Create your account</h1>
          <p class="auth-lede">A few details and you’re in—set up pricing, inventory, and your maker profile at your own pace.</p>

          <form action="#" method="post" autocomplete="on">
            <div class="field-grid">
              <div class="field">
                <label for="first">First name</label>
                <input type="text" id="first" name="first" placeholder="Elena" autocomplete="given-name" required>
              </div>
              <div class="field">
                <label for="last">Last name</label>
                <input type="text" id="last" name="last" placeholder="Vance" autocomplete="family-name" required>
              </div>
            </div>

            <div class="field">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="At least 8 characters" autocomplete="new-password" minlength="8" required>
            </div>

            <div class="field">
              <label for="password2">Confirm password</label>
              <input type="password" id="password2" name="password2" placeholder="Repeat password" autocomplete="new-password" minlength="8" required>
            </div>

            <label class="terms">
              <input type="checkbox" name="terms" required>
              <span>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</span>
            </label>

            <button type="submit" class="primary-btn">Create account</button>
          </form>

          <p class="auth-switch">Already have an account? <a href="login.php">Sign in</a></p>
        </div>

        <aside class="auth-aside" aria-label="Highlight">
          <img src="assets/pottery1.jpg" alt="" width="800" height="900">
          <div class="auth-aside-caption">
            <small>Onboarding</small>
            <p>Start with honest pricing and a storefront that feels as considered as your craft.</p>
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

