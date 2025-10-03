# Audio CDN on GitHub Pages

Минимальный проект, чтобы размещать MP3-файлы на GitHub Pages со стабильными прямыми ссылками.

## Структура
- `index.html` — список и плеер
- `audio/` — кладите сюда `.mp3`
- `audio/manifest.json` — автогенерируется (или поддерживается вручную)
- `tools/build-manifest.mjs` — скрипт генерации
- `.nojekyll` — отключает Jekyll на Pages

## Быстрый старт (GitHub Codespaces / локально)
1. Склонируйте репозиторий и откройте в Codespaces.
2. Скопируйте MP3 в `audio/`.
3. Укажите публичный базовый URL (ваш GitHub Pages):
   ```bash
   export PUBLIC_BASE_URL="https://<user>.github.io/<repo>/audio/"
   node tools/build-manifest.mjs
   ```
4. Закоммитьте и запушьте изменения:
   ```bash
   git add audio/manifest.json audio/*.mp3
   git commit -m "add tracks"
   git push
   ```
5. Включите GitHub Pages: Settings → Pages → Deploy from branch → `main` → `/ (root)`.

Готово! Файлы будут доступны по ссылкам вида:
`https://<user>.github.io/<repo>/audio/<file>.mp3`

### Опционально: автообновление манифеста через GitHub Actions
1. В Settings → Secrets создайте секрет `PUBLIC_BASE_URL` со значением `https://<user>.github.io/<repo>/audio/`.
2. Скрипт из `.github/workflows/generate-manifest.yml` запустится при пуше в `main` и обновит `audio/manifest.json`.

### Примечания
- Не используйте Git LFS — Pages не отдаёт файлы из LFS.
- GitHub ограничивает размер файлов: <=100MB на файл.
- Для кросс-доменных XHR/`fetch()` на Pages нельзя настраивать заголовки CORS. Для `<audio src>` обычно не требуется.
