/**
 * 生成静态位图资产（无第三方依赖，纯 Node）：
 * 1. favicon PNG（32 / 180 / 512）—— 手写 PNG 编码器 + 几何形状绘制奶牛猫标志
 * 2. og.png（1200×630 分享卡）—— 调用 macOS qlmanage（WebKit）光栅化 scripts/og-card.svg
 *
 * 用法：npm run assets
 */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync, existsSync, renameSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

/* ============================================================
   Minimal PNG encoder (RGBA, no deps)
   ============================================================ */
let crcTable = null;
function makeCrcTable() {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
}
function crc32(buf) {
  if (!crcTable) crcTable = makeCrcTable();
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
function encodePng(width, height, rgba) {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ============================================================
   奶牛猫标志（与 public/favicon.svg 同构的几何形状，64 单位空间）
   ============================================================ */
const C = {
  tile: [18, 22, 28], // #12161c
  dark: [11, 15, 20], // #0b0f14
  white: [232, 236, 241], // #e8ecf1
  accent: [59, 130, 246], // #3b82f6
};

const inCircle = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
const inTri = (x, y, ax, ay, bx, by, cx, cy) => {
  const s1 = (bx - ax) * (y - ay) - (by - ay) * (x - ax);
  const s2 = (cx - bx) * (y - by) - (cy - by) * (x - bx);
  const s3 = (ax - cx) * (y - cy) - (ay - cy) * (x - cx);
  return (s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0);
};
const inRoundRect = (x, y, r) => {
  if (x < 0 || x > 64 || y < 0 || y > 64) return false;
  const cx = x < r ? r : x > 64 - r ? 64 - r : x;
  const cy = y < r ? r : y > 64 - r ? 64 - r : y;
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r || (x >= r && x <= 64 - r) || (y >= r && y <= 64 - r);
};

/** 按绘制顺序取色；未命中返回 null（透明） */
function sceneColor(x, y) {
  let color = null;
  if (inRoundRect(x, y, 15)) color = C.tile;
  if (inTri(x, y, 44.5, 9.5, 35.5, 20, 53.5, 23.5)) color = C.white; // 右耳
  if (inTri(x, y, 19.5, 9.5, 28.5, 20, 10.5, 23.5)) color = C.dark; // 左耳
  if (inCircle(x, y, 32, 33.5, 16.5)) color = C.white; // 头部
  if (inCircle(x, y, 25.5, 24.5, 8)) color = C.dark; // 左眼斑
  if (inCircle(x, y, 26, 25, 1.7)) color = C.white; // 左眼
  if (inCircle(x, y, 38.5, 26.5, 1.9)) color = C.accent; // 右眼
  if (inTri(x, y, 30.8, 34.5, 33.2, 34.5, 32, 37.4)) color = C.accent; // 鼻子
  if (inCircle(x, y, 41, 37.5, 4.2)) color = C.dark; // 右颊斑
  return color;
}

/** 3×3 超采样抗锯齿渲染 */
function drawIcon(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const ss = 3;
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0,
        g = 0,
        b = 0,
        hits = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const x = ((px + (sx + 0.5) / ss) / size) * 64;
          const y = ((py + (sy + 0.5) / ss) / size) * 64;
          const color = sceneColor(x, y);
          if (color) {
            r += color[0];
            g += color[1];
            b += color[2];
            hits++;
          }
        }
      }
      const i = (py * size + px) * 4;
      if (hits > 0) {
        rgba[i] = Math.round(r / hits);
        rgba[i + 1] = Math.round(g / hits);
        rgba[i + 2] = Math.round(b / hits);
      }
      rgba[i + 3] = Math.round((hits / (ss * ss)) * 255);
    }
  }
  return rgba;
}

/* ============================================================
   OG 分享卡：qlmanage（WebKit）光栅化 SVG
   ============================================================ */
function rasterizeOg() {
  if (process.platform !== 'darwin') {
    console.warn('跳过 og.png 生成（qlmanage 仅限 macOS，可手动用浏览器截图 scripts/og-card.svg）');
    return;
  }
  const svg = join(root, 'scripts', 'og-card.svg');
  const target = join(publicDir, 'og.png');
  const temp = join(publicDir, 'og-card.svg.png');
  try {
    rmSync(temp, { force: true });
    execFileSync('qlmanage', ['-t', '-s', '1200', '-o', publicDir, svg], { stdio: 'pipe' });
    if (existsSync(temp)) {
      rmSync(target, { force: true });
      renameSync(temp, target);
      console.log(`✓ og.png 生成（${svg}）`);
    } else {
      console.warn('qlmanage 未产出文件，请手动生成 og.png');
    }
  } catch (err) {
    console.warn(`qlmanage 失败：${err.message}。可手动用浏览器截图 scripts/og-card.svg 生成 og.png`);
  }
}

/* ============================================================ */
mkdirSync(publicDir, { recursive: true });

for (const size of [32, 180, 512]) {
  const name = size === 180 ? 'favicon.png' : `favicon-${size}.png`;
  writeFileSync(join(publicDir, name), encodePng(size, size, drawIcon(size)));
  console.log(`✓ ${name}（${size}×${size}）`);
}

rasterizeOg();
