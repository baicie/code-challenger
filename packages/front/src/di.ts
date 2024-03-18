import { container } from 'tsyringe'
import { ConsoleLogTransport } from './utils/logger/ConsoleTransport'
import { Logger } from './utils/logger/Logger'
import { LogLevel } from './utils/logger/LogLevel'

/**
 * 注入全局实例
 */
export function registerGlobalModules() {
  container.registerInstance(
    Logger,
    new Logger([new ConsoleLogTransport(LogLevel.Debug)])
  )
}
