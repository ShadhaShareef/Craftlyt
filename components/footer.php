<?php
$pageScripts = $pageScripts ?? $scripts ?? [];
?>
  <footer class="site-footer">
    <div class="container footer-wrapper">
      <div class="footer-left">
        <h2>Craftlyt</h2>
        <p>© 2026 Craftlyt. Handcrafted with intention.</p>
      </div>
      <nav class="footer-links" aria-label="Footer">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Support</a>
      </nav>
      <div class="footer-icons" aria-hidden="true">
        <span>◻</span>
        <span>◯</span>
        <span>✉</span>
      </div>
    </div>
  </footer>
<?php foreach ($pageScripts as $src): ?>
  <script src="<?= htmlspecialchars($src, ENT_QUOTES, 'UTF-8') ?>"></script>
<?php endforeach; ?>
</body>
</html>
