# Migration Mac — Claude- (Ruflo app, Next.js)

## 1. Prérequis

```bash
brew install node git gh   # Node 18.18+ ou 20+ (Next.js 14.2)
```

## 2. Cloner + installer

```bash
gh repo clone vinsmaf/Claude-
cd Claude-
npm install
```

## 3. Secrets (`.env.local`, copier `.env.local.example`)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Récupérer l'URL/clé anon depuis le dashboard Supabase du projet (Settings → API). Ce sont
des clés **publiques côté client** (`NEXT_PUBLIC_*`) — pas de risque à les avoir en clair
dans `.env.local`, mais le fichier reste gitignoré par convention.

## 4. MCP / claude-flow (`.mcp.json`, déjà committé — rien à recréer)

Le repo committe `.mcp.json` (serveur MCP `ruflo` via `npx ruflo@latest mcp start`,
`autoStart: false`) — fonctionne tel quel après clone, aucun secret dedans. Les dossiers
`.claude-flow/` et `.swarm/` sont de l'état runtime claude-flow (probablement gitignorés ou
à regénérer) — pas besoin de les copier depuis l'ancien Mac, ils se reconstruisent à l'usage.

## 5. Vérification

```bash
npm run lint
npm run build
npm run dev    # http://localhost:3000
```
