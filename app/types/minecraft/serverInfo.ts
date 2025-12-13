// https://mcstatus.io/docs
export type ServerInfo = {
    online: boolean
    host: string
    port: number
    eula_blocked: boolean
    retrieved_at: number
    expires_at: number
    version?: {
      name_raw: string
      name_clean: string
      name_html: string
      protocol: number
    }
    players: {
      online: number
      max: number
      list: Array<{
        uuid: string
        name_raw: string
        name_clean: string
        name_html: string
      }>
    }
    motd: {
      raw: string
      clean: string
      html: string
    }
    icon: string
    mods: Array<{
      name: string
      version: string
    }>
    software: string
    plugins: Array<{
      name: string
      version: string
    }>
}
