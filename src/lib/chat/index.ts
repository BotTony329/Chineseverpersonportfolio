/**
 * AI 助手问答编排（provider-agnostic）：
 * - 已配置 AI Provider（默认 DeepSeek）→ 由 AI 基于 Portfolio Context 生成自然语言回答
 * - 未配置 / 请求失败 / 超时 → 自动回退到本地知识库回答
 */
import { buildPortfolioContext } from './portfolio-context';
import { LocalKnowledgeProvider } from './local-provider';
import { OpenAICompatProvider } from './openai-compat-provider';
import { getProviderConfig } from './config';
import type { ChatHistoryItem, ProviderAnswer } from './types';

let contextCache: string | null = null;

function getContext(): string {
  if (!contextCache) contextCache = buildPortfolioContext();
  return contextCache;
}

export async function answerQuestion(
  question: string,
  history: ChatHistoryItem[]
): Promise<ProviderAnswer> {
  const cfg = getProviderConfig();
  const local = new LocalKnowledgeProvider();
  const ai = new OpenAICompatProvider('deepseek', 'DeepSeek');

  if (ai.isConfigured(cfg)) {
    try {
      return await ai.answer(question, history, getContext(), cfg);
    } catch {
      // AI Provider 不可用时静默回退本地知识库
    }
  }
  return local.answer(question, history, getContext());
}
