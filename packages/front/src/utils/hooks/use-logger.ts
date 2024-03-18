// import { Logger } from '../../service/logger/Logger';
import { Logger } from '../logger/Logger';
import { useInjectable } from './use-di';

/**
 * hook: 获得注入的 Logger
 * @returns
 */
export function useLogger() {
  return useInjectable(Logger);
}
