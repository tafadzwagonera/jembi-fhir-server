import 'reflect-metadata'
import fs from 'fs'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import dotenv from 'dotenv'
import sourceMapSupport from 'source-map-support'

const getEnv = () =>
  !process.env.NODE_ENV || ['development', 'production'].includes(process.env.NODE_ENV)
    ? 'testing'
    : process.env.NODE_ENV
Object.entries(dotenv.parse(fs.readFileSync(`.env.${getEnv()}`))).forEach(([key, value]) => {
  console.info(`Setting env var { ${key} } from .env.${getEnv()}`)
  process.env[key] = value
})

process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

function getTestFiles() {
  const userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'test/**/*.spec.ts'
  }

  return `${userDefined.replace(/\.ts$|\.js$/, '')}.ts`
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [startHttpServer],
})
