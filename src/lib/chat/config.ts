/**
 * AI Provider 配置来源（provider-agnostic）：
 * 1. 运行时设置：访客 / 站主在聊天面板设置中填写，仅保存在浏览器 localStorage
 * 2. 构建时环境变量：PUBLIC_DEEPSEEK_API_KEY（注意：会打包进客户端代码，仅建议个人站点使用）
 * 默认 Provider 为 DeepSeek（OpenAI 兼容协议），可通过 Base URL / Model 切换为其他兼容服务。
 */
import type { ProviderConfig } from './types';

const STORE_KEYS = {
  key: 'portfolio-ai-key',
  model: 'portfolio-ai-model',
  baseUrl: 'portfolio-ai-base-url',
} as const;

export const DEFAULTS = {
  baseUrl: 'https://api.deepseek.com',
  model: 'deepseek-chat',
} as const;

function readEnv(): Partial<ProviderConfig> {
  const env = import.meta.env as Record<string, string | undefined>;
  return {
    key: env.PUBLIC_DEEPSEEK_API_KEY || '',
    model: env.PUBLIC_DEEPSEEK_MODEL || DEFAULTS.model,
    baseUrl: env.PUBLIC_DEEPSEEK_BASE_URL || DEFAULTS.baseUrl,
  };
}

function readLocal(): Partial<ProviderConfig> {
  try {
    return {
      key: localStorage.getItem(STORE_KEYS.key) ?? '',
      model: localStorage.getItem(STORE_KEYS.model) ?? '',
      baseUrl: localStorage.getItem(STORE_KEYS.baseUrl) ?? '',
    };
  } catch {
    return {};
  }
}

export function getProviderConfig(): ProviderConfig {
  const env = readEnv();
  const local = readLocal();
  return {
    key: local.key || env.key || '',
    model: local.model || env.model || DEFAULTS.model,
    baseUrl: local.baseUrl || env.baseUrl || DEFAULTS.baseUrl,
  };
}

export function saveLocalConfig(cfg: ProviderConfig) {
  try {
    localStorage.setItem(STORE_KEYS.key, cfg.key);
    localStorage.setItem(STORE_KEYS.model, cfg.model);
    localStorage.setItem(STORE_KEYS.baseUrl, cfg.baseUrl);
  } catch {
    /* 忽略存储失败 */
  }
}

export function clearLocalConfig() {
  try {
    localStorage.removeItem(STORE_KEYS.key);
    localStorage.removeItem(STORE_KEYS.model);
    localStorage.removeItem(STORE_KEYS.baseUrl);
  } catch {
    /* 忽略存储失败 */
  }
}
