(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('messages-root');
  var convos = (window.CraftlytConversations || []).slice();
  var activeId = C.getParam('id') || (convos[0] && convos[0].id);

  function renderChat(convo) {
    if (!convo) {
      return '<div class="chat-panel" style="align-items:center;justify-content:center;color:#666">Select a conversation</div>';
    }
    var bubbles = convo.messages
      .map(function (m) {
        return (
          '<div class="chat-bubble chat-bubble--' +
          (m.from === 'me' ? 'me' : 'them') +
          '">' +
          C.esc(m.text) +
          '<time>' +
          C.esc(m.time) +
          '</time></div>'
        );
      })
      .join('');
    return (
      '<div class="chat-panel">' +
      '<div class="chat-header">' +
      '<img src="' +
      C.esc(convo.participantAvatar) +
      '" alt="">' +
      '<div class="chat-header-info"><h3>' +
      C.esc(convo.participantName) +
      '</h3>' +
      (convo.online ? '<span class="online-pill">● Online</span>' : '<span style="font-size:12px;color:#999">Offline</span>') +
      '<p>Re: ' +
      C.esc(convo.requestRef) +
      '</p></div></div>' +
      '<div class="chat-messages" id="chat-messages">' +
      bubbles +
      '</div>' +
      '<form class="chat-compose" id="chat-form">' +
      '<button type="button" class="chat-attach" aria-label="Attach file">📎</button>' +
      '<input type="text" id="chat-input" placeholder="Write a message…" autocomplete="off">' +
      '<button type="submit" class="primary-btn" style="padding:12px 20px">Send</button></form></div>'
    );
  }

  root.innerHTML =
    '<div class="container" style="padding-bottom:48px">' +
    '<div class="page-head"><p class="eyebrow">Inbox</p><h1 class="page-title">Messages</h1></div>' +
    '<div class="messages-layout" id="messages-layout"></div></div>';

  var layout = document.getElementById('messages-layout');

  function paint() {
    var active = convos.find(function (c) {
      return c.id === activeId;
    });
    var list = convos
      .map(function (c) {
        return (
          '<button type="button" class="conversation-item' +
          (c.id === activeId ? ' is-active' : '') +
          '" data-id="' +
          c.id +
          '">' +
          '<img src="' +
          C.esc(c.participantAvatar) +
          '" alt="">' +
          (c.unread ? '<span class="unread-dot"></span>' : '') +
          '<div class="conversation-item-body">' +
          '<div class="conversation-item-top"><strong>' +
          C.esc(c.participantName) +
          '</strong><span style="font-size:12px;color:#999">' +
          C.esc(c.lastTime) +
          '</span></div>' +
          '<p class="conversation-item-preview">' +
          C.esc(c.lastMessage) +
          '</p></div></button>'
        );
      })
      .join('');

    layout.innerHTML =
      '<aside class="messages-sidebar">' +
      '<div class="messages-sidebar-search">' +
      '<input type="search" class="storefront-search" id="conv-search" placeholder="Search conversations…" style="max-width:100%">' +
      '</div><div class="conversation-list" id="conv-list">' +
      list +
      '</div></aside>' +
      renderChat(active);

    layout.innerHTML = layout.innerHTML.replace(/<\/?motion-illustration>/g, '');

    layout.querySelectorAll('.conversation-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeId = btn.dataset.id;
        var c = convos.find(function (x) {
          return x.id === activeId;
        });
        if (c) c.unread = 0;
        paint();
      });
    });

    var chatForm = document.getElementById('chat-form');
    if (chatForm && active) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = document.getElementById('chat-input');
        var text = input.value.trim();
        if (!text) return;
        active.messages.push({
          id: 'm' + Date.now(),
          from: 'me',
          text: text,
          time: 'Just now',
        });
        active.lastMessage = text;
        active.lastTime = 'Just now';
        input.value = '';
        paint();
        var box = document.getElementById('chat-messages');
        if (box) box.scrollTop = box.scrollHeight;
      });
    }

    document.getElementById('conv-search').addEventListener('input', function (e) {
      var q = e.target.value.toLowerCase();
      layout.querySelectorAll('.conversation-item').forEach(function (btn) {
        var name = btn.querySelector('strong').textContent.toLowerCase();
        btn.style.display = name.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  paint();
})();
