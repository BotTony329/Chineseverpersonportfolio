/**
 * Local Knowledge Base Provider —— AI 助手的基座：
 * 关键词匹配站内知识库（src/data/ai-knowledge.ts），不联网、无外部依赖、始终可用。
 */
import { findAnswer } from '../../data/ai-knowledge';
import type { AiProvider, ChatHistoryItem, ProviderAnswer, ProviderConfig } from './types';

export class LocalKnowledgeProvider implements AiProvider {
  readonly id = 'local';
  readonly label = '本地知识库';

  isConfigured(_cfg: ProviderConfig): boolean {
    return true;
  }

  async answer(
    question: string,
    _history: ChatHistoryItem[],
    _context: string
  ): Promise<ProviderAnswer> {
    const entry = findAnswer(question);
    return { text: entry.answer, links: entry.links, source: 'local', provider: this.label };
  }
}
