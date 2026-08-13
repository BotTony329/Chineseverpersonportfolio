/**
 * AI 助手 Provider 抽象（provider-agnostic）：
 * - 本地知识库（Local Knowledge Base）始终可用，作为基础
 * - Optional AI Provider（默认 DeepSeek，OpenAI 兼容协议），配置后用于生成自然语言回答
 * 接入新 Provider 只需实现 AiProvider 接口，并在 answerQuestion 编排中注册。
 */
import type { KnowledgeLink } from '../../data/ai-knowledge';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  text: string;
}

export interface ProviderConfig {
  /** API Key：来自运行时设置（localStorage）或构建时 PUBLIC_DEEPSEEK_API_KEY */
  key: string;
  model: string;
  baseUrl: string;
}

export interface ProviderAnswer {
  text: string;
  links: KnowledgeLink[];
  /** 回答来源：本地知识库 or AI Provider */
  source: 'local' | 'ai';
  provider?: string;
}

export interface AiProvider {
  readonly id: string;
  readonly label: string;
  isConfigured(cfg: ProviderConfig): boolean;
  answer(
    question: string,
    history: ChatHistoryItem[],
    context: string,
    cfg: ProviderConfig
  ): Promise<ProviderAnswer>;
}
