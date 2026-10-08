(function () {
  'use strict';

  var ICONS = {
    'shirt': '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
    'sparkles': '<path d="M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    'sliders': '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    'eraser': '<path d="M21 21H7l-4.3-4.3a2 2 0 0 1 0-2.8l9-9a2 2 0 0 1 2.8 0l5.6 5.6a2 2 0 0 1 0 2.8L13 21"/><path d="m5.5 15.5 4 4"/>',
    'user-round': '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    'image-plus': '<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    'flip': '<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M12 20v2"/><path d="M12 14v2"/><path d="M12 8v2"/><path d="M12 2v2"/>',
    'hanger': '<path d="M12 7a2 2 0 1 1 2-2"/><path d="M12 7v2"/><path d="M3.5 17.5 12 11l8.5 6.5a1 1 0 0 1-.6 1.8H4.1a1 1 0 0 1-.6-1.8Z"/>',
    'trash': '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    'pipette': '<path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.5.5a2.1 2.1 0 0 1-3 3l-3-3a2.1 2.1 0 0 1 3-3z"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>'
  };

  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
      + ' stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</svg>';
  }

  Array.prototype.forEach.call(document.querySelectorAll('.ico'), function (el) {
    if (ICONS[el.dataset.icon]) el.innerHTML = iconSvg(el.dataset.icon);
  });

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 品类：决定默认位置和前后顺序 ---------- */

  // w 是衣服宽度占舞台宽度的比例，y 是落点占舞台高度的比例。
  // 按默认立绘（default-base.webp，1344x1792）用中轴亮度实测校准：
  //   吊带+短裤 0.265-0.510、膝约 0.70、踝 0.90、脚底 0.99，人物横向居中。
  // 换立绘时这几个值要跟着重量。
  var CATS = [
    { id: 'top', label: '上装', z: 20, w: 0.30, y: 0.35 },
    { id: 'bottom', label: '下装', z: 10, w: 0.26, y: 0.70 },
    { id: 'dress', label: '裙装', z: 12, w: 0.36, y: 0.47 },
    { id: 'outer', label: '外套', z: 30, w: 0.34, y: 0.37 },
    { id: 'shoes', label: '鞋', z: 15, w: 0.20, y: 0.95 },
    { id: 'bag', label: '包袋', z: 40, w: 0.24, y: 0.47 },
    { id: 'acc', label: '配饰', z: 50, w: 0.14, y: 0.16 }
  ];

  // 底图（立绘）单独放宽到 1800 保清晰度；衣服图仍限 900 控制内存。
  var MAX_BASE_DIM = 1800;

  // 出厂自带的默认立绘：库里没有自定义立绘时用它，首次打开就有得用
  var DEFAULT_BASE = 'assets/default-base.webp';

  function catOf(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i];
    return CATS[0];
  }

  var MAX_GARMENT_DIM = 900;
  var THUMB_DIM = 180;

 var state = {
    base: null,
    garments: [],
    outfits: [],
    activeId: null,
    tool: 'move',
    brush: 60,
    picking: false,
    filter: 'all',
    stageW: 900,
    stageH: 1200,
    hover: null,
    drag: null,
    view: { s: 1, tx: 0, ty: 0 },
    pointers: new Map()
  };

  var stage = $('stage');
  var sctx = stage.getContext('2d');
  var ACCENT = '#e884a9';

  /* ---------- 本地数据库 ---------- */

  var DB_NAME = 'duoduo-dressup';
  var dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, 2);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('garments')) db.createObjectStore('garments', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('outfits')) db.createObjectStore('outfits', { keyPath: 'id' });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbPromise;
  }

  function dbPut(store, value) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(store, 'readwrite');
        t.objectStore(store).put(value);
        t.oncomplete = function () { resolve(true); };
        t.onerror = function () { reject(t.error); };
      });
    });
  }

  function dbRemove(store, key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(store, 'readwrite');
        t.objectStore(store).delete(key);
        t.oncomplete = function () { resolve(true); };
        t.onerror = function () { reject(t.error); };
      });
    });
  }

  function dbAll(store) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var req = db.transaction(store, 'readonly').objectStore(store).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function dbGet(store, key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var req = db.transaction(store, 'readonly').objectStore(store).get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  /* ---------- 图片工具 ---------- */

  function loadViaElement(blob) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function () { resolve({ el: img, release: function () { URL.revokeObjectURL(url); } }); };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('图片解码失败'));
      };
      img.src = url;
    });
  }

  async function decode(blob) {
    if (window.createImageBitmap) {
      try {
        var bmp = await createImageBitmap(blob);
        return { el: bmp, release: function () { if (bmp.close) bmp.close(); } };
      } catch (err) { /* 回退到 Image */ }
    }
    return loadViaElement(blob);
  }

  async function blobToCanvas(blob, maxDim) {
    var src = await decode(blob);
    var w = src.el.width || src.el.naturalWidth;
    var h = src.el.height || src.el.naturalHeight;
    var k = Math.min(1, maxDim / Math.max(w, h));
    var c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w * k));
    c.height = Math.max(1, Math.round(h * k));
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(src.el, 0, 0, c.width, c.height);
    src.release();
    return c;
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise(function (resolve) {
      canvas.toBlob(function (b) { resolve(b); }, type, quality);
    });
  }

  // 带透明通道的衣服图，先把四周的透明边距裁掉。
  // 这样 placeByDefault 按宽度定的尺寸才准，落点不会偏小或发飘。
  function trimTransparent(canvas) {
    var w = canvas.width;
    var h = canvas.height;
    var data = canvas.getContext('2d').getImageData(0, 0, w, h).data;
    var minX = w, minY = h, maxX = -1, maxY = -1;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return canvas;
    if (minX === 0 && minY === 0 && maxX === w - 1 && maxY === h - 1) return canvas;
    var out = document.createElement('canvas');
    out.width = maxX - minX + 1;
    out.height = maxY - minY + 1;
    out.getContext('2d').drawImage(canvas, -minX, -minY);
    return out;
  }

  function blobToDataURL(blob) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(fr.error); };
      fr.readAsDataURL(blob);
    });
  }

  function dataURLToBlob(dataUrl) {
    var parts = String(dataUrl).split(',');
    var mime = /:(.*?);/.exec(parts[0]);
    var bin = atob(parts[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime ? mime[1] : 'application/octet-stream' });
  }

  function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }
  function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function cleanName(filename) {
    var name = String(filename).replace(/\.[^.]+$/, '');
    return name.length > 14 ? name.slice(0, 13) + '…' : name;
  }

  /* ---------- 衣服对象 ---------- */

  function runtimeFrom(rec) {
    return {
      id: rec.id,
      name: rec.name,
      category: rec.category,
      blob: rec.blob,
      thumbBlob: rec.thumb || null,
      key: rec.key || null,
      tol: rec.tol == null ? 40 : rec.tol,
      maskBlob: rec.mask || null,
      w: rec.w,
      h: rec.h,
      x: rec.x,
      y: rec.y,
      scale: rec.scale,
      rot: rec.rot || 0,
      flip: !!rec.flip,
      opacity: rec.opacity == null ? 1 : rec.opacity,
      worn: !!rec.worn,
      order: rec.order || 0,
      zBias: rec.zBias || 0,
      img: null,
      mask: null,
      canvas: null,
      dirty: true,
      thumbUrl: null
    };
  }

  function recordOf(g) {
    return {
      id: g.id,
      name: g.name,
      category: g.category,
      blob: g.blob,
      thumb: g.thumbBlob,
      key: g.key,
      tol: g.tol,
      mask: g.maskBlob,
      w: g.w,
      h: g.h,
      x: g.x,
      y: g.y,
      scale: g.scale,
      rot: g.rot,
      flip: g.flip,
      opacity: g.opacity,
      worn: g.worn,
      order: g.order,
      zBias: g.zBias || 0
    };
  }

  function persist(g) {
    return dbPut('garments', recordOf(g)).catch(function (err) { console.warn(err); });
  }

  async function ensureLoaded(g) {
    if (!g.img) {
      g.img = await blobToCanvas(g.blob, MAX_GARMENT_DIM);
      g.w = g.img.width;
      g.h = g.img.height;
    }
    if (!g.mask) {
      g.mask = document.createElement('canvas');
      g.mask.width = g.w;
      g.mask.height = g.h;
      if (g.maskBlob) {
        var src = await decode(g.maskBlob);
        g.mask.getContext('2d').drawImage(src.el, 0, 0, g.w, g.h);
        src.release();
      }
    }
    g.dirty = true;
    return g;
  }

  function unload(g) {
    g.img = null;
    g.mask = null;
    g.canvas = null;
  }

  function buildLayer(g) {
    if (!g.img) return;
    var w = g.img.width;
    var h = g.img.height;
    if (!g.canvas) g.canvas = document.createElement('canvas');
    if (g.canvas.width !== w || g.canvas.height !== h) {
      g.canvas.width = w;
      g.canvas.height = h;
    }
    var c = g.canvas.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
    c.clearRect(0, 0, w, h);
    c.drawImage(g.img, 0, 0);

    if (g.key) {
      var data = c.getImageData(0, 0, w, h);
      var px = data.data;
      var limit = g.tol * g.tol;
      for (var i = 0; i < px.length; i += 4) {
        if (px[i + 3] === 0) continue;
        var dr = px[i] - g.key.r;
        var dg = px[i + 1] - g.key.g;
        var db = px[i + 2] - g.key.b;
        if (dr * dr + dg * dg + db * db <= limit) px[i + 3] = 0;
      }
      c.putImageData(data, 0, 0);
    }

    if (g.mask) {
      c.globalCompositeOperation = 'destination-out';
      c.drawImage(g.mask, 0, 0);
      c.globalCompositeOperation = 'source-over';
    }
    g.dirty = false;
  }

  function wornSorted() {
    return state.garments.filter(function (g) { return g.worn && g.img; })
      .sort(function (a, b) {
        var za = catOf(a.category).z + (a.zBias || 0);
        var zb = catOf(b.category).z + (b.zBias || 0);
        if (za !== zb) return za - zb;
        return a.order - b.order;
      });
  }

  function byId(id) {
    for (var i = 0; i < state.garments.length; i++) if (state.garments[i].id === id) return state.garments[i];
    return null;
  }

  function activeGarment() { return byId(state.activeId); }

  /* ---------- 画布渲染 ---------- */

  var renderQueued = false;
  function requestRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(function () {
      renderQueued = false;
      render();
    });
  }

  function isDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  if (window.matchMedia) {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var onSchemeChange = function () { requestRender(); };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSchemeChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSchemeChange);
  }

  function drawChecker(c, w, h) {
    var dark = isDark();
    var light = dark ? '#2b3143' : '#ffffff';
    var shade = dark ? '#242938' : '#f0f3fb';
    var s = Math.max(12, Math.round(Math.min(w, h) / 26));
    for (var y = 0; y < h; y += s) {
      for (var x = 0; x < w; x += s) {
        c.fillStyle = ((x / s + y / s) % 2 === 0) ? light : shade;
        c.fillRect(x, y, s, s);
      }
    }
  }

  function drawSilhouette(c, w, h) {
    var cx = w / 2;
    var unit = Math.min(w, h);
    c.save();
    c.fillStyle = isDark() ? '#394056' : '#dfe4f2';
    c.beginPath();
    c.arc(cx, h * 0.155, unit * 0.088, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(cx - unit * 0.17, h * 0.30);
    c.quadraticCurveTo(cx, h * 0.245, cx + unit * 0.17, h * 0.30);
    c.lineTo(cx + unit * 0.135, h * 0.56);
    c.lineTo(cx - unit * 0.135, h * 0.56);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(cx - unit * 0.125, h * 0.56);
    c.lineTo(cx - unit * 0.055, h * 0.56);
    c.lineTo(cx - unit * 0.075, h * 0.94);
    c.lineTo(cx - unit * 0.155, h * 0.94);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(cx + unit * 0.055, h * 0.56);
    c.lineTo(cx + unit * 0.125, h * 0.56);
    c.lineTo(cx + unit * 0.155, h * 0.94);
    c.lineTo(cx + unit * 0.075, h * 0.94);
    c.closePath();
    c.fill();
    c.restore();
  }

  function drawGarment(c, g) {
    c.save();
    c.globalAlpha = g.opacity;
    c.translate(g.x, g.y);
    c.rotate(g.rot);
    c.scale(g.flip ? -g.scale : g.scale, g.scale);
    c.drawImage(g.canvas, -g.canvas.width / 2, -g.canvas.height / 2);
    c.restore();
  }

  function toLocal(g, p) {
    var dx = p.x - g.x;
    var dy = p.y - g.y;
    var cos = Math.cos(g.rot);
    var sin = Math.sin(g.rot);
    var sx = (g.flip ? -1 : 1) * g.scale;
    return { x: (dx * cos + dy * sin) / sx, y: (-dx * sin + dy * cos) / g.scale };
  }

  function offsetFor(g, local) {
    var sx = (g.flip ? -1 : 1) * g.scale;
    var x = local.x * sx;
    var y = local.y * g.scale;
    var cos = Math.cos(g.rot);
    var sin = Math.sin(g.rot);
    return { x: x * cos - y * sin, y: x * sin + y * cos };
  }

  function toWorld(g, local) {
    var o = offsetFor(g, local);
    return { x: g.x + o.x, y: g.y + o.y };
  }

  function drawSelection(c, g) {
    var hw = g.w / 2;
    var hh = g.h / 2;
    var pts = [
      toWorld(g, { x: -hw, y: -hh }),
      toWorld(g, { x: hw, y: -hh }),
      toWorld(g, { x: hw, y: hh }),
      toWorld(g, { x: -hw, y: hh })
    ];
    c.save();
    c.lineWidth = Math.max(1.5, state.stageW * 0.0026);
    c.strokeStyle = ACCENT;
    c.setLineDash([state.stageW * 0.014, state.stageW * 0.01]);
    c.beginPath();
    c.moveTo(pts[0].x, pts[0].y);
    for (var i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
    c.closePath();
    c.stroke();
    c.restore();
  }

  function drawBrushCursor(c) {
    if (!state.hover || state.picking) return;
    if (state.tool !== 'erase' && state.tool !== 'restore') return;
    c.save();
    c.lineWidth = Math.max(1, state.stageW * 0.002);
    c.strokeStyle = state.tool === 'erase' ? 'rgba(47,52,72,.7)' : 'rgba(91,143,214,.9)';
    c.beginPath();
    c.arc(state.hover.x, state.hover.y, Math.max(2, state.brush / 2), 0, Math.PI * 2);
    c.stroke();
    c.restore();
  }

  function render() {
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalAlpha = 1;
    sctx.globalCompositeOperation = 'source-over';
    sctx.clearRect(0, 0, state.stageW, state.stageH);
    sctx.imageSmoothingEnabled = true;
    sctx.imageSmoothingQuality = 'high';
    sctx.save();
    sctx.setTransform(state.view.s, 0, 0, state.view.s, state.view.tx, state.view.ty);

    if (state.base && state.base.canvas) {
      sctx.drawImage(state.base.canvas, 0, 0, state.stageW, state.stageH);
    } else {
      drawChecker(sctx, state.stageW, state.stageH);
      drawSilhouette(sctx, state.stageW, state.stageH);
    }

    var list = wornSorted();
    for (var i = 0; i < list.length; i++) {
      if (list[i].dirty) buildLayer(list[i]);
      drawGarment(sctx, list[i]);
    }

    var active = activeGarment();
    if (active && active.worn && active.img && state.tool === 'move') drawSelection(sctx, active);
    drawBrushCursor(sctx);
    sctx.restore();
  }

  /* ---------- 命中与笔刷 ---------- */

  function toStage(e) {
    var rect = stage.getBoundingClientRect();
    var cx = (e.clientX - rect.left) * state.stageW / rect.width;
    var cy = (e.clientY - rect.top) * state.stageH / rect.height;
    return {
      x: (cx - state.view.tx) / state.view.s,
      y: (cy - state.view.ty) / state.view.s,
      cx: cx,
      cy: cy
    };
  }

  function clampView() {
    var v = state.view;
    if (v.s <= 1.001) {
      v.s = 1;
      v.tx = 0;
      v.ty = 0;
      return;
    }
    v.tx = clamp(v.tx, state.stageW - state.stageW * v.s, 0);
    v.ty = clamp(v.ty, state.stageH - state.stageH * v.s, 0);
  }

  function zoomBy(factor, cx, cy) {
    var v = state.view;
    var s2 = clamp(v.s * factor, 1, 4);
    var k = s2 / v.s;
    v.tx = cx - (cx - v.tx) * k;
    v.ty = cy - (cy - v.ty) * k;
    v.s = s2;
    clampView();
    syncTools();
    requestRender();
  }

  function resetView() {
    state.view.s = 1;
    state.view.tx = 0;
    state.view.ty = 0;
    syncTools();
    requestRender();
  }

  function hitTest(p, needPixel) {
    var list = wornSorted();
    for (var i = list.length - 1; i >= 0; i--) {
      var g = list[i];
      var local = toLocal(g, p);
      if (Math.abs(local.x) > g.w / 2 || Math.abs(local.y) > g.h / 2) continue;
      if (!needPixel) return g;
      if (!g.canvas || g.dirty) buildLayer(g);
      var data = g.canvas.getContext('2d').getImageData(
        clamp(Math.floor(local.x + g.w / 2), 0, g.w - 1),
        clamp(Math.floor(local.y + g.h / 2), 0, g.h - 1),
        1, 1
      ).data;
      if (data[3] > 8) return g;
    }
    return null;
  }

  function paintStroke(g, from, to) {
    if (!g.mask) return;
    var width = Math.max(1, state.brush / g.scale);
    var a = toLocal(g, from);
    var b = toLocal(g, to);
    var c = g.mask.getContext('2d');
    c.globalCompositeOperation = state.tool === 'restore' ? 'destination-out' : 'source-over';
    c.fillStyle = '#000';
    c.strokeStyle = '#000';
    c.lineWidth = width;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    var ax = a.x + g.w / 2;
    var ay = a.y + g.h / 2;
    var bx = b.x + g.w / 2;
    var by = b.y + g.h / 2;
    if (ax === bx && ay === by) {
      c.beginPath();
      c.arc(ax, ay, width / 2, 0, Math.PI * 2);
      c.fill();
    } else {
      c.beginPath();
      c.moveTo(ax, ay);
      c.lineTo(bx, by);
      c.stroke();
    }
    c.globalCompositeOperation = 'source-over';
    g.dirty = true;
  }

  function saveMask(g) {
    if (!g.mask) return;
    canvasToBlob(g.mask, 'image/png').then(function (blob) {
      g.maskBlob = blob;
      return persist(g);
    }).catch(function (err) { console.warn(err); });
  }

  function sampleColor(g, p) {
    var local = toLocal(g, p);
    var x = Math.floor(local.x + g.w / 2);
    var y = Math.floor(local.y + g.h / 2);
    if (x < 0 || y < 0 || x >= g.w || y >= g.h) return;
    var data = g.img.getContext('2d').getImageData(x, y, 1, 1).data;
    if (data[3] === 0) return;
    g.key = { r: data[0], g: data[1], b: data[2] };
    g.dirty = true;
    persist(g);
    syncTools();
  }

  /* ---------- 手势 ---------- */

  function pointerList() {
    var out = [];
    state.pointers.forEach(function (v) { out.push(v); });
    return out;
  }

  function onDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    var p = toStage(e);
    state.pointers.set(e.pointerId, p);
    state.hover = p;
    var active = activeGarment();

    if (state.pointers.size === 1) {
      if (state.picking) {
        if (active) sampleColor(active, p);
        state.picking = false;
        syncTools();
        requestRender();
        return;
      }

      if (state.tool === 'erase' || state.tool === 'restore') {
        var target = hitTest(p, false);
        if (target) {
          selectGarment(target, false);
          state.drag = { mode: state.tool, id: target.id, last: p };
          paintStroke(target, p, p);
          requestRender();
        } else if (state.view.s > 1) {
          state.drag = { mode: 'pan', startX: p.cx, startY: p.cy, tx: state.view.tx, ty: state.view.ty };
        }
        return;
      }

      var hit = hitTest(p, true);
      if (hit) {
        selectGarment(hit, false);
        state.drag = { mode: 'move', id: hit.id, dx: p.x - hit.x, dy: p.y - hit.y };
      } else {
        selectGarment(null, false);
      }
      requestRender();
      return;
    }

    if (state.pointers.size === 2) {
      var pts = pointerList();
      var midC = { x: (pts[0].cx + pts[1].cx) / 2, y: (pts[0].cy + pts[1].cy) / 2 };
      var mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      if (state.tool === 'erase' || state.tool === 'restore') {
        state.drag = {
          mode: 'zoom',
          startDist: Math.max(1, Math.hypot(pts[1].cx - pts[0].cx, pts[1].cy - pts[0].cy)),
          startS: state.view.s,
          anchor: {
            x: (midC.x - state.view.tx) / state.view.s,
            y: (midC.y - state.view.ty) / state.view.s
          }
        };
        return;
      }
      if (!active) return;
      state.drag = {
        mode: 'pinch',
        id: active.id,
        startDist: Math.max(1, distance(pts[0], pts[1])),
        startAngle: Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x),
        startScale: active.scale,
        startRot: active.rot,
        anchor: toLocal(active, mid)
      };
    }
  }

  function onMove(e) {
    var p = toStage(e);
    if (state.pointers.has(e.pointerId)) state.pointers.set(e.pointerId, p);
    state.hover = p;

    var drag = state.drag;
    if (!drag) {
      requestRender();
      return;
    }

    if (drag.mode === 'pan') {
      state.view.tx = drag.tx + (p.cx - drag.startX);
      state.view.ty = drag.ty + (p.cy - drag.startY);
      clampView();
      requestRender();
      return;
    }

    if (drag.mode === 'zoom') {
      var zpts = pointerList();
      if (zpts.length < 2) return;
      var zmid = { x: (zpts[0].cx + zpts[1].cx) / 2, y: (zpts[0].cy + zpts[1].cy) / 2 };
      var zd = Math.max(1, Math.hypot(zpts[1].cx - zpts[0].cx, zpts[1].cy - zpts[0].cy));
      var zs = clamp(drag.startS * zd / drag.startDist, 1, 4);
      state.view.s = zs;
      state.view.tx = zmid.x - drag.anchor.x * zs;
      state.view.ty = zmid.y - drag.anchor.y * zs;
      clampView();
      syncTools();
      requestRender();
      return;
    }

    var g = byId(drag.id);
    if (!g) return;

    if (drag.mode === 'pinch') {
      var pts = pointerList();
      if (pts.length < 2) return;
      var mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      var d = Math.max(1, distance(pts[0], pts[1]));
      var ang = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x);
      g.scale = clamp(drag.startScale * d / drag.startDist, 0.05, 12);
      g.rot = drag.startRot + (ang - drag.startAngle);
      var off = offsetFor(g, drag.anchor);
      g.x = mid.x - off.x;
      g.y = mid.y - off.y;
    } else if (drag.mode === 'move') {
      g.x = p.x - drag.dx;
      g.y = p.y - drag.dy;
    } else {
      paintStroke(g, drag.last, p);
      drag.last = p;
    }

    syncAdjust();
    requestRender();
  }

  function onUp(e) {
    state.pointers.delete(e.pointerId);
    if (state.pointers.size >= 2) return;
    var drag = state.drag;
    if (!drag) return;
    state.drag = null;
    var g = byId(drag.id);
    if (g) {
      if (drag.mode === 'erase' || drag.mode === 'restore') saveMask(g);
      else persist(g);
    }
    requestRender();
  }

  stage.addEventListener('pointerdown', onDown);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerup', onUp);
  stage.addEventListener('pointercancel', onUp);
  stage.addEventListener('pointerleave', function () {
    if (state.drag) return;
    state.hover = null;
    requestRender();
  });
  stage.addEventListener('wheel', function (e) {
    var g = activeGarment();
    if (!g || state.tool !== 'move') return;
    e.preventDefault();
    var p = toStage(e);
    var local = toLocal(g, p);
    g.scale = clamp(g.scale * Math.exp(-e.deltaY * 0.0015), 0.05, 12);
    var off = offsetFor(g, local);
    g.x = p.x - off.x;
    g.y = p.y - off.y;
    syncAdjust();
    persist(g);
    requestRender();
  }, { passive: false });

  /* ---------- 选中与面板同步 ---------- */

  function selectGarment(g, rerender) {
    state.activeId = g ? g.id : null;
    state.picking = false;
    syncAdjust();
    syncTools();
    if (g) renderWardrobe();
    if (rerender !== false) requestRender();
  }

  function syncAdjust() {
    var g = activeGarment();
    var has = !!(g && g.worn);
    $('adjustName').textContent = has ? (g.name + ' · ' + catOf(g.category).label) : '没有选中衣服';
    ['scale', 'rot', 'opacity', 'btnFlip', 'btnUnwear', 'btnDelete', 'catSelect',
      'btnSendBack', 'btnBringFront', 'garmentName'].forEach(function (id) {
      $(id).disabled = !g;
    });
    if (!g) {
      $('scaleVal').textContent = '—';
      $('rotVal').textContent = '—';
      $('opacityVal').textContent = '—';
      return;
    }
    var percent = Math.round(g.scale * 100);
    var degrees = Math.round(g.rot * 180 / Math.PI);
    $('scale').value = percent;
    $('rot').value = degrees;
    $('opacity').value = Math.round(g.opacity * 100);
    $('scaleVal').textContent = percent + '%';
    $('rotVal').textContent = degrees + '°';
    $('opacityVal').textContent = Math.round(g.opacity * 100) + '%';
    $('catSelect').value = g.category;
    $('btnUnwear').disabled = !g.worn;
    if (document.activeElement !== $('garmentName')) $('garmentName').value = g.name;
  }

  function syncTools() {
    var g = activeGarment();
    $('brushField').hidden = state.tool === 'move';
    $('btnPick').disabled = !g;
    $('btnKeyClear').disabled = !g || !g.key;
    $('tol').disabled = !g || !g.key;
    $('btnPick').classList.toggle('is-on', state.picking);
    $('brushVal').textContent = state.brush;
    $('zoomVal').textContent = Math.round(state.view.s * 100) + '%';
    $('tolVal').textContent = g ? g.tol : 40;
    if (g) $('tol').value = g.tol;
  }

  function updateBrandSub() {
    var n = state.garments.length;
    $('brandSub').textContent = n ? ('衣橱里 ' + n + ' 件') : '衣橱还是空的';
  }

  /* ---------- 衣橱列表 ---------- */

  function renderTabs() {
    var tabs = $('catTabs');
    tabs.innerHTML = '';
    var items = [{ id: 'all', label: '全部' }].concat(CATS);
    items.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'cat-tab' + (state.filter === c.id ? ' is-on' : '');
      b.textContent = c.label;
      b.addEventListener('click', function () {
        state.filter = c.id;
        renderTabs();
        renderWardrobe();
      });
      tabs.appendChild(b);
    });
  }

  function renderWardrobe() {
    var grid = $('wardrobeGrid');
    grid.innerHTML = '';
    var list = state.garments.slice().sort(function (a, b) { return a.order - b.order; });
    if (state.filter !== 'all') {
      list = list.filter(function (g) { return g.category === state.filter; });
    }
    $('wardrobeEmpty').hidden = list.length > 0;

    list.forEach(function (g) {
      var card = document.createElement('div');
      card.className = 'card' + (g.worn ? ' is-on' : '');

      var img = document.createElement('img');
      img.className = 'card-thumb';
      img.alt = g.name;
      if (!g.thumbUrl && g.thumbBlob) g.thumbUrl = URL.createObjectURL(g.thumbBlob);
      if (g.thumbUrl) img.src = g.thumbUrl;
      card.appendChild(img);

      var name = document.createElement('div');
      name.className = 'card-name';
      name.textContent = g.name;
      card.appendChild(name);

      if (g.worn) {
        var badge = document.createElement('span');
        badge.className = 'card-badge';
        badge.innerHTML = iconSvg('check');
        card.appendChild(badge);
      }

      card.addEventListener('click', function () { toggleWorn(g); });
      grid.appendChild(card);
    });
  }

  async function toggleWorn(g) {
    if (g.worn) {
      g.worn = false;
      if (g.id === state.activeId) state.activeId = null;
      unload(g);
    } else {
      g.worn = true;
      await ensureLoaded(g);
      if (!g.x && !g.y) placeByDefault(g);
      state.activeId = g.id;
    }
    persist(g);
    renderWardrobe();
    syncAdjust();
    requestRender();
  }

  function placeByDefault(g) {
    var cat = catOf(g.category);
    g.scale = clamp((state.stageW * cat.w) / g.w, 0.02, 8);
    g.x = state.stageW / 2;
    g.y = state.stageH * cat.y;
  }

  /* ---------- 底部面板 ---------- */

  var SHEETS = { wardrobe: 'sheetWardrobe', adjust: 'sheetAdjust', tools: 'sheetTools', base: 'sheetBase' };

  function openSheet(name) {
    Object.keys(SHEETS).forEach(function (k) {
      $(SHEETS[k]).classList.toggle('is-on', k === name);
    });
    $('backdrop').classList.add('is-on');
    Array.prototype.forEach.call(document.querySelectorAll('.dock-btn'), function (b) {
      b.classList.toggle('is-on', b.dataset.open === name);
    });
    if (name === 'wardrobe') renderWardrobe();
    if (name === 'adjust') syncAdjust();
    if (name === 'tools') syncTools();
  }

  function closeSheets() {
    Object.keys(SHEETS).forEach(function (k) { $(SHEETS[k]).classList.remove('is-on'); });
    $('backdrop').classList.remove('is-on');
    Array.prototype.forEach.call(document.querySelectorAll('.dock-btn'), function (b) {
      b.classList.remove('is-on');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.dock-btn'), function (b) {
    b.addEventListener('click', function () { openSheet(b.dataset.open); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-close]'), function (b) {
    b.addEventListener('click', closeSheets);
  });
  $('backdrop').addEventListener('click', closeSheets);

  /* ---------- 立绘 ---------- */

  function applyBaseCanvas(canvas, name) {
    state.base = { name: name, canvas: canvas };
    state.stageW = canvas.width;
    state.stageH = canvas.height;
    stage.width = state.stageW;
    stage.height = state.stageH;
    $('baseMeta').textContent = name;
  }

  async function loadDefaultBase() {
    try {
      var res = await fetch(DEFAULT_BASE);
      if (!res.ok) throw new Error('默认立绘读取失败');
      var canvas = await blobToCanvas(await res.blob(), MAX_BASE_DIM);
      applyBaseCanvas(canvas, '默认立绘');
    } catch (err) {
      console.warn(err);
      state.base = null;
      $('baseMeta').textContent = '还没有立绘';
    }
  }

  async function setBase(file) {
    var canvas = await blobToCanvas(file, MAX_BASE_DIM);
    var kx = canvas.width / state.stageW;
    var ky = canvas.height / state.stageH;
    state.base = { name: cleanName(file.name), canvas: canvas };
    state.stageW = canvas.width;
    state.stageH = canvas.height;
    stage.width = state.stageW;
    stage.height = state.stageH;
    state.garments.forEach(function (g) {
      g.x *= kx;
      g.y *= ky;
      g.scale *= (kx + ky) / 2;
      persist(g);
    });
    await dbPut('meta', { key: 'base', name: state.base.name, blob: file });
    $('baseMeta').textContent = state.base.name;
    requestRender();
  }

  /* ---------- 备份 ---------- */

  async function exportBackup() {
    var recs = await dbAll('garments');
    var outfits = await dbAll('outfits');
    var base = await dbGet('meta', 'base');
    var out = { v: 2, exportedAt: new Date().toISOString(), base: null, garments: [], outfits: outfits };
    if (base && base.blob) {
      out.base = { name: base.name, data: await blobToDataURL(base.blob) };
    }
    for (var i = 0; i < recs.length; i++) {
      var r = recs[i];
      out.garments.push({
        id: r.id, name: r.name, category: r.category,
        x: r.x, y: r.y, scale: r.scale, rot: r.rot, flip: r.flip,
        opacity: r.opacity, worn: r.worn, order: r.order, w: r.w, h: r.h,
        key: r.key || null, tol: r.tol,
        image: await blobToDataURL(r.blob),
        thumb: r.thumb ? await blobToDataURL(r.thumb) : null,
        mask: r.mask ? await blobToDataURL(r.mask) : null
      });
    }
    var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
    downloadBlob(blob, '多多衣橱备份-' + stamp() + '.json');
  }

  async function importBackup(file) {
    var text = await file.text();
    var data = JSON.parse(text);
    if (!data || !Array.isArray(data.garments)) throw new Error('备份文件格式不对');
    if (!window.confirm('导入会覆盖当前衣橱，继续吗？')) return;

    var existing = await dbAll('garments');
    for (var i = 0; i < existing.length; i++) await dbRemove('garments', existing[i].id);
    var oldOutfits = await dbAll('outfits');
    for (var k = 0; k < oldOutfits.length; k++) await dbRemove('outfits', oldOutfits[k].id);
    await dbRemove('meta', 'base');

    for (var j = 0; j < data.garments.length; j++) {
      var r = data.garments[j];
      await dbPut('garments', {
        id: r.id || ('g' + Date.now() + j),
        name: r.name,
        category: r.category,
        blob: dataURLToBlob(r.image),
        thumb: r.thumb ? dataURLToBlob(r.thumb) : null,
        mask: r.mask ? dataURLToBlob(r.mask) : null,
        key: r.key || null,
        tol: r.tol == null ? 40 : r.tol,
        w: r.w, h: r.h,
        x: r.x, y: r.y, scale: r.scale, rot: r.rot || 0,
        flip: !!r.flip, opacity: r.opacity == null ? 1 : r.opacity,
        worn: !!r.worn, order: r.order || 0
      });
    }
    if (data.base && data.base.data) {
      await dbPut('meta', { key: 'base', name: data.base.name || '立绘', blob: dataURLToBlob(data.base.data) });
    }
    if (Array.isArray(data.outfits)) {
      for (var m = 0; m < data.outfits.length; m++) {
        var o = data.outfits[m];
        if (o && o.id && Array.isArray(o.ids)) await dbPut('outfits', o);
      }
    }
    await boot(true);
  }

  function stamp() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
      + '-' + pad(d.getHours()) + pad(d.getMinutes());
  }

  function downloadBlob(blob, filename) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 3000);
  }

  /* ---------- 导入衣服 ---------- */

  async function addClothes(files) {
    var maxOrder = 0;
    state.garments.forEach(function (g) { maxOrder = Math.max(maxOrder, g.order || 0); });
    for (var i = 0; i < files.length; i++) {
      try {
        var file = files[i];
        var raw = await blobToCanvas(file, MAX_GARMENT_DIM);
        var canvas = trimTransparent(raw);
        // 真裁掉透明边距时，把裁过的图存进库，保证尺寸和图片来源一致；
        // 没裁掉（普通照片）就保留原文件，免得重新编码成体积更大的 PNG。
        var stored = file;
        if (canvas !== raw) {
          var cut = await canvasToBlob(canvas, 'image/png');
          if (cut) stored = cut;
        }
        var thumbCanvas = document.createElement('canvas');
        var k = Math.min(THUMB_DIM / canvas.width, THUMB_DIM / canvas.height, 1);
        thumbCanvas.width = Math.max(1, Math.round(canvas.width * k));
        thumbCanvas.height = Math.max(1, Math.round(canvas.height * k));
        thumbCanvas.getContext('2d').drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
        var thumbBlob = await canvasToBlob(thumbCanvas, 'image/jpeg', 0.82);

        var catId = state.filter === 'all' ? 'top' : state.filter;
        var g = runtimeFrom({
          id: 'g' + Date.now() + '_' + i,
          name: catOf(catId).label + ' ' + (state.garments.filter(function (x) {
            return x.category === catId;
          }).length + 1),
          category: catId,
          blob: stored,
          thumb: thumbBlob,
          key: null,
          tol: 40,
          w: canvas.width,
          h: canvas.height,
          x: 0,
          y: 0,
          scale: 1,
          rot: 0,
          flip: false,
          opacity: 1,
          worn: true,
          order: ++maxOrder
        });
        await ensureLoaded(g);
        placeByDefault(g);
        state.garments.push(g);
        state.activeId = g.id;
        await persist(g);
      } catch (err) {
        console.warn(err);
      }
    }
    updateBrandSub();
    renderTabs();
    renderWardrobe();
    syncAdjust();
    requestRender();
  }

  /* ---------- 导出搭配 ---------- */

  function saveLook() {
    var out = document.createElement('canvas');
    out.width = state.stageW;
    out.height = state.stageH;
    var c = out.getContext('2d');
    c.imageSmoothingEnabled = true;
    c.imageSmoothingQuality = 'high';
    if (state.base && state.base.canvas) c.drawImage(state.base.canvas, 0, 0, out.width, out.height);
    var list = wornSorted();
    for (var i = 0; i < list.length; i++) {
      if (list[i].dirty) buildLayer(list[i]);
      drawGarment(c, list[i]);
    }
    out.toBlob(function (blob) {
      if (blob) downloadBlob(blob, '多多今天穿什么-' + stamp() + '.png');
    }, 'image/png');
  }

  /* ---------- 搭配与图层 ---------- */

  function renderOutfits() {
    var list = $('outfitList');
    list.innerHTML = '';
    state.outfits.forEach(function (rec) {
      var chip = document.createElement('span');
      chip.className = 'outfit-chip';
      var label = document.createElement('span');
      label.textContent = rec.name;
      label.addEventListener('click', function () { applyOutfit(rec); });
      chip.appendChild(label);
      var del = document.createElement('button');
      del.className = 'icon-btn';
      del.setAttribute('aria-label', '删除这套搭配');
      del.innerHTML = iconSvg('x');
      del.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteOutfit(rec);
      });
      chip.appendChild(del);
      list.appendChild(chip);
    });
  }

  async function setWornSet(keep) {
    for (var i = 0; i < state.garments.length; i++) {
      var g = state.garments[i];
      var want = !!keep[g.id];
      if (want === g.worn) continue;
      if (want) {
        g.worn = true;
        await ensureLoaded(g);
        if (!g.x && !g.y) placeByDefault(g);
      } else {
        g.worn = false;
        unload(g);
      }
      persist(g);
    }
    state.activeId = null;
    renderWardrobe();
    syncAdjust();
    requestRender();
  }

  function applyOutfit(rec) {
    var keep = {};
    rec.ids.forEach(function (id) { keep[id] = true; });
    setWornSet(keep).catch(function (err) { console.warn(err); });
  }

  async function saveOutfit() {
    var ids = state.garments.filter(function (g) { return g.worn; })
      .map(function (g) { return g.id; });
    if (!ids.length) {
      window.alert('先穿几件再存这套');
      return;
    }
    var fallback = '搭配 ' + (state.outfits.length + 1);
    var name = window.prompt('给这套起个名字', fallback);
    if (name === null) return;
    name = String(name).trim().slice(0, 12) || fallback;
    var rec = { id: 'o' + Date.now(), name: name, ids: ids };
    state.outfits.push(rec);
    await dbPut('outfits', rec);
    renderOutfits();
  }

  async function deleteOutfit(rec) {
    state.outfits = state.outfits.filter(function (o) { return o.id !== rec.id; });
    await dbRemove('outfits', rec.id);
    renderOutfits();
  }

  function randomLook() {
    if (!state.garments.length) {
      window.alert('衣橱还是空的');
      return;
    }
    var byCat = {};
    state.garments.forEach(function (g) {
      (byCat[g.category] = byCat[g.category] || []).push(g);
    });
    function pick(cat) {
      var arr = byCat[cat] || [];
      return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    }
    function has(cat) { return (byCat[cat] || []).length > 0; }
    var useDress = has('dress') && (!(has('top') && has('bottom')) || Math.random() < 0.35);
    var chosen = [];
    if (useDress) chosen.push(pick('dress'));
    else {
      chosen.push(pick('top'));
      chosen.push(pick('bottom'));
    }
    if (Math.random() < 0.5) chosen.push(pick('outer'));
    if (Math.random() < 0.7) chosen.push(pick('shoes'));
    if (Math.random() < 0.4) chosen.push(pick('bag'));
    if (Math.random() < 0.3) chosen.push(pick('acc'));
    var keep = {};
    chosen.forEach(function (g) { if (g) keep[g.id] = true; });
    setWornSet(keep).catch(function (err) { console.warn(err); });
  }

  function nudgeZ(delta) {
    var g = activeGarment();
    if (!g) return;
    g.zBias = clamp((g.zBias || 0) + delta, -30, 30);
    persist(g);
    requestRender();
  }

  /* ---------- 控件绑定 ---------- */

  $('btnSave').addEventListener('click', saveLook);
  $('btnZoomIn').addEventListener('click', function () { zoomBy(1.5, state.stageW / 2, state.stageH / 2); });
  $('btnZoomOut').addEventListener('click', function () { zoomBy(1 / 1.5, state.stageW / 2, state.stageH / 2); });
  $('btnZoomReset').addEventListener('click', resetView);
  $('btnBringFront').addEventListener('click', function () { nudgeZ(1); });
  $('btnSendBack').addEventListener('click', function () { nudgeZ(-1); });
  $('btnRandom').addEventListener('click', randomLook);
  $('btnSaveOutfit').addEventListener('click', function () {
    saveOutfit().catch(function (err) { console.warn(err); });
  });
  $('garmentName').addEventListener('change', function () {
    var g = activeGarment();
    if (!g) return;
    var v = $('garmentName').value.trim().slice(0, 20);
    if (!v) {
      $('garmentName').value = g.name;
      return;
    }
    g.name = v;
    persist(g);
    renderWardrobe();
    syncAdjust();
  });
  $('btnAddClothes').addEventListener('click', function () { $('inputClothes').click(); });
  $('inputClothes').addEventListener('change', function (e) {
    addClothes(e.target.files);
    e.target.value = '';
  });

  $('btnBase').addEventListener('click', function () { $('inputBase').click(); });
  $('inputBase').addEventListener('change', async function (e) {
    var file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try { await setBase(file); } catch (err) { console.warn(err); }
  });

  $('btnBaseClear').addEventListener('click', async function () {
    await dbRemove('meta', 'base');
    await loadDefaultBase();
    requestRender();
  });

  $('btnBackup').addEventListener('click', function () {
    exportBackup().catch(function (err) {
      console.warn(err);
      window.alert('导出失败：' + err.message);
    });
  });
  $('btnRestore').addEventListener('click', function () { $('inputRestore').click(); });
  $('inputRestore').addEventListener('change', function (e) {
    var file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    importBackup(file).catch(function (err) {
      console.warn(err);
      window.alert('导入失败：' + err.message);
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('#toolSeg .seg-btn'), function (btn) {
    btn.addEventListener('click', function () {
      state.tool = btn.dataset.tool;
      Array.prototype.forEach.call(document.querySelectorAll('#toolSeg .seg-btn'), function (b) {
        b.classList.toggle('is-on', b === btn);
      });
      if (state.tool === 'move') resetView();
      syncTools();
      requestRender();
    });
  });

  $('brush').addEventListener('input', function () {
    state.brush = Number($('brush').value);
    $('brushVal').textContent = state.brush;
    requestRender();
  });

  $('tol').addEventListener('input', function () {
    var g = activeGarment();
    $('tolVal').textContent = $('tol').value;
    if (!g) return;
    g.tol = Number($('tol').value);
    g.dirty = true;
    requestRender();
  });
  $('tol').addEventListener('change', function () {
    var g = activeGarment();
    if (g) persist(g);
  });

  $('btnPick').addEventListener('click', function () {
    if (!activeGarment()) return;
    state.picking = !state.picking;
    syncTools();
    requestRender();
  });

  $('btnKeyClear').addEventListener('click', function () {
    var g = activeGarment();
    if (!g) return;
    g.key = null;
    g.dirty = true;
    persist(g);
    syncTools();
    requestRender();
  });

  $('scale').addEventListener('input', function () {
    var g = activeGarment();
    if (!g) return;
    g.scale = Number($('scale').value) / 100;
    $('scaleVal').textContent = $('scale').value + '%';
    requestRender();
  });
  $('rot').addEventListener('input', function () {
    var g = activeGarment();
    if (!g) return;
    g.rot = Number($('rot').value) * Math.PI / 180;
    $('rotVal').textContent = $('rot').value + '°';
    requestRender();
  });
  $('opacity').addEventListener('input', function () {
    var g = activeGarment();
    if (!g) return;
    g.opacity = Number($('opacity').value) / 100;
    $('opacityVal').textContent = $('opacity').value + '%';
    requestRender();
  });
  ['scale', 'rot', 'opacity'].forEach(function (id) {
    $(id).addEventListener('change', function () {
      var g = activeGarment();
      if (g) persist(g);
    });
  });

  $('btnFlip').addEventListener('click', function () {
    var g = activeGarment();
    if (!g) return;
    g.flip = !g.flip;
    persist(g);
    requestRender();
  });

  $('btnUnwear').addEventListener('click', function () {
    var g = activeGarment();
    if (g && g.worn) toggleWorn(g);
  });

  $('btnDelete').addEventListener('click', async function () {
    var g = activeGarment();
    if (!g) return;
    if (!window.confirm('把「' + g.name + '」从衣橱里删掉？')) return;
    await dbRemove('garments', g.id);
    if (g.thumbUrl) URL.revokeObjectURL(g.thumbUrl);
    state.garments = state.garments.filter(function (x) { return x.id !== g.id; });
    state.activeId = null;
    updateBrandSub();
    renderWardrobe();
    syncAdjust();
    requestRender();
  });

  var catSelect = $('catSelect');
  CATS.forEach(function (c) {
    var opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.label;
    catSelect.appendChild(opt);
  });
  catSelect.addEventListener('change', function () {
    var g = activeGarment();
    if (!g) return;
    g.category = catSelect.value;
    persist(g);
    syncAdjust();
    renderWardrobe();
    requestRender();
  });

  /* ---------- 启动 ---------- */

  async function boot(isReload) {
    var recs = await dbAll('garments');
    var baseRec = await dbGet('meta', 'base');
    state.outfits = await dbAll('outfits');

    state.garments.forEach(function (g) { if (g.thumbUrl) URL.revokeObjectURL(g.thumbUrl); });
    state.garments = recs.map(runtimeFrom);
    state.activeId = null;
    state.filter = 'all';

    if (baseRec && baseRec.blob) {
      var canvas = await blobToCanvas(baseRec.blob, MAX_BASE_DIM);
      applyBaseCanvas(canvas, baseRec.name);
    } else {
      await loadDefaultBase();
    }

    for (var i = 0; i < state.garments.length; i++) {
      var g = state.garments[i];
      if (g.worn) await ensureLoaded(g);
    }

    updateBrandSub();
    renderTabs();
    renderWardrobe();
    renderOutfits();
    syncAdjust();
    syncTools();
    requestRender();
  }

  boot(false).catch(function (err) {
    console.warn(err);
    requestRender();
  });

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function (err) { console.warn(err); });
  }
})();
