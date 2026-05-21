(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('form-root');
  var editId = C.getParam('id');
  var existing = editId ? C.getProductById(editId) : null;
  var isEdit = !!existing;

  C.guardPage('creator', root, function () {
    document.title = (isEdit ? 'Edit product' : 'New product') + ' — Craftlyt';

    root.innerHTML =
      '<div class="container">' +
      '<div class="page-head"><p class="eyebrow">Listing</p>' +
      '<h1 class="page-title">' +
      (isEdit ? 'Edit product' : 'New product') +
      '</h1></div>' +
      '<div id="form-banner"></div>' +
      '<div class="product-form-layout">' +
      '<div class="form-card">' +
      '<form id="product-form" novalidate>' +
      '<h2>Product details</h2>' +
      '<div class="form-group"><label for="title">Title</label><input id="title" name="title" required value="' +
      C.esc(existing ? existing.title : '') +
      '"></div>' +
      '<div class="form-group"><label for="description">Description</label><textarea id="description" name="description" required>' +
      C.esc(existing ? existing.description : '') +
      '</textarea></div>' +
      '<div class="form-grid-2">' +
      '<div class="form-group"><label for="category">Category</label><select id="category" name="category">' +
      ['Textiles', 'Ceramics', 'Paper & print', 'Jewelry', 'Home']
        .map(function (c) {
          return (
            '<option' +
            (existing && existing.category === c ? ' selected' : '') +
            '>' +
            C.esc(c) +
            '</option>'
          );
        })
        .join('') +
      '</select></div>' +
      '<div class="form-group"><label for="price">Price ($)</label><input type="number" id="price" name="price" min="1" required value="' +
      (existing ? existing.price : '') +
      '"></div></div>' +
      '<div class="form-grid-2">' +
      '<div class="form-group"><label for="materials">Materials</label><input id="materials" name="materials" value="' +
      C.esc(existing ? existing.materials : '') +
      '"></div>' +
      '<div class="form-group"><label for="dimensions">Dimensions</label><input id="dimensions" name="dimensions" value="' +
      C.esc(existing ? existing.dimensions : '') +
      '"></div></div>' +
      '<div class="form-group"><label for="quantity">Quantity</label><input type="number" id="quantity" name="quantity" min="0" value="' +
      (existing ? existing.quantity : 1) +
      '"></div>' +
      '<label class="toggle-row"><input type="checkbox" id="customizable"' +
      (existing && existing.customizable ? ' checked' : '') +
      '> Customizable on request</label>' +
      '<div class="form-group" style="margin-top:18px"><label>Images</label>' +
      '<div class="image-upload-zone" id="upload-zone">Click to add images (demo)</div>' +
      '<div class="image-preview-row" id="image-previews"></div></div>' +
      '<div class="form-actions">' +
      '<button type="button" class="btn-ghost" id="btn-draft">Save draft</button>' +
      '<button type="submit" class="primary-btn" id="btn-publish">Publish product</button>' +
      '<a href="product.php?id=' +
      encodeURIComponent(editId || 'p1') +
      '" class="secondary-btn" id="btn-preview">Preview product</a></div>' +
      '</form></div>' +
      '<aside class="pricing-panel" id="pricing-panel">' +
      '<h3>Pricing suggestion</h3>' +
      '<p style="font-size:14px;color:#666;margin-bottom:12px">Based on category and materials (mock).</p>' +
      '<div class="pricing-range"><span>Min</span><strong id="price-min">—</strong></div>' +
      '<div class="pricing-range"><span>Max</span><strong id="price-max">—</strong></div>' +
      '<p class="pricing-recommended" id="price-rec">—</p>' +
      '<button type="button" class="primary-btn" style="width:100%" id="btn-use-suggested">Use suggested price</button>' +
      '</aside></div></div>';

    root.innerHTML = root.innerHTML.replace(/<\/?motion-illustration>/g, '');

    var form = document.getElementById('product-form');
    var catEl = document.getElementById('category');
    var matEl = document.getElementById('materials');
    var priceEl = document.getElementById('price');

    function updatePricing() {
      var s = C.suggestPrice(catEl.value, matEl.value);
      document.getElementById('price-min').textContent = C.formatPrice(s.min);
      document.getElementById('price-max').textContent = C.formatPrice(s.max);
      document.getElementById('price-rec').textContent = C.formatPrice(s.recommended);
      return s;
    }

    catEl.addEventListener('change', updatePricing);
    matEl.addEventListener('input', updatePricing);
    updatePricing();

    document.getElementById('btn-use-suggested').addEventListener('click', function () {
      priceEl.value = updatePricing().recommended;
    });

    document.getElementById('upload-zone').addEventListener('click', function () {
      var row = document.getElementById('image-previews');
      var img = document.createElement('img');
      img.src = C.asset('craft.jpg');
      img.alt = '';
      row.appendChild(img);
    });

    function showBanner(msg, ok) {
      var b = document.getElementById('form-banner');
      b.className = ok ? 'form-success-banner' : 'form-error';
      b.textContent = msg;
    }

    function validate() {
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var g = el.closest('.form-group');
        if (!el.value.trim()) {
          if (g) g.classList.add('has-error');
          ok = false;
        } else if (g) g.classList.remove('has-error');
      });
      return ok;
    }

    document.getElementById('btn-draft').addEventListener('click', function () {
      if (!validate()) {
        showBanner('Please fix the highlighted fields.', false);
        return;
      }
      showBanner('Draft saved (demo).', true);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        showBanner('Please fix the highlighted fields.', false);
        return;
      }
      showBanner('Product published successfully (demo).', true);
      document.getElementById('btn-publish').disabled = true;
    });
  });
})();

