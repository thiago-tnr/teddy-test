npm install

npm run husky:install
npx prisma generate
npx prisma migrate dev

tail -f /dev/null