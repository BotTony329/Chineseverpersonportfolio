/**
 * OpenAI 兼容协议 AI Provider —— 默认用于 DeepSeek（https://api.deepseek.com）。
 * 基于 Portfolio Context 生成自然语言回答；通过 baseUrl / model 可切换其他兼容服务。
 */
import type { AiProvider, ChatHistoryItem, ProviderAnswer, ProviderConfig } from './types';

const SYSTEM_PROMPT = `你是 Tony Zhao 个人 Portfolio 网站上的 AI 助手。
请仅根据下方提供的 Portfolio Context 回答访客的问题，使用中文，语气友好、简洁直接。
如果 Context 中没有相关信息，请如实说明没有掌握这部分内容，并建议访客通过联系页直接联系 Tony。
不要编造 Context 中不存在的信息。

Portfolio Context:
`;

const REQUEST_TIMEOUT_MS = 15000;

export class OpenAICompatProvider implements AiProvider {
  readonly id: string;
  readonly label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  isConfigured(cfg: ProviderConfig): boolean {
    return Boolean(cfg.key);
  }

  async answer(
    question: string,
    history: ChatHistoryItem[],
    context: string,
    cfg: ProviderConfig
  ): Promise<ProviderAnswer> {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(`${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cfg.key}`,
        },
        body: JSON.stringify({
          model: cfg.model,
          temperature: 0.3,
          max_tokens: 600,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT + context },
            ...history.slice(-10).map((m) => ({ role: m.role, content: m.text })),
            { role: 'user', content: question },
          ],
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`AI Provider 请求失败（HTTP ${res.status}）`);
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) throw new Error('AI Provider 返回内容为空');

      return { text, links: [], source: 'ai', provider: this.label };
    } finally {
      window.clearTimeout(timer);
    }
  }
}
