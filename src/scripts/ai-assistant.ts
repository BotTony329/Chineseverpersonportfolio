/**
 * 「问问我的 AI 助手」：provider-agnostic 问答流程。
 * - 基座：本地知识库匹配（不联网、不编造）
 * - 可选：配置 DeepSeek（或任意 OpenAI 兼容服务）后，基于 Portfolio Context 生成自然语言回答
 * - AI 请求失败 / 超时自动回退本地知识库
 * 兼容 ViewTransitions：全局绑定一次，每次 page-load 重新挂载新 DOM 节点。
 */
import { quickQuestions, assistantMeta } from '../data/ai-knowledge';
import { answerQuestion } from '../lib/chat';
import { DEFAULTS, getProviderConfig, saveLocalConfig, clearLocalConfig } from '../lib/chat/config';
import { BASE_URL } from '../lib/base';

interface StoredMsg {
  role: 'user' | 'assistant';
  text: string;
  links?: { label: string; href: string }[];
  source?: 'local' | 'ai';
}

const STORE_KEY = 'moo-chat-history';

function loadHistory(): StoredMsg[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredMsg[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(msgs: StoredMsg[]) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-40)));
  } catch {
    /* 忽略存储失败 */
  }
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function scrollBottom(msgs: HTMLElement) {
  msgs.scrollTop = msgs.scrollHeight;
}

function renderMessage(msgs: HTMLElement, msg: StoredMsg) {
  const row = el('div', `msg msg--${msg.role}`);
  const bubble = el('div', 'bubble', msg.text);
  row.appendChild(bubble);

  if (msg.links && msg.links.length > 0) {
    const links = el('div', 'msg-links');
    for (const link of msg.links) {
      const a = el('a', undefined, `${link.label} →`);
      a.href = link.href.startsWith('/') ? `${BASE_URL}${link.href.slice(1)}` : link.href;
      links.appendChild(a);
    }
    row.appendChild(links);
  }

  msgs.appendChild(row);
  scrollBottom(msgs);
}

function renderTyping(msgs: HTMLElement): HTMLElement {
  const row = el('div', 'msg msg--assistant');
  const typing = el('span', 'typing');
  for (let i = 0; i < 3; i++) typing.appendChild(el('span'));
  row.appendChild(typing);
  msgs.appendChild(row);
  scrollBottom(msgs);
  return row;
}

/** 更新头部模式徽标与说明文案，反映当前 Provider 配置与最近一次回答来源 */
function updateModeBadge(source?: 'local' | 'ai') {
  const badge = document.getElementById('chat-mode');
  const disclaimer = document.getElementById('chat-disclaimer');
  const cfg = getProviderConfig();

  if (badge) {
    const isAi = source === 'ai';
    badge.textContent = isAi ? 'DeepSeek 回答' : '本地知识库回答';
    badge.classList.toggle('is-ai', isAi);
  }
  if (disclaimer) {
    disclaimer.textContent = cfg.key
      ? '已配置 AI Provider · 回答基于 Portfolio Context，失败时自动回退本地知识库'
      : '本地模式 · 回答基于本站 Portfolio 内容';
  }
}

async function ask(text: string) {
  const msgs = document.getElementById('chat-msgs');
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  const send = document.getElementById('chat-send') as HTMLButtonElement | null;
  const form = document.getElementById('chat-form') as HTMLFormElement | null;
  if (!msgs || !form) return;

  const q = text.trim();
  if (!q) return;

  const history = loadHistory();
  history.push({ role: 'user', text: q });
  saveHistory(history);
  renderMessage(msgs, { role: 'user', text: q });

  const typingRow = renderTyping(msgs);
  if (send) send.disabled = true;

  try {
    const result = await answerQuestion(
      q,
      history.map((m) => ({ role: m.role, text: m.text }))
    );
    const msg: StoredMsg = {
      role: 'assistant',
      text: result.text,
      links: result.links,
      source: result.source,
    };
    history.push(msg);
    saveHistory(history);
    typingRow.remove();
    renderMessage(msgs, msg);
    updateModeBadge(result.source);
  } catch {
    typingRow.remove();
    renderMessage(msgs, {
      role: 'assistant',
      text: '抱歉，回答出错了。你可以换个问法，或直接联系 Tony。',
      links: [{ label: '联系页', href: '/contact' }],
      source: 'local',
    });
  } finally {
    if (send) send.disabled = false;
  }
}

function setOpen(open: boolean) {
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  if (!panel || !fab) return;

  panel.classList.toggle('open', open);
  panel.setAttribute('aria-hidden', String(!open));
  fab.setAttribute('aria-expanded', String(open));

  if (open) {
    window.setTimeout(() => input?.focus(), 150);
  }
}

function renderQuick() {
  const quick = document.getElementById('chat-quick');
  if (!quick) return;
  quick.textContent = '';
  for (const q of quickQuestions) {
    const btn = el('button', undefined, q);
    btn.type = 'button';
    btn.addEventListener('click', () => {
      ask(q);
    });
    quick.appendChild(btn);
  }
}

function restore() {
  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  msgs.textContent = '';

  const history = loadHistory();
  if (history.length === 0) {
    renderMessage(msgs, { role: 'assistant', text: assistantMeta.intro, links: [] });
  } else {
    for (const msg of history) renderMessage(msgs, msg);
  }
  updateModeBadge();
}

/** Optional AI Provider 设置面板：API Key 仅存于浏览器 localStorage */
function bindSettings() {
  const toggle = document.getElementById('chat-settings-toggle');
  const panel = document.getElementById('chat-settings');
  const keyInput = document.getElementById('chat-ai-key') as HTMLInputElement | null;
  const modelInput = document.getElementById('chat-ai-model') as HTMLInputElement | null;
  const baseInput = document.getElementById('chat-ai-base') as HTMLInputElement | null;
  const saveBtn = document.getElementById('chat-ai-save');
  const clearBtn = document.getElementById('chat-ai-clear');
  if (!toggle || !panel || !keyInput || !modelInput || !baseInput || !saveBtn || !clearBtn) {
    return;
  }

  const cfg = getProviderConfig();
  keyInput.value = cfg.key;
  modelInput.value = cfg.model;
  baseInput.value = cfg.baseUrl;

  const setPanelOpen = (open: boolean) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setPanelOpen(!panel.classList.contains('open')));

  saveBtn.addEventListener('click', () => {
    saveLocalConfig({
      key: keyInput.value.trim(),
      model: modelInput.value.trim() || DEFAULTS.model,
      baseUrl: baseInput.value.trim() || DEFAULTS.baseUrl,
    });
    setPanelOpen(false);
    updateModeBadge();
  });

  clearBtn.addEventListener('click', () => {
    clearLocalConfig();
    keyInput.value = '';
    modelInput.value = DEFAULTS.model;
    baseInput.value = DEFAULTS.baseUrl;
    updateModeBadge();
  });
}

function mount() {
  const fab = document.getElementById('chat-fab');
  const close = document.getElementById('chat-close');
  const form = document.getElementById('chat-form') as HTMLFormElement | null;
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  if (!fab || !close || !form || !input) return;

  // ViewTransitions 下 Base 布局节点会复用，避免重复绑定监听
  const bound = form as HTMLFormElement & { __chatBound?: boolean };
  if (bound.__chatBound) return;
  bound.__chatBound = true;

  setOpen(false);
  restore();
  renderQuick();
  bindSettings();

  fab.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => setOpen(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
    input.value = '';
  });
}

export function initChat() {
  if ((window as unknown as { __chatInit?: boolean }).__chatInit) return;
  (window as unknown as { __chatInit?: boolean }).__chatInit = true;

  document.addEventListener('astro:page-load', mount);
  window.addEventListener('chat:open', () => setOpen(true));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  mount();
}
