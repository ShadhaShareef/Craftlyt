<?php
$pageTitle = $pageTitle ?? 'Craftlyt';
$pageDescription = $pageDescription ?? 'Craftlyt helps artisans price, manage, and sell handmade work with confidence from materials to shipping.';
$bodyClass = $bodyClass ?? '';
$stylesheets = $stylesheets ?? [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>" />
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<?php foreach ($stylesheets as $href): ?>
  <link rel="stylesheet" href="<?= htmlspecialchars($href, ENT_QUOTES, 'UTF-8') ?>" />
<?php endforeach; ?>
</head>
<body<?php if ($bodyClass): ?> class="<?= htmlspecialchars($bodyClass, ENT_QUOTES, 'UTF-8') ?>"<?php endif; ?> >
