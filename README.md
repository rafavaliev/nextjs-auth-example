## Next.js + Drizzle + PostgreSQL + Next-Auth.js
The Google provider is default, mailru one is custom because default version does not work.

* `docker compose up` - to run postgresql
* `pnpm run db:studio` - to run DB viewer
* `pnpm run db:push` - to run DB migrations
  * change ./db/schema.ts to change the DB schema and run the migration script

* cp .local.env .env
* generate secret `AUTH_SECRET=$(openssl rand -base64 32)`
* Create new ClientID and ClientSecret for the provider

```bash
pnpm run dev
```